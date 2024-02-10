import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LoginContext } from "../components/ContextProvider";
function Header() {

    const { loginData, setLoginData } = useContext(LoginContext);

    // console.log("loginData", loginData);
    const navigator = useNavigate(); 

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    //goError

    const goError = () => {
        navigator("/error")
    }

    //Logout User

    const logOutUser = () => {

        const token = localStorage.getItem("UserInfo");

        // console.log("token", token);

        if (token) {
          localStorage.removeItem("UserInfo");
          setLoginData("")
          navigator("/login")
        }else{
            console.log("Error in Logout User!!!");
        }
  }

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="container1">
          <div className="row mt-3">
            <div className="col">1 of 3</div>

            <div
              className="col-md-auto"
              style={{ color: "white", fontSize: "25px" }}
            >
              <p>{loginData}</p>
            </div>
            <div className="col col-lg-2 mt-2">
            {
                            loginData ? <Avatar style={{cursor:"pointer", background: "salmon", marginTop: "-10px", fontWeight: "bold", textTransform: "capitalize" }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{loginData[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue",marginTop: "-10px",cursor:"pointer" }}aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                        }
                      </div>
                      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {logOutUser()}}>Logout</MenuItem>
      </Menu>
                    
                  </div>
                 
        </div>
          </div>
         
    </>
  );
}

export default Header;
