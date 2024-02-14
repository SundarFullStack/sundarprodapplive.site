import React, { useState,useEffect } from "react";
import "../styles/Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// FPUPDATE COMPONENT FOR CHANGING PASSWORD

const FPUpdate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Rpassword, setRPassword] = useState("");
  const { token } = useParams();


  // handleEmail FUNCTION FOR HANDLING CHANGES HAPPEN IN EMAIL INPUT FIELD
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  // handlePassword FUNCTION FOR HANDLING CHANGES HAPPEN IN PASSWORD INPUT FIELD
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  // handleRPassword FUNCTION FOR HANDLING CHANGES HAPPEN IN CONFIRM PASSWORD INPUT FIELD
  const handleRPassword = (e) => {
    setRPassword(e.target.value);
  };
  const navigate = useNavigate();

  // API FOR UPDATING PASSWORD

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (password !== Rpassword) {
        toast.error("Please Ensure confirm password as same as password");
      } else {
        const response = await axios.post(
          `${API_URL}/ForgotPassword/updatePassword`,
          {
            email: email,
            password: password,
            token: token,
          }
        );
        //   console.log("response", response.data.message)

        if (response.data.message == "Password Changes Successfully") {
          toast.success("Password Changed Successfully");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else if (response.data.message == "Can't able to change password") {
          console.log("Can't able to change password");
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };



  return (
    <>
      {" "}
      <ToastContainer />
      <Container>
        <h3 style={{ textAlign: "center" }}>Password Reset Form</h3>
        <Form onSubmit={handleSubmit}>
          {/* EMAIL INPUT */}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </Form.Group>
          {/* New Password INPUT  */}
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </Form.Group>
          {/* CONFIRM PASSWORD INPUT */}
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={Rpassword}
              onChange={handleRPassword}
              required
            />
          </Form.Group>

          {/* CHANGE PASSWORD BUTTON */}

          <Button variant="primary" type="submit">
            Change Password
          </Button>
          <h6 style={{ marginLeft: "54px", marginTop: "22px" }}>
            Return to Login Page? <Link to="login">Login</Link>
          </h6>
        </Form>
      </Container>
    </>
  );
};

export default FPUpdate;
