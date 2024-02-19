import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// FORGOT PASSWORD COMPONENT ALLOWED USED TO PROVIDE EMAIL FOR SEND VERIFICATION LINK
const ForgotPassword = () => {
  const [email, setEmail] = useState("");


  // handleChange FUNCTION FOR HANDLE CHANGES HAPPEN IN EMAIL INPUT

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();

  // HANDLING SUBMIT BUTTON  FUNCTIONALITIES

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // API FOR SENDING EMAIL VERIFICATION FOR CHANGING PASSWORD
      if (email) {
        const response = await axios.post(`${API_URL}/ForgotPassword`, {
          email: email,
        });
        // console.log("response", response.data.message)

        if (
          response.data.message ==
          "Email Successfully send for your registered Email Id"
        ) {
          toast.success("Email Successfully send for your registered Email Id");
        } else if (response.data.message == "Error in sending email") {
          toast.error("Error in sending email");
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* EMAIL INPUT */}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/*SEND EMAIL BUTTON*/}

          <Button variant="primary" type="submit">
            Send Email
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
