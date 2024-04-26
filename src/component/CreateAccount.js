import React, { useEffect, useState, useRef } from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/CreateAccountAction'
import Store from '../store/CreateAccountStore'
import withNavigateHook from '../common/Navigate'
import Show from "../img/show.png"
import Hide from "../img/hide.png"
import '../commonStyle/commonStyle.css'
import { Link,useNavigate } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';


function CreateAccount(props) {

  var detail = Store.getDetail()
  var tempoDataAll = Store.getTempoData()
  const [form, setForm] = useState(detail)
  const [tempoData, setTempoData] = useState(tempoDataAll)
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [created, setCreated] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConPass, setShowConPass] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    Store.addListener(onStoreChange)
  }, []);

  useEffect(() => {
    Store.addListener(onStoreChange)
    const getUserInfo = async () => {
      const data = await loginHelper.UserInfo()
      if (data) {
        props.navigation('/')
      }
    }
    getUserInfo()
      .catch(console.error);
  }, [])


  useEffect(() => {
    Store.addListener(onStoreChange)
  }, []);

  const onStoreChange = () => {
    var tempoDataAll = Store.getTempoData()
    console.log(tempoDataAll.message)

    if (tempoDataAll.message === 'User has been created successfully') {
      setCreated(true)
      setTempoData({ ...tempoData, message: '' });
    }
    else {
      setCreated(false)
      setTempoData({ ...tempoData, message: tempoDataAll.message });
    }
  }

  const emailOnChange = (value) => {
    setForm(prevState => ({
      ...prevState,
      email: value.target.value
    }));
    Action.emailOnChangeInCreateAcc(value.target.value)
  }

  const passwordOnChange = (value) => {
    setForm(prevState => ({
      ...prevState,
      password: value.target.value
    }));
    Action.passwordOnChangeInCreateAcc(value.target.value)
  }

  const nameOnChange = (value) => {
    setForm(prevState => ({
      ...prevState,
      username: value.target.value
    }));
    Action.nameOnChangeInCreateAcc(value.target.value)
  }

  const createAccountAPI = () => {
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    }
    else {
      if (form.password === form.retypePassword) {
        setPasswordMatch(false)
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const str = `some12*Nuts`;
        let m;
        var password = false
        if ((m = regex.exec(form.password)) !== null) {
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            password = true
          });
        }

        if (password) {
          setTempoData({ ...tempoData, message: "" });
          Action.createAccountAPI(form)
        }
        else {
          setTempoData({ ...tempoData, message: "Required password with special characters,Number and capital letter" });
        }
      }
      else {
        setPasswordMatch(true)
      }
    }


  }



  const rePasswordOnChange = (value) => {
    setForm(prevState => ({
      ...prevState,
      retypePassword: value.target.value
    }));
    Action.rePasswordOnChange(value.target.value)
  }

  const showPassAction = () => {
    setShowPass(!showPass)
  }

  const showConPassAction = () => {
    setShowConPass(!showConPass)
  }



  return <div className='bgbody'>
    <Header />

    <div className="form">
      <h4  onClick={() => navigate(-1)} className="editAboutText txtCursor">
        &lt;  Back
      </h4>
      <h1 className='title marginT'>Register</h1>
      <br />
      <input placeholder='Enter Email' onChange={emailOnChange} className="inputBox" type="text" value={form.email} />
      <br />

      {simpleValidator.current.message('email', form.email, 'required|email') ?
        <div>
          <p className='text'>{simpleValidator.current.message('email', form.email, 'required|email')}</p>
        </div>
        :
        <br />
      }

      <input placeholder='Create Username' onChange={nameOnChange} className="inputBox" type="text" value={form.username} />
      <br />
      {simpleValidator.current.message('username', form.username, 'required') ?
        <div>
          <p className='text'>{simpleValidator.current.message('username', form.username, 'required')}</p>
        </div>
        :
        <br />
      }

      <div style={{ position: 'relative' }}>
        <input placeholder='Create Password' onChange={passwordOnChange} className="inputBox" type={showPass ? "text" : "password"} value={form.password} />
        <div onClick={showPassAction} className='seeActionPassword'>
          {showPass ? <img src={Show} className="passIcon" /> : <img src={Hide} className="passIcon" />}
        </div>
      </div>




      {simpleValidator.current.message('password', form.password, 'required') ?
        <div>
          <p className='text'>{simpleValidator.current.message('password', form.password, 'required')}</p>
        </div>
        :
        <br />
      }

      <div style={{ position: 'relative' }}>
        <input placeholder='Confirm Password' onChange={rePasswordOnChange} className="inputBox" type={showConPass ? "text" : "password"} value={form.retypePassword} />
        <div onClick={showConPassAction} className='seeActionPassword'>
          {showConPass ? <img src={Show} className="passIcon" /> : <img src={Hide} className="passIcon" />}
        </div>
      </div>

      {simpleValidator.current.message('retypePassword', form.retypePassword, 'required') ?
        <div>
          <p className='text'>{simpleValidator.current.message('retypePassword', form.retypePassword, 'required')}</p>
        </div>
        :
        <br />
      }

      {passwordMatch ?
        <div>
          <p className='text'>Password is not match</p>
        </div>
        :
        null
      }

      <button onClick={createAccountAPI} className='postActionButton'>Register</button>
      <br />
      {tempoData.message ?
        <div>
            <p className='text txtCenter'>{tempoData.message}</p>
        </div>
        :
        <br />
      }
      
      <p className='txt txtCenter'>Have an account ? <Link className="txt" to="/login">
        <span className="txtGradient">Login here</span>
        
      </Link></p>


      {created ?
        <p className='txt txtCenter'>User has been created successfully.<Link className="txt" to="/login">
          Please login again.
        </Link></p>
        :
        null
      }

      
<br /><br /><br />



    </div>
  </div>
}
export default withNavigateHook(CreateAccount);