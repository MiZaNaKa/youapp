import React, { useEffect, useState, useRef } from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/UserInfoAction'
import Store from '../store/UserInfoStore'
import Update from "../img/update.png"
import SimpleReactValidator from 'simple-react-validator';
import Close from "../img/close.png"
import Aquarius from "../img/aquarius.png"
import Cancer from "../img/cancer.png"
import Capricorn from "../img/capricorn.png"
import Gemini from "../img/gemini.png"
import Leo from "../img/leo.png"
import Libra from "../img/libra.png"
import Sagittarius from "../img/sagittarius.png"
import Scorpius from "../img/scorpio.png"
import Taurus from "../img/taurus.png"
import Virgo from "../img/virgo.png"
import Aries from "../img/aries.png"
import Pisces from "../img/pisces.png"

import Rat from "../img/rat.png"
import Ox from "../img/ox.png"
import Tiger from "../img/tiger.png"
import Rabbit from "../img/rabbit.png"
import Dragon from "../img/Dragon.png"
import Snake from "../img/snake.png"
import Horse from "../img/horse.png"
import Goat from "../img/goat.png"
import Monkey from "../img/monkey.png"
import Rooster from "../img/Rooster.png"
import Dog from "../img/dog.png"
import Pig from "../img/pig.png"

import More from "../img/more.png"


import { useNavigate } from "react-router-dom";
import withNavigateHook from '../common/Navigate'
import 'react-image-upload/dist/index.css'
import '../commonStyle/commonStyle.css'



