import React, { useState } from "react";
import "../styles/SignUp.css";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/global"
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handleChange

  const handleChange = (e) => {

      const { name, value } = e.target;

      setFormData({...formData,
          [name]:value
      })
  };

    // handleSubmit

    const handleSubmit =async  (e) => {
        e.preventDefault();
        // console.log("formData",formData)
      try {

        const response = await axios.post(`${API_URL}/signin/verify`, formData);

        // console.log("response", response.data);

        if (response.data.status == 200) {

          alert("Registration Link Send Successfully");

        } else if(response.data.status == 400) {
          alert("User Already Exist")
          
        }
        else if (response.data.status == 500) {
          alert("Server Busy")
        }
          
      } catch (error) {

        console.log("Error During Registration",error)
        
        }
    }
  return (
    <Container>
      <h1>Registration Form</h1>
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
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
              {/* Button & Routing for Login Page */}

              <Button variant="primary" type="submit">Register</Button>
              <p>Already have an account? <Link to="login">Login</Link></p>

      </Form>
    </Container>
  );
};

export default SignUp;
