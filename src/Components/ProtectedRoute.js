import React,{ useContext } from "react"
import { store } from "../App";
import { Outlet } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const ProtectedRoute = () => {
  

  const isLoggedIn = window.localStorage.getItem('loggedIn');
  
  
  return isLoggedIn==="true"?<Outlet/>:<AdminLogin/>;
}

export default ProtectedRoute