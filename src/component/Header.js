
import { Link } from "react-router-dom";
import React, {  useEffect,useState} from 'react';
import Logo from "../img/logo.jpg"

import loginHelper from '../jwtHelper/jwtHelper'
import Drawer from 'react-modern-drawer'
import Close from "../img/close.png"
import Menu from "../img/menu.png"
import User from "../img/user.png"
import 'react-modern-drawer/dist/index.css'
import '../commonStyle/commonStyle.css'
function Home(){
    const[name,setName]=useState('')
    const[userInfo,setUserInfo]=useState('')
    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            setUserInfo(data)
            const myArray = data.username.split(" ")
            setName(myArray[0])
          }
        }
        getUserInfo()
          .catch(console.error);
    }, [])

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


    
    const logOut=async()=>{
        const data = await loginHelper.deleteJWT()
        window.location.reload();
    }



    return <div className="header">
        <div className="headerBox clearfix">
            <div>
                <div className="logo1">
                    <Link className="link">
                        <img onClick={toggleDrawer} src={Menu} className="menuIcon"/>
                    </Link>
                </div>
                <div className="logo2">
                    <Link className="link" to="/">
                        <img src={Logo} className="logoIcon"/>
                    </Link>
                </div>
            </div>
            
            
    
            <div className="headercontent">
                
            </div>

            <div className="userInfo">
                {userInfo ?
                    <div>
                        {userInfo.profileImage ? 
                            <div>
                                <img  src={userInfo.profileImage} className="userIcon"/>
                            </div>
                            :
                            <Link className="link" to="/">
                                <img  src={User} className="userIcon"/>
                            </Link>
                            
                        }
                        <p style={{fontSize:14,color:'#fff'}}>{name}</p>
                    </div>                    
                    :
                    null                    
                }

                
                
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className='bla bla bla'
                >
                    <div style={{marginTop:40}}>
                        <img onClick={toggleDrawer}  src={Close} className="menuClose"/>

                        {userInfo ? 
                            <div>
                                
                                <div style={{marginBottom:25,textAlign:'center'}}>
                                    <Link className="link" to="/">
                                        User Info
                                    </Link>
                                </div>


                                <div style={{marginBottom:25,textAlign:'center'}}>
                                    <p onClick={logOut} className="logout">Log Out</p>
                                </div>
                            </div>
                            :
                            <div>
                                <div style={{marginBottom:25,textAlign:'center'}}>
                                    <Link className="link" to="/login">
                                        Login
                                    </Link>
                                </div>

                                <div style={{marginBottom:25,textAlign:'center'}}>
                                    <Link className="link" to="/createAccount">
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                </Drawer>
                
                
            </div>
        </div>
    </div>
}
export default Home