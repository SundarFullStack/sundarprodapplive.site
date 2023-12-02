import React,{useEffect,useState} from 'react';
import { Container, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";

const Home = () => {
 
    const [res, setRes] = useState({});

    // if (res.data) {
    //     console.log("res",res.data.name)
    // }
    useEffect (() => {
        
        const user = JSON.parse(localStorage.getItem("UserInfo"));

        if (user && user.token) {
            getData(user.token);
        }
    },[])

     const  getData = async (token)   => {
    
         try {
        
             const config = {
                 headers: {
                     Authorization:token
                 }
             }

             const response = await axios.get(`${API_URL}/home`, config);

            //  console.log("response",response);

             if (response.data.message == "Invalid Token") {
                 alert("Invalid Token")
                 
             } else if (response.data.message == "Server Busy") {
                 alert("Server Busy")
         }else if (response.data.message == "Token Verified successfully") {
                 setRes(response.data);
                //  console.log("response.data",response.data)
                 
             }
        
    } catch (error) {

             console.log("error",error)
        
    }
        
    }
    
    return (
        <Container>

            <h1>Welcome to our Website</h1>
            <p>We are here to serve you</p> {res.data.name}
            <Button type="submit" variant="primary">Get Started</Button>

        </Container>
    )
}

export default Home;