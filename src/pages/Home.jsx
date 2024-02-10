import React, { useEffect, useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";
import { LoginContext } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";


const Home = () => {
 
  const { loginData, setLoginData } = useContext(LoginContext);

  return (
    <Container style={{width:"400px"}}>
      <h1>Welcome to our Website</h1>
      <p style={{ color: "black" }}>We are here to serve you... </p> 
      <h4 className="text-center"style={{color:"grey",marginBottom:"20px"}}>{loginData}</h4>
      <Button type="submit" variant="primary">
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