function UserInfo(props) {
    const navigate = useNavigate();
    var detailStore = Store.getDetail()
    var formStore = Store.getForm()

    var tempoDataAll = Store.getTempoData()
    const [detail, setDetail] = useState(detailStore)
    const [form, setForm] = useState(formStore)
    const [tempoData, setTempoData] = useState(tempoDataAll)
    const [age, setAge] = useState('')
    const simpleValidator = useRef(new SimpleReactValidator());

    const [editAbout, setEditAbout] = useState(false)

    const [userInfo, setUserInfo] = useState('')
    const [name, setName] = useState('')
    const [exist, setExist] = useState(false)
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
        const getUserInfo = async () => {
            const data = await loginHelper.UserInfo()
            if (data) {
                setUserInfo(data)
                setName(data.username)
            }
            else {
                props.navigation('/Login')
            }
        }
        getUserInfo()
            .catch(console.error);
    }, [])



    useEffect(() => {
        Store.addListener(onStoreChange)
        Action.getProfile()
    }, [])

    const onStoreChange = async () => {
        var tempoDataAll = Store.getTempoData()
        var detail = Store.getDetail()
        var formStore = Store.getForm()
        if (tempoDataAll.success) {
            window.location.reload();

        }
        else {
            if (tempoDataAll.message === 'Session key is expired.Please Login agian') {
                const data = await loginHelper.deleteJWT()
                window.location.reload();
            }
            else {
                setTempoData({ ...tempoData, message: tempoDataAll.message });
                setDetail(detail)
                if (detail.horoscope && detail.horoscope !== 'Error') {
                    console.log(detail)
                    var nowYear = new Date().getFullYear()
                    var born = new Date(detail.birthday).getFullYear()
                    var age = nowYear - born

                    setAge(age)
                    setExist(true)
                }
                else {
                    setExist(false)
                    setDetail(detail);
                }
            }

        }
        setForm(formStore)
    }



    const goAbout = () => {
        // if(exist){
        //   props.navigation('/about/'+"edit")
        // }
        // else{
        //   props.navigation('/about')
        // }

        setEditAbout(true)

        // AboutAction.getDataForUpdate(detail)
    }

    const goInterest = () => {
        props.navigation('/interest')
        // AboutAction.getDataForUpdate(detail)
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
        if (value.target.value !== 'Select') {
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
        else {
            form.height = parseInt(form.height)
            form.weight = parseInt(form.weight)
            Action.createProfile(form)
        }
    }

    const UpdateAbout = () => {

        setTempoData({ ...tempoData, message: "" });
        const formValid = simpleValidator.current.allValid()
        if (!formValid) {
            simpleValidator.current.showMessages()
            forceUpdate(1)
        }
        else {
            form.height = parseInt(form.height)
            form.weight = parseInt(form.weight)
            Action.updateProfile(form)
        }
    }


    return <div>
        <Header />
        <div>
            <div className='form'>
                <div className='txtCenter marginT35'>

                    <img src={More} className="editAboutIcon " />
                    <p className='userInfoName'>@{name}</p>

                    <h4 onClick={() => navigate(-1)} className="editAboutText txtCursor floatL margin0padding0">
                        &lt;  Back
                    </h4>

                </div>
                <div className={exist ? 'userInfoBoxBG' : 'userInfoBox'}>
                    <img src={Update} className="editIcon" />
                    <h3 className='tit03'>@{name}, {age}</h3>
                    {exist ?
                        <div>
                            <p className='txt'>Female</p>

                            <ul>
                                {detail.horoscope ?
                                    <li>
                                        {detail.horoscope === 'Aquarius' ? <img src={Aquarius} /> : null}
                                        {detail.horoscope === 'Cancer' ? <img src={Cancer} /> : null}
                                        {detail.horoscope === 'Capricorn' ? <img src={Capricorn} /> : null}
                                        {detail.horoscope === 'Gemini' ? <img src={Gemini} /> : null}
                                        {detail.horoscope === 'Leo' ? <img src={Leo} /> : null}
                                        {detail.horoscope === 'Libra' ? <img src={Libra} /> : null}
                                        {detail.horoscope === 'Sagittarius' ? <img src={Sagittarius} /> : null}
                                        {detail.horoscope === 'Scorpius' ? <img src={Scorpius} /> : null}
                                        {detail.horoscope === 'Virgo' ? <img src={Virgo} /> : null}
                                        {detail.horoscope === 'Aries' ? <img src={Aries} /> : null}
                                        {detail.horoscope === 'Pisces' ? <img src={Pisces} /> : null}
                                        {detail.horoscope === 'Taurus' ? <img src={Taurus} /> : null}
                                        <p className='txt'>{detail.horoscope}</p>
                                    </li>
                                    :
                                    null
                                }


                                {detail.zodiac ?
                                    <li>
                                        {detail.zodiac === 'Rat' ? <img src={Rat} /> : null}
                                        {detail.zodiac === 'Ox' ? <img src={Ox} /> : null}
                                        {detail.zodiac === 'Tiger' ? <img src={Tiger} /> : null}
                                        {detail.zodiac === 'Rabbit' ? <img src={Rabbit} /> : null}
                                        {detail.zodiac === 'Snake' ? <img src={Snake} /> : null}
                                        {detail.zodiac === 'Horse' ? <img src={Horse} /> : null}
                                        {detail.zodiac === 'Goat' ? <img src={Goat} /> : null}
                                        {detail.zodiac === 'Monkey' ? <img src={Monkey} /> : null}
                                        {detail.zodiac === 'Rooster' ? <img src={Rooster} /> : null}
                                        {detail.zodiac === 'Dog' ? <img src={Dog} /> : null}
                                        {detail.zodiac === 'Pig' ? <img src={Pig} /> : null}
                                        {detail.zodiac === 'Dragon' ? <img src={Dragon} /> : null}

                                        <p className='txt'>{detail.zodiac}</p>
                                    </li>
                                    :
                                    null
                                }


                            </ul>
                        </div>
                        :
                        null
                    }
                </div>

                <div className='aboutInfoBox'>

                    <div>
                        {editAbout ?
                            <span
                                onClick={exist ? UpdateAbout : SaveNUpdate}
                                className="txtGradient floatR txtCursor">
                                Save & Update
                            </span>
                            :
                            <img src={Update} onClick={goAbout} className="editAboutIcon" />
                        }

                        <h3 className="editAboutText">
                            About
                        </h3>
                    </div>

                    {editAbout ?
                        <div>
                            <br />
                            <br />
                            <br />
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
                        </div>
                        :
                        <div>
                            {exist ?
                                <div>
                                    <br />
                                    <br />
                                    <div style={{ marginBottom: 15 }}>
                                        <label className="grayTxt">Birthday : </label>
                                        <h4 className="editAboutText">
                                            {detail.birthday} (Age {age})
                                        </h4>
                                    </div>

                                    <div style={{ marginBottom: 15 }}>
                                        <label className="grayTxt">Horoscope : </label>
                                        <h4 className="editAboutText">
                                            {detail.horoscope}
                                        </h4>
                                    </div>

                                    <div style={{ marginBottom: 15 }}>
                                        <label className="grayTxt">Zodiac : </label>
                                        <h4 className="editAboutText">
                                            {detail.zodiac}
                                        </h4>
                                    </div>

                                    <div style={{ marginBottom: 15 }}>
                                        <label className="grayTxt">Height : </label>
                                        <h4 className="editAboutText">
                                            {detail.height} cm
                                        </h4>
                                    </div>


                                    <div style={{ marginBottom: 15 }}>
                                        <label className="grayTxt">Weight : </label>
                                        <h4 className="editAboutText">
                                            {detail.weight} kg
                                        </h4>
                                    </div>


                                </div>
                                :
                                <p className="editAboutTxt">Add in your to help others know you better</p>
                            }

                        </div>
                    }


                </div>

                <div className='aboutInfoBox clearfix'>
                    <div>
                        <img onClick={goInterest} src={Update} className="editAboutIcon" />
                        <h3 className="editAboutText">
                            Interest
                        </h3>
                    </div>
                    {detail.interests.length > 0 ?
                        <div className='marginT25'>
                            <ul className='interestBox'>
                                {detail.interests.map((value, index) => {
                                    return <li className='interestList' key={index}>{value}</li>
                                })}

                            </ul>

                        </div>
                        :
                        <p className="editAboutTxt">Add in your interest to find a better match</p>
                    }

                </div>
                <br />
                <br />


            </div>
        </div>


    </div>
}
export default withNavigateHook(UserInfo);