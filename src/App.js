import React, { Component,setState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";


import Login from "./component/Login"
import PrivateRoute from "./component/auth/PrivateRoute";
import CreateAccount from "./component/CreateAccount"
import About from "./component/About";
import UserInfo from "./component/UserInfo";
import Interest from "./component/Interest";
import Index from "./component/Main";

 
class App extends Component {
  constructor() {
    super();
    this.state = {favoritecolor: "red"}

    
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
    render() {
        return (
          <div>

            <Routes>
              <Route  path="/" element={<UserInfo />}/>
              
              <Route exact  path="/About" element={<PrivateRoute Component={About} />} />
              <Route exact  path="/About/:edit" element={<PrivateRoute Component={About} />} />
              {/* <Route exact  path="/UserInfo" element={<PrivateRoute Component={UserInfo} />} /> */}
              <Route exact  path="/Interest" element={<PrivateRoute Component={Interest} />} />
              
              
              <Route exact  path="/CreateAccount" element={<CreateAccount/>} />
             
              
              <Route
                exact
                path="/Login"
                element={<Login />}
              />
            </Routes>
          </div>
        );
    }
}
 
export default App;