import React, { useState } from "react";
import "../styles/SignUp.css";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// USER REGISTRATION COMPONENT FOR SAVING USER DETAILS

const SignUp = () => {


  // LOCAL OBJECT STATE FOR STORING INPUT VALUES

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // NAVIGATOR FOR NAVIGATION FOR MULTIPLE COMPONENTS USING REACT-ROUTER-DOM

  const navigator = useNavigate();

  //HANLDE CHANGES HAPPEN ON INPUT FIELDS

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // HANDLE SUBMIT: API FOR SAVING(POST) USER DETAILS AND HANDLING RESPONSES

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/signin/verify`, formData);

      if (response.data.status == 200) {
        toast.success("Registration Link Send for your Email Id Successfully");

        setTimeout(() => {
          navigator("/login");
        }, 5000);
      } else if (response.data.status == 400) {
        toast.error("User Already Exist");
      } else if (response.data.status == 500) {
        toast.error("Server Busy");
      }
    } catch (error) {
      console.log("Error During Registration", error);
    }
  };

  



  return (
    <div>
      <ToastContainer />
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

          <Button varient="primary" type="submit">
            Register
          </Button>

          <h6 style={{ marginLeft: "54px", marginTop: "22px" }}>
            Already have an account? <Link to="login">Login</Link>
          </h6>
        </Form>
      </Container>
    </div>
  );
};

export default SignUp;
