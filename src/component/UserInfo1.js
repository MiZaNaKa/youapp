import React, { useEffect, useState, useRef } from 'react';
import Header from "./Header"
import loginHelper from '../jwtHelper/jwtHelper'
import Action from '../action/UserInfoAction'
import Store from '../store/UserInfoStore'
import Update from "../img/update.png"


import Aquarius from "../img/aquarius.png"
import Cancer from "../img/cancer.png"
import Capricorn from "../img/capricorn.png"
import Gemini from "../img/gemini.png"
import Leo from "../img/leo.png"
import Libra from "../img/libra.png"
import Sagittarius from "../img/sagittarius.png"
import Scorpio from "../img/scorpio.png"
import Taurus from "../img/taurus.png"
import Virgo from "../img/virgo.png"
import Aries from "../img/aries.png"
import Pisces from "../img/pisces.png"

import Rat from "../img/rat.png"
import Ox from "../img/ox.png"
import Tiger from "../img/tiger.png"
import Rabbit  from "../img/rabbit.png"
import Dragon from "../img/Dragon.png"
import Snake  from "../img/snake.png"
import Horse  from "../img/horse.png"
import Goat from "../img/goat.png"
import Monkey  from "../img/monkey.png"
import Rooster from "../img/Rooster.png"
import Dog from "../img/dog.png"
import Pig from "../img/pig.png"

import About from './About';
import { Link,useNavigate } from "react-router-dom";
import AboutAction from '../action/AboutAction'
import AboutStore from '../store/AboutStore'
import withNavigateHook from '../common/Navigate'
import 'react-image-upload/dist/index.css'
import '../commonStyle/commonStyle.css'

import SimpleReactValidator from 'simple-react-validator';

