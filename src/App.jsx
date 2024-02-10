import { useState, useContext, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Routes, Route,useNavigate } from "react-router-dom";
import Error from "./pages/Error";
import Layout from "./components/Layout";
import { LoginContext } from "./components/ContextProvider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Data from "../src/components/Data";

function App() {
  const [data, setData] = useState(false);

  const { loginData, setLoginData } = useContext(LoginContext);

  const navigator = useNavigate()

  //DashBoard Valid Function

  const DashboardValid = () => {
    const user = JSON.parse(localStorage.getItem("UserInfo"));
    // console.log("user", user);
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
            setLoginData(response.data.UserData.name);
            // console.log("Name", response.data.UserData.name);
          } else {
            navigator("/error");
          }
        })
        .catch((error) => {

          console.error(
            `Error: ${error.response.status} - ${error.response.data}`
          );
        });
    }else{
      navigator("/error");
    }
  };

  //Logout User For Every Hour 

  const ValidUser = async () => {
    try {
      localStorage.removeItem("UserInfo");
      setLoginData("");
      navigator("/error");
      
    } catch (error) {
      console.log("Error",error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);

    setTimeout(() => {
      ValidUser();
    },7200000)
  }, []);

  return (
    <>
      {data ? (
        <>
          <Data />
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />} />
            {/* <Route path="/layout" element={<Layout />} /> */}
          </Routes>
       {loginData? <Layout/>:<></>}
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

//   < ProfProd />
// <ProfStore/>
// <ProfQuality/>
// <ProfReport/>
// <QualityReport />
//<StoreReport/>
