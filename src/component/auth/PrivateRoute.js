import { Navigate } from "react-router-dom";
import React, { Component, useState } from "react";
const PrivateRoute = ({ Component }) => {
 
const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('userInfo'));

 // Your authentication logic goes here...
 
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;