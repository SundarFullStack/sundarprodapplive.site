import React, { useState,useEffect } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// USER LOGIN COMPONENT

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handleChange FUNCTION IS UED O HANDLE CHANGES HAPPEN IN INPUTS

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // NAVIGATE IS USED FOR COMPONENT NAVIGATION WITH THE HELP OF REACT-ROUTER-DOM

  const navigate = useNavigate();

  // POSTING LOGIN DATA BY API AND HANDLING RESPONSE

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (formData) {
        const response = await axios.post(`${API_URL}/login`, formData);
        // console.log("response", response.data.message)

        if (response.data.message == "Invalid Username or password") {
          toast.error("Invalid Username or password");
        } else if (
          response.data.message == "User Authenticated Successfully!!"
        ) {
          localStorage.setItem("UserInfo", JSON.stringify(response.data.token));
          toast.success("User Authenticated Successfully");
          setTimeout(() => {
            navigate("/layout");
            window.location.reload();
          }, 2500);
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Invalid User")
    }
  };

 
  return (
    <div>
      <ToastContainer />
      <Container>
        <h1>Login Form</h1>
        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Password */}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* LOGIN Button & Routing for Login Page,FORGOT PASSWORD PAGE */}

          <Button variant="primary" type="submit">
            Login
          </Button>
          <h6 style={{ textAlign: "center", marginTop: "25px" }}>
            Not Registered User? <Link to="/">Registration Page</Link>
          </h6>
          <h6 style={{ textAlign: "center", marginTop: "15px" }}>
            Forgot Password ? <Link to="/ForgotPassword">Forgot Password</Link>
          </h6>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
