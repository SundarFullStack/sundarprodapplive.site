import { useState, useContext, useEffect } from "react";
import axios from "axios";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Error from "./pages/Error";
import Layout from "./components/Layout";
import { LoginContext } from "./components/ContextProvider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Data from "../src/components/Data";
import ForgotPassword from "./pages/ForgotPassword";
import FPUpdate from "./pages/FPUpdate";


function App() {
  const [data, setData] = useState(false);

  const { loginData, setLoginData } = useContext(LoginContext);

  const navigator = useNavigate();

  //FUNCTION FOR VALIDATING CURRENT USER AUTHENTICATION FOR EVERY

  const DashboardValid = () => {
    const user = JSON.parse(localStorage.getItem("UserInfo"));

    if (user) {
      const url = "https://production-backend-server-com.onrender.com/home";
      const headers = {
        Authorization: user,
        "Content-Type": "application/json",
      };

      axios
        .get(url, { headers })
        .then((response) => {
          if (response.data.message == "User Valid") {
            setLoginData(response.data.UserData.name);
          } else {
            navigator("/error");
          }
        })
        .catch((error) => {
          console.error(
            `Error: ${error.response.status} - ${error.response.data}`
          );
        });
    }
  };

  //lOGOUT USER AFTER AN HOUR FROM LOGIN

  const ValidUser = async () => {
    try {
      const token = await localStorage.getItem("UserInfo");
      if (token) {
        localStorage.removeItem("UserInfo");
        setLoginData("");
        navigator("/error");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);

    setTimeout(() => {
      ValidUser();
    }, 7200000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Data />
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route
              path="/ForgotPassword/PassUpdate/:token"
              element={<FPUpdate />}
            />
            <Route path="/error" element={<Error />} />
          </Routes>
          {loginData ? <Layout /> : <></>}
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Loading... &nbsp;
            <CircularProgress />
          </Box>
        </>
      )}
    </>
  );
}

export default App;

