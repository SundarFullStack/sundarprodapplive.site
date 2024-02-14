import React, { useState } from "react";
import "../styles/ProfProd.css";
import { MdBookmarkAdded } from "react-icons/md";
import { useMyContext } from "../components/ContextProvider";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import API_URL from "../../config/global";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// QUALITY COMPONENT FOR PROVIDE AND SAVE QUALTITY

function ProfQuality({ toggle }) {

  // Get Data from DB using Context for Dropdowns

  let { profileProdData = [] } = useMyContext();
  let { QualityReason = [] } = useMyContext();
  let { QualityInCharge = [] } = useMyContext();
  let { QualityPallets = [] } = useMyContext();
  let { QualityLocation = [] } = useMyContext();
  let [status, setStatus] = useState(["Hold","Pending", "Approved"]);
  let [shift, setShift] = useState(["shiftA", "shiftB", "shiftC"]);

  //LOCAL STATE STORAGE

  let [selectProfileCode, setselectProfileCode] = useState(null);
  let [selectProdQuantity, setselectProdQuantity] = useState(null);
  let [selectLocation, setSelectLocation] = useState(null);
  let [selectPalletNo, setSelectPalletNo] = useState(null);
  let [selectInCharge, setSelectInCharge] = useState(null);
  let [selectShift, setselectShift] = useState(null);
  let [selectStatus, setselectStatus] = useState(null);
  let [selectReason, setSelectReason] = useState(null);
  let [SelectedHoldDate, setSelectedHoldDate] = useState(new Date());

  
  //HANDLING CHANGES HAPPEN ON  Profile Code INPUT FIELD

  const handleSelectProfileCode = (event) => {
    setselectProfileCode(event.target.value);
  };

   //HANDLING CHANGES HAPPEN ON  PRODUCTION SHIFT  INPUT FIELD

  const handleselectShift = (event) => {
    setselectShift(event.target.value);
  };

  //HANDLING CHANGES HAPPEN ON  QUALITY LOCATION  INPUT FIELD

  const handleSelectLocation = (event) => {
    setSelectLocation(event.target.value);
  };
  //HANDLING CHANGES HAPPEN ON  PALLET NO INPUT FIELD

  const handleSelectPalletNo = (event) => {
    setSelectPalletNo(event.target.value);
  };
  //HANDLING CHANGES HAPPEN ON  SHIFT IN-CHARGE  INPUT FIELD

  const handleSelectInCharge = (event) => {
    setSelectInCharge(event.target.value);
  };
  //HANDLING CHANGES HAPPEN ON  QUALITY REASON INPUT FIELD

  const handleSelectReason = (event) => {
    setSelectReason(event.target.value);
  };
  //HANDLING CHANGES HAPPEN ON  PROFIULE STATUS INPUT FIELD

  const handleStatus = (event) => {
    setselectStatus(event.target.value);
  };

  //HANDLING CHANGES HAPPEN ON QUANTITY INPUT FIELD

  const handleselectQuantiy = (event) => {
    setselectProdQuantity(event.target.value)
  }



  // API FOR POST AND SAVING QUALITY DETAILS IN QUALITY COLLECTION AND HANDLING RESPONSE
  
  const handleSave = async () => {
    try {
      if (
        !selectProfileCode ||
        !selectProdQuantity ||
        !selectLocation ||
        !selectPalletNo ||
        !selectInCharge ||
        !selectPalletNo ||
        !selectStatus ||
        !selectReason ||
        !SelectedHoldDate 
      ) {
        toast.error("Please Ensure to Provide All Fields!!!");
      } else {

        const res = await axios.post(`${API_URL}/profQuality`, {
          ProfileCode:selectProfileCode,
          Quantity:selectProdQuantity,
          PalletNo:selectPalletNo,
          HoldedBy:selectInCharge,
          Shift:selectShift,
          Status:selectStatus,
          HoldReason:selectReason,
          HoldedDate:SelectedHoldDate,
          Location:selectLocation
        });
        // console.log("res", res.data.message)
        if (res.data.message == "Quality Data Saved Successfully!!") {
          toast.success(res.data.message);
         
          setTimeout(() => {
            setselectProfileCode(null);
            setselectProdQuantity(null);
            setSelectLocation(null);
            setSelectPalletNo(null);
            setSelectInCharge(null);
            setselectShift(null);
            setselectStatus(null);
            setSelectReason(null);
            setSelectedHoldDate(new Date());
          }, 2500)
          
             }else {
              toast.error(res.data.message)
             }
       
      }
    } catch (error) {
      console.log("error", error);
    }
  };

    //HANDLING CLEAR BUTTON FUNCTIONALITY

    const handleClear = () => {
      setselectProfileCode(null);
      setselectProdQuantity(null);
      setSelectLocation(null);
      setSelectPalletNo(null);
      setSelectInCharge(null);
      setselectShift(null);
      setselectStatus(null);
      setSelectReason(null);
      setSelectedHoldDate(new Date());
  };

  //DateTime Picker styles

  const StyledDatePicker = styled(DateTimePicker)`
    margin-top: 20px;
    margin-left: 9px;
    height: 40px;
    width: 280px;
    padding: 10px;
    background-color: #e8edf1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    /* Add more styles as needed */
  `;

  return (
    <> 
    <ToastContainer />
    <div
      className="ProfileProduction"
      id={toggle ? "ProfileProductionS" : "ProfileProductionB"}
    >
       
      <div className="row">
        <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
          <div className="prof-content">
            <p>
            <MdBookmarkAdded/>
              <span style={{ marginLeft: "10px" }}>Profile Quality</span>
            </p>
            <div className="row" style={{ marginTOp: "40px" }}>
              {/* Profile Code */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Profile Code:
                <select
                  id="dropdownSelect"
                  multiple={false}
                  onChange={handleSelectProfileCode}
                  value={selectProfileCode || ""}
                 
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {profileProdData.map((prof_code, index) => (
                    <option key={index + 1} value={prof_code.profile_code}>
                      {`${prof_code.profile_code} - ${prof_code.profile_desc}`}
                    </option>
                  ))}
                </select>
              </div>
              {/* Hold Date */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Holding Date:
                <div className="DateTimePicker">
                  <StyledDatePicker
                    selected={SelectedHoldDate}
                    onChange={(date) => setSelectedHoldDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="d MMMM, yyyy h:mm aa"
                    timeCaption="Time"
                    placeholderText="Select Date and Time"
                    popperPlacement="bottom"
                  />
                </div>
              </div>

                   {/* Profile Quantity*/}
                   <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Profile Quantity:
                <div className="dropdown">
                  <input
                    id="dropdownSelect"
                    className="dropdown-btn"
                    type="number"
                    placeholder="Eg: 100"
                    value={selectProdQuantity || ""}
                    onChange={handleselectQuantiy}
                  />
                </div>
              </div>
          
            </div>
            <div className="row" style={{ marginTop: "45px" }}>
              {/* Hold Reason */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Holding Reason:
                <select
                  id="dropdownSelect"
                  multiple={false}
                  onChange={handleSelectReason}
                  value={selectReason || ""}
                  
                >
                  <option value="" disabled>
                    Select an Reason
                  </option>
                  {QualityReason.map((reason, index) => (
                    <option key={index + 1} value={reason.Reason}>
                      {reason.Reason}
                    </option>
                  ))}
                </select>
              </div>
               {/* Status */}
               <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
               Holding Status:
                <select
                  id="dropdownSelect"
                  multiple={false}
                  onChange={handleStatus}
                  value={selectStatus || ""} 
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                    {status.map((StatusVal, index) => (
                    <option key={index + 1} value={StatusVal}>
                      {StatusVal}
                    </option>
                  ))}
                </select>
              </div>
               {/* Location */}
               <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Holding Location:
                <select
                  id="dropdownSelect"
                  multiple={false}
                  onChange={handleSelectLocation}
                  value={selectLocation || ""}
                >
                  <option value="" disabled>
                    Select an Location
                  </option>
                  {QualityLocation.map((location, index) => (
                    <option key={index + 1} value={location.LocationNo}>
                      {location.LocationNo}
                    </option>
                  ))}
                </select>
              </div>
              
         
            </div>

            <div className="row" style={{ marginTop: "45px" }}>
               {/* Pallet No */}
               <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
               Pallet No:
                <select
                  id="dropdownSelect"
                  multiple={false}
                  onChange={handleSelectPalletNo}
                  value={selectPalletNo || ""}
                  
                >
                  <option value="" disabled>
                    Select an Pallet No
                  </option>
                  {QualityPallets.map((pallets, index) => (
                    <option key={index + 1} value={pallets.PalletNo}>
                      {pallets.PalletNo}
                    </option>
                  ))}
                </select>
              </div>

                {/* In-charge */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Quality In-Charge:
                <select
                  id="dropdownSelect"
                  onChange={handleSelectInCharge}
                  multiple={false}
                  value={selectInCharge || ""}
                  
                >
                  <option value="" disabled>
                    Select an Option
                  </option>
                  {QualityInCharge.map((data, index) => (
                    <option key={index + 1} value={data.Name}>
                      {data.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shift */}
               <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
               Production Shift:
                <select
                  id="dropdownSelect"
                  multiple={false}
                  onChange={handleselectShift}
                  value={selectShift || ""}
                  
                >
                  <option value="" disabled>
                    Select an option
                  </option> 
                  {shift.map((shiftVal, index) => (
                    <option key={index + 1} value={shiftVal}>
                      {shiftVal}
                    </option>
                  ))}
                </select>
              </div> 
             
             

              <div className="row" style={{ marginTop: "45px" }}>
                <div className="col-md-8"></div>
                {/* BUTTONS */}
                  <div className="col-6 col-md-4">
                    {/* SAVE BUTTON */}
                  <button
                    type="button"
                    id="button"
                    onClick={() => handleSave()}
                  >
                    Save
                    </button>
                    {/* CLEAR BUTTON */}
                  <button
                  type="button"
                  id="Clearbutton"
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProfQuality;
