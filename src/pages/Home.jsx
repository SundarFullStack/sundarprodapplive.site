import React, { useEffect, useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";
import { LoginContext } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
 
  const { loginData, setLoginData } = useContext(LoginContext);

  // TOASTIFY ALERT CREATER ON CLICKING GET STARTED BUTTON

  const notify = () => toast.success("Hello, Get Start with Production Page");
console.log("API_URL",API_URL)
  return (

      <div className="row">
          <div id="container"className="col-lg-4 col-md-6 col-sm-12 col-xs-12" style={{width:"400px"}}>
      <h4>Welcome to our Website</h4>
      <p style={{ color: "black" }}>We are here to serve you... </p> 
      <h5 className="text-center"style={{color:"grey",marginBottom:"20px"}}>{loginData}</h5>
      <Button type="submit" onClick={notify}>
        Get Started
      </Button>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Home;