function UserInfo(props) {
  var detail = Store.getDetail()
  var tempoDataAll = Store.getTempoData()
  const [form, setForm] = useState(detail)
  const [tempoData, setTempoData] = useState(tempoDataAll)
  const [age, setAge] = useState('')

  const [editAbout, setEditAbout] = useState(false)
 
  const[userInfo,setUserInfo]=useState('')
  const[name,setName]=useState('')
  const[exist,setExist]=useState(false)
  useEffect(() => {
      const getUserInfo = async () => {
        const data = await loginHelper.UserInfo()
        if(data){
          setUserInfo(data)
          setName(data.username)
        }
      }
      getUserInfo()
        .catch(console.error);
  }, [])



  useEffect(() => {
    Store.addListener(onStoreChange)
    Action.getProfile()
  }, [])

  const onStoreChange = () => {
    var tempoDataAll = Store.getTempoData()
    var detail = Store.getDetail()
    if (tempoDataAll.success) {
      props.navigation('/')
    }
    else {
      setTempoData({ ...tempoData, message: tempoDataAll.message });

      if(detail.horoscope && detail.horoscope!=='Error'){
        console.log(detail)
        var nowYear=new Date().getFullYear() 
        var born=new Date(detail.birthday).getFullYear() 
        var age=nowYear-born
        console.log(age)
        console.log(age)
        setAge(age)
        setExist(true)
      }
      else{
        setExist(false)
        setForm(detail);
      }
    }
  }



  const goAbout = () => {
    if(exist){
      props.navigation('/about/'+"edit")
    }
    else{
      props.navigation('/about')
    }

    setEditAbout(true)
    
    // AboutAction.getDataForUpdate(detail)
  }

  const goInterest = () => {
    props.navigation('/interest')
    // AboutAction.getDataForUpdate(detail)
  }

  



  return <div>
    <Header />
    <div>
      <div className='form'>
        <div className={exist ? 'userInfoBoxBG' : 'userInfoBox'}>
          <img src={Update} className="editIcon"/>
          <h3 className='tit03'>@{name}, {age}</h3>
          {exist ? 
            <div>
              <p className='txt'>Female</p>

              <ul>
                {detail.horoscope ? 
                  <li>
                    {detail.horoscope ==='Aquarius' ? <img src={Aquarius}/> : null}
                    {detail.horoscope ==='Cancer' ? <img src={Cancer}/> : null}
                    {detail.horoscope ==='Capricorn' ? <img src={Capricorn}/> : null}
                    {detail.horoscope ==='Gemini' ? <img src={Gemini}/> : null}
                    {detail.horoscope ==='Leo' ? <img src={Leo}/> : null}
                    {detail.horoscope ==='Libra' ? <img src={Libra}/> : null}
                    {detail.horoscope ==='Sagittarius' ? <img src={Sagittarius}/> : null}
                    {detail.horoscope ==='Scorpio' ? <img src={Scorpio}/> : null}
                    {detail.horoscope ==='Virgo' ? <img src={Virgo}/> : null}
                    {detail.horoscope ==='Aries' ? <img src={Aries}/> : null}
                    {detail.horoscope ==='Pisces' ? <img src={Pisces}/> : null}
                    {detail.horoscope ==='Taurus' ? <img src={Taurus}/> : null}
                    <p className='txt'>{detail.horoscope}</p>
                  </li>
                  :
                  null
                }
                

                {detail.zodiac ?
                  <li>
                    {detail.zodiac ==='Rat' ? <img src={Rat}/> : null}
                    {detail.zodiac ==='Ox' ? <img src={Ox}/> : null}
                    {detail.zodiac ==='Tiger' ? <img src={Tiger}/> : null}
                    {detail.zodiac ==='Rabbit' ? <img src={Rabbit}/> : null}
                    {detail.zodiac ==='Snake' ? <img src={Snake}/> : null}
                    {detail.zodiac ==='Horse' ? <img src={Horse}/> : null}
                    {detail.zodiac ==='Goat' ? <img src={Goat}/> : null}
                    {detail.zodiac ==='Monkey' ? <img src={Monkey}/> : null}
                    {detail.zodiac ==='Rooster' ? <img src={Rooster}/> : null}
                    {detail.zodiac ==='Dog' ? <img src={Dog}/> : null}
                    {detail.zodiac ==='Pig' ? <img src={Pig}/> : null}
                    {detail.zodiac ==='Dragon' ? <img src={Dragon}/> : null}

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
                // onClick={exist ? UpdateAbout:SaveNUpdate} 
                className="txtGradient floatR">
                Save & Update
              </span>
              :
              <img src={Update} onClick={goAbout} className="editAboutIcon"/>
            }
            
            <h3 className="editAboutText">
                About
            </h3>
          </div>

          {editAbout ?
            <About/>
            :
            <div>
              {exist ?
                <div>
                  <br/>
                  <br/>
                  <div style={{marginBottom:15}}>
                    <label className="grayTxt">Birthday : </label>
                    <h4 className="editAboutText">
                      {detail.birthday } (Age {age})
                    </h4>
                  </div>

                  <div style={{marginBottom:15}}>
                    <label className="grayTxt">Horoscope : </label>
                    <h4 className="editAboutText">
                      {detail.horoscope}
                    </h4>
                  </div>

                  <div style={{marginBottom:15}}>
                    <label className="grayTxt">Zodiac : </label>
                    <h4 className="editAboutText">
                      {detail.zodiac}
                    </h4>
                  </div>

                  <div style={{marginBottom:15}}>
                    <label className="grayTxt">Height : </label>
                    <h4 className="editAboutText">
                      {detail.height} cm
                    </h4>
                  </div>


                  <div style={{marginBottom:15}}>
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
            <img onClick={goInterest} src={Update} className="editAboutIcon"/>
            <h3 className="editAboutText">
                Interest
            </h3>
          </div>
          {detail.interests.length>0 ?
            <div className='marginT25'>
              <ul className='interestBox'>
                {detail.interests.map((value,index)=>{
                  return <li className='interestList' key={index}>{value}</li>
                })}
                
              </ul>

            </div>
            :
            <p className="editAboutTxt">Add in your interest to find a better match</p>
          }
          
        </div>
        <br/>
        <br/>

        
      </div>
    </div>
    
    
  </div>
}
export default withNavigateHook(UserInfo);