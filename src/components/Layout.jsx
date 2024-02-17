import React, { useState } from "react";
import "../styles/Layout.css";
import { Routes, Route } from "react-router-dom";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import Menu from "../components/Menu/Menu";
import Home from "../pages/Home";
import ProfProd from "../pages/ProfProd";
import ProfQuality from "../pages/ProfQuality";
import ProfStore from "../pages/ProfStore";
import ProfReport from "../pages/ProfReport";
import QualityReport from "../pages/QualityReport";
import StoreReport from "../pages/StoreReport";
import StoreIssue from "../pages/StoreIssue";
import Header from "../pages/Header";

// LAYOUT COMPONENT IS USED TO CREATE AN STATIC LAYOUT SIDEBAR WITH MENUS

const Layout = () => {
  const [toggle, setToggle] = useState(true);

  //HANDLING TOGGLE

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="sidebar-section">
        {/* RENDERING HEADER COMPONENT */}
        <Header />
        {/* SIDEBAR NAVIGATION */}
        <div className={toggle ? "sidebar-toggle sidebar" : "sidebar"}>
          <div className="sidebar-toggle-icons">
            {/* TOGGLE ICON WITH TOGGLING FUNCTIONALITY*/}
            <p onClick={handleToggle}>
              {toggle ? (
                <TbLayoutSidebarRightExpandFilled className="icon-large" />
              ) : (
                <TbLayoutSidebarLeftExpandFilled className="icon-large" />
              )}
            </p>
          </div>
          {/* RENDERING MENU COMPONENT */}
          <Menu toggle={toggle} />
        </div>
      </div>
      {/* CREATE ROUTING FOR ALL COMPONENTS USING REACT-ROUTER-COMPONENT */}
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/profProd" element={<ProfProd toggle={toggle} />} />
        <Route path="/profStore" element={<ProfStore toggle={toggle} />} />
        <Route path="/profQuality" element={<ProfQuality toggle={toggle} />} />
        <Route path="/prodReport" element={<ProfReport toggle={toggle} />} />
        <Route
          path="/qualityReport"
          element={<QualityReport toggle={toggle} />}
        />
        <Route path="/storeReport" element={<StoreReport toggle={toggle} />} />
        <Route path="/storeIssue" element={<StoreIssue toggle={toggle} />} />
       
      </Routes>
    </>
  );
};

export default Layout;
