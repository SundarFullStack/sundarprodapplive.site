import React from "react";
import { Link } from "react-router-dom";
import { MdBuild } from "react-icons/md";
import "./Menu.css";
import Image from "../../../public/S_Logo1.png";
import { MdBookmarkAdded } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";

const Menu = ({ toggle }) => {
  return (
    <>
      {toggle ? (
        <>
          {/* SIDE NAV BAR */}

          <div className="navbar-profile-pic">
            {/* SIDE NAV NAV BAR PROFILE PICTURE */}
            <img src={Image} alt="profile_logo" />
          </div>
          {/* SIDE NAVBAR ICONS WITH THEIR NAME */}
          <div className="nav-items">
            <div className="nav-item">
              <div className="nav-link">
                <Link to="/home">
                  <FaHome />
                  Home
                </Link>
              </div>
              <div className="nav-link">
                <Link to="/profProd">
                  <MdBuild />
                  Profile Production
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/profQuality">
                  <MdBookmarkAdded />
                  Profile Quality
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/profStore">
                  <IoStorefrontSharp />
                  Profile Consumption
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/storeIssue">
                  <AiOutlineIssuesClose />
                  Profile Issue
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/prodReport">
                  <TbReportAnalytics />
                  Production Report
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/qualityReport">
                  <TbReportAnalytics />
                  Quality Report
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/storeReport">
                  <TbReportAnalytics />
                  Store Report
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* SIDE NAVBAR ICONS WITHOUT THEIR NAMES */}
          <div className="nav-items">
            <div className="nav-item">
              <div className="nav-link">
                <Link to="/home">
                  <FaHome />
                </Link>
              </div>
              <div className="nav-link">
                <Link to="/profProd">
                  <MdBuild />
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/profQuality">
                  <MdBookmarkAdded />
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/profStore">
                  <IoStorefrontSharp />
                </Link>
              </div>

              <div className="nav-link">
                <Link to="prodReport">
                  <TbReportAnalytics />
                </Link>
              </div>
              <div className="nav-link">
                <Link to="/storeIssue">
                  <AiOutlineIssuesClose />
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/qualityReport">
                  <TbReportAnalytics />
                </Link>
              </div>

              <div className="nav-link">
                <Link to="/storeReport">
                  <TbReportAnalytics />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
