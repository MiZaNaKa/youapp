import React, { useEffect, useState, useRef } from 'react';
import Action from '../action/AboutAction'
import Store from '../store/AboutStore'
import Close from "../img/close.png"
import withNavigateHook from '../common/Navigate'
import 'react-image-upload/dist/index.css'
import '../commonStyle/commonStyle.css'
import SimpleReactValidator from 'simple-react-validator';
import Header from "./Header"

function About(props) {
  var detail = Store.getDetail()
  var tempoDataAll = Store.getTempoData()
  const [form, setForm] = useState(detail)
  const [tempoData, setTempoData] = useState(tempoDataAll)
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const removeImage = (value) => {
    setFile("");
  }

  useEffect(() => {
    
    Store.addListener(onStoreChange)
    // if(props.params.edit){
    //   Action.getProfile()
    // }
    Action.getProfile()
  }, [tempoData])

  const onStoreChange = () => {
    var tempoDataAll = Store.getTempoData()
    var detail = Store.getDetail()
    if (tempoDataAll.success) {
      Store.clearAll()
      setTempoData({ ...tempoData, message: "" });
      setTempoData({ ...tempoData, success: false });
      props.navigation('/UserInfo')
    }
    else {
      setTempoData({ ...tempoData, message: tempoDataAll.message });
      setTempoData({ ...tempoData, update: tempoDataAll.update });
      setForm(detail);
    }
  }

  const nameOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      name: value.target.value
    }));
  }

  const birthdayOnChange = (value) => {
    console.log(value)
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      birthday: value.target.value
    }));
  }

  const horoscopeOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      horoscope: value.target.value
    }));
  }

  const zodiacOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      zodiac: value.target.value
    }));
  }

  const hightOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      height: value.target.value
    }));
  }

  const weightOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      weight: value.target.value
    }));
  }

  const genderOnChange = (value) => {
    if(value.target.value!=='Select'){
      setForm(prevState => ({
        ...prevState,
        gender: value.target.value
      }));
    }
    
  }

  const SaveNUpdate = () => {
    setTempoData({ ...tempoData, message: "" });
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    }
    else{
      form.height=parseInt(form.height)
      form.weight=parseInt(form.weight)
      Action.createProfile(form)
    }
  }

  const UpdateAbout = () => {
    // var tem={
    //   "name": "sdfsdfsdf",
    //   "birthday": "stridsfdsfdsfng",
    //   "height": 10,
    //   "weight": 10,
    //   "interests": [
    //     "strindsfsffgfdg"
    //   ]
    // }
    // console.log(tem)
    // console.log(tem)
    // Action.updateProfile(tem)





    setTempoData({ ...tempoData, message: "" });
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    }
    else{
      form.height=parseInt(form.height)
      form.weight=parseInt(form.weight)
      Action.updateProfile(form)
    }
  }

  



  return <div>
    <Header />
    <div className='form'>
      {/* <h1 className="editAboutText leftTxt">About
        <span onClick={tempoData.update ? UpdateAbout:SaveNUpdate} className="txtGradient floatR">
          Save & Update
        </span>
      </h1> */}
      
      <br/>
      <br/>
      <br/>
      <div className='imageContainer clearfix'>
        <div className='imageContainerLeft'>
          {file ?
            <div className='imageUploadBox'>
              <img onClick={removeImage} src={Close} className="removeImage" />
              <img src={file} className='imageUpload' />
            </div>
            :
            <div>
              <label htmlFor="filePicker" className='imageUpload'>
                <p className='imageUploadText'>+</p>
              </label>
              <input id="filePicker" onChange={handleChange} style={{ visibility: "hidden" }} type={"file"}></input>
              
            </div>
          }
        </div>

        <div className='imageContainerRight'>
          <p>Add Image</p>
        </div>
      </div>
      

      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Display name : </label>
        </div>
        <div className='inputSide'>
          <input value={form.name} type='text' placeholder='Enter name' onChange={nameOnChange} className='aboutInput' />
          {simpleValidator.current.message('name', form.name, 'required') ?
            <div>
              <p className='text'>{simpleValidator.current.message('name', form.name, 'required')}</p>
            </div>
            :
            <br />
          }
        </div>
      </div>
      <br />


      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Gender : </label>
        </div>
        <div className='inputSide'>
          <select onChange={genderOnChange} value={form.gender} className='aboutSelect'>
            <option key="Select" value="Select">Select Gender</option>
            <option key="Male" value="Male">Male</option>
            <option key="Female" value="Female">Female</option>
          </select>
        </div>
      </div>
      <br />

      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Birthday : </label>
        </div>
        <div className='inputSide'>
          <input type="date" required value={form.birthday} onChange={birthdayOnChange} className='aboutInput' />
          {simpleValidator.current.message('birthday', form.birthday, 'required') ?
            <div>
              <p className='text'>{simpleValidator.current.message('birthday', form.birthday, 'required')}</p>
            </div>
            :
            <br />
          }
        </div>
      </div>
      <br />

      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Horoscope : </label>
        </div>
        <div className='inputSide'>
          <input type='text' value={form.horoscope} onChange={horoscopeOnChange} placeholder='--' className='aboutInput' />
          
        </div>
      </div>
      <br />


      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Zodiac : </label>
        </div>
        <div className='inputSide'>
          <input type='text' value={form.zodiac} onChange={zodiacOnChange} placeholder='--' className='aboutInput' />
          
        </div>
      </div>
      <br />


      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Hight : </label>
        </div>
        <div className='inputSide'>
          <input type='number' value={form.height} id="quantity" name="quantity" placeholder='Add High' onChange={hightOnChange} className='aboutInput' />
          {simpleValidator.current.message('height', form.height, 'required') ?
            <div>
              <p className='text'>{simpleValidator.current.message('height', form.height, 'required')}</p>
            </div>
            :
            <br />
          }
        </div>
      </div>
      <br />


      <div className='formBox'>
        <div className='labelSide'>
          <label for="Student" className='aboutLabel'> Weight : </label>
        </div>
        <div className='inputSide'>
          <input type='number' value={form.weight} placeholder='Add Weight' onChange={weightOnChange} className='aboutInput' />
          {simpleValidator.current.message('weight', form.weight, 'required') ?
            <div>
              <p className='text'>{simpleValidator.current.message('weight', form.weight, 'required')}</p>
            </div>
            :
            <br />
          }
        </div>
      </div>
      <br />



      {/* {tempoData.loading ?
        <button className='postActionButton'>Loading</button>
        :
        <div style={{ marginBottom: 25 }}>
          {tempoData.update ?
            <button className='postActionButton' onClick={UpdateAbout}>Save & Update</button>
            :
            <button className='postActionButton' onClick={SaveNUpdate}>Save & Update</button>
          }
          
        </div>
      } */}
      <div>
        <br />
        {/* <button className='aboutAPI' onClick={SaveNUpdate}><span className="txtGradient">
          Save & Update
        </span></button> */}
        

      </div>
      <div style={{paddingBottom:30}}>
        <p className='text'>{tempoData.message}</p>
      </div>
      


    </div>
  </div>
}
export default withNavigateHook(About);