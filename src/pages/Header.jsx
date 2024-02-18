import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../components/ContextProvider";
import { TbLogout2 } from "react-icons/tb";
// import ReactTooltip from "react-tooltip";

// HEADER COMPONENT FOR PROVIDING STATIC HEADER WITH LOGOUT FUNCIONALITIES

function Header() {
  const { loginData, setLoginData } = useContext(LoginContext);

  const navigator = useNavigate();


  //logOutUser FUNCTION IS USED TO PERFORM LOGOUT FUNCTIONALITIES

  const logOutUser = () => {
    try {
      localStorage.removeItem("UserInfo");
      setLoginData("");
      navigator("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Tooltip functionalities

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div className="header">
        <div className="container1">
          <div className="row mt-3" id="headerRow">
            <div className="col-lg-6 col-md-4 col-sm-1 col-xs-1">1 of 3</div>
            {/* CURRENT USER NAME */}
            <div
              className="col-lg-4 col-md-4 col-sm-1 col-xs-1"
              style={{ color: "white", fontSize: "25px" }}
            >
              <p
                style={{ marginLeft: "30px", marginTop: "-4px" }}
                className="loginPara"
              >
                {loginData}
              </p>
              {/* AVATAR INITIAL */}
              {loginData ? (
                <Avatar
                  style={{
                    cursor: "pointer",
                    background: "salmon",
                    marginTop: "-45px",
                    fontWeight: "bold",
                    marginLeft: "300px",
                    textTransform: "capitalize",
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  
                >
                  {loginData[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  style={{
                    background: "blue",
                    marginTop: "-14px",
                    cursor: "pointer",
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  // onClick={handleClick}
                />
              )}
            </div>


            <div
            onClick={logOutUser}
              className="col-lg-2 col-md-4 col-xs-10 col-sm-10"
              id="logout"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative", display: "inline-block" }}
            >
              <span>
                {" "}
                <TbLogout2 />
              </span>
              {showTooltip && (
                <div
                  style={{
                   textAlign: "center",
                   fontSize: "20px",
                   position: "absolute",
                   top: "65px",
                   left: "-9px",
                   right: "142px",
                   transform: "translateX(-50%)",
                   background: "#1e1e2c7a",
                   color:" rgb(255, 255, 255)",
                   padding: "6px 6px",
                   borderRadius: "15px",
                   zIndex: "1"
                  }}
                >
                  Logout
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
