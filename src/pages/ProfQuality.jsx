import React, { useState } from "react";
import "../styles/ProfQuality.css";
import { MdBookmarkAdded } from "react-icons/md";
import { useMyContext } from "../components/ContextProvider";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import API_URL from "../../config/global";
import axios from "axios";

function ProfQuality({ toggle }) {

  // Get Data from DB using Context for Dropdowns
  let { profileProdData = [] } = useMyContext();
  let { QualityReason = [] } = useMyContext();
  let { QualityInCharge = [] } = useMyContext();
  let { QualityPallets = [] } = useMyContext();
  let { QualityLocation = [] } = useMyContext();
  let [status, setStatus] = useState(["Hold","Pending", "Approved"]);
  let [shift, setShift] = useState(["shiftA", "shiftB", "shiftC"]);

  //Local State Storage

  let [selectProfileCode, setselectProfileCode] = useState(null);
  let [selectProdQuantity, setselectProdQuantity] = useState(null);
  let [selectLocation, setSelectLocation] = useState(null);
  let [selectPalletNo, setSelectPalletNo] = useState(null);
  let [selectInCharge, setSelectInCharge] = useState(null);
  let [selectShift, setselectShift] = useState(null);
  let [selectStatus, setselectStatus] = useState(null);
  let [selectReason, setSelectReason] = useState(null);
  let [SelectedHoldDate, setSelectedHoldDate] = useState(new Date());

  
  //Handle Profile Code

  const handleSelectProfileCode = (event) => {
    setselectProfileCode(event.target.value);
  };

  //Handle Production  shift

  const handleselectShift = (event) => {
    setselectShift(event.target.value);
  };

//Hold Profile Location

  const handleSelectLocation = (event) => {
    setSelectLocation(event.target.value);
  };
//Hold Pallet No

  const handleSelectPalletNo = (event) => {
    setSelectPalletNo(event.target.value);
  };
//Hold In-charge

  const handleSelectInCharge = (event) => {
    setSelectInCharge(event.target.value);
  };
//Hold Reason

  const handleSelectReason = (event) => {
    setSelectReason(event.target.value);
  };
//Hold Status

  const handleStatus = (event) => {
    setselectStatus(event.target.value);
  };

  //Handle Quantity

  const handleselectQuantiy = (event) => {
    setselectProdQuantity(event.target.value)
  }



  //HandleSave

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
        alert("Please Ensure to Provide All Fields!!!");
      } else {
       
console.log('selectProfileCode',selectProfileCode)
console.log('selectProdQuantity',selectProdQuantity)
console.log('selectLocation',selectLocation)
console.log('selectPalletNo',selectPalletNo)
console.log('selectInCharge',selectInCharge)
console.log('selectShift',selectShift)
console.log('selectStatus',selectStatus)
console.log('selectReason',selectReason)
console.log('SelectedHoldDate',SelectedHoldDate)
        
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
        console.log("res", res.data.message)
        if (res.data.message == "Quality Data Saved Successfully!!") {
          alert(res.data.message);
          setselectProfileCode(null);
          setselectProdQuantity(null);
          setSelectLocation(null);
          setSelectPalletNo(null);
          setSelectInCharge(null);
          setselectShift(null);
          setselectStatus(null);
          setSelectReason(null);
          setSelectedHoldDate(new Date());
             }else {
              alert(res.data.message)
             }
       
      }
    } catch (error) {
      console.log("error", error);
    }
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
    <div
      className="ProfileQuality"
      id={toggle ? "ProfileQualityS" : "ProfileQualityB"}
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

                <div className="col-6 col-md-4">
                  <button
                    type="button"
                    id="button"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfQuality;
