import React, { useEffect, useState, useRef } from 'react';
import Header from "./Header"
import { Link,useNavigate } from "react-router-dom";
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/LoginAction'
import Store from '../store/loginStore'
import Show from "../img/show.png"
import Hide from "../img/hide.png"
import withNavigateHook from '../common/Navigate'
import '../commonStyle/commonStyle.css'

import SimpleReactValidator from 'simple-react-validator';


function Login(props) {
  var detail = Store.getDetail()
  var tempoDataAll = Store.getTempoData()
  const [form, setForm] = useState(detail)
  const [tempoData, setTempoData] = useState(tempoDataAll)
  const [showPass, setShowPass] = useState(false)
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const navigate = useNavigate();
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

  const onStoreChange = () => {
    var tempoDataAll = Store.getTempoData()
    if (tempoDataAll.success) {
      setTempoData({ ...tempoData, message: "" });
      setTempoData({ ...tempoData, success: false});
      props.navigation('/')
    }
    else {
      setTempoData({ ...tempoData, message: tempoDataAll.message });
    }
  }


  const emailOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      email: value.target.value
    }));
  }

  const passwordOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      password: value.target.value
    }));
  }

  const NameOnChange = (value) => {
    setTempoData({ ...tempoData, message: "" });
    setForm(prevState => ({
      ...prevState,
      username: value.target.value
    }));
  }

  const showPassAction = () => {
    setShowPass(!showPass)
  }

  const Login = () => {
    setTempoData({ ...tempoData, message: "" });
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    }
    else {
      Action.LoginAction(form)
    }
  }

  return <div>
    <Header />
    <div className="form">
      <h4  onClick={() => navigate(-1)} className="editAboutText txtCursor">
        &lt;  Back
      </h4>

      <h1 className='title marginT'>Login</h1>
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
      <input placeholder='Enter Username' onChange={NameOnChange} className="inputBox" type="text" value={form.username} />
      <br />
      {simpleValidator.current.message('username', form.username, 'required') ?
        <div>
          <p className='text'>{simpleValidator.current.message('username', form.username, 'required')}</p>
        </div>
        :
        <br />
      }
      <div style={{ position: 'relative' }}>
        <input placeholder='Enter Password' onChange={passwordOnChange} className="inputBox" type={showPass ? "text" : "password"} value={form.password} />
        <div onClick={showPassAction} className='seeActionPassword'>
          {showPass ? <img src={Show} className="passIcon" /> : <img src={Hide} className="passIcon" />}

        </div>
      </div>

      <br />
      {simpleValidator.current.message('password', form.password, 'required') ?
        <div>
          <p className='text'>{simpleValidator.current.message('password', form.password, 'required')}</p>
        </div>
        :
        <br />
      }
      {tempoData.loading ?
        <button className='postActionButton'>Loading</button>
        :
        <div>
          <button className='postActionButton' onClick={Login}>Login</button>
        </div>
      }
      <div>

      <br />
        
      </div>
      <p className='text txtCenter'>{tempoData.message}</p>
      <br />
      <p className='txt txtCenter'>No account ? <Link className="txt" to="/CreateAccount">
        <span className="txtGradient">Register here</span>
        
      </Link></p>
      <br />
      <br />
    </div>
  </div>
}
export default withNavigateHook(Login);