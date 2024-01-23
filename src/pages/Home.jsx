import React, { useEffect, useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";
import { LoginContext } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [res, setRes] = useState({});

  const { loginData, setloginData } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("UserInfo"));
      // console.log("user",user)
      if (user) {
        const url = "http://localhost:4000/home";
        // console.log("token",user)
        const headers = {
          Authorization: user,
          "Content-Type": "application/json",
        };

        axios
          .get(url, { headers })
          .then((response) => {
            // console.log(response.data.message);
            if (response.data.message == "User Valid") {
              navigate("/error");
            }
          })
          .catch((error) => {
            console.error(
              `Error: ${error.response.status} - ${error.response.data}`
            );
          });
      }
    }, 2000);
  }, []);

  return (
    <Container>
      <h1>Welcome to our Website</h1>
      {/* <p>We are here to serve you</p> {res.data.name} */}
      <Button type="submit" variant="primary">
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
