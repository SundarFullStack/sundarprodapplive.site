import React, { useState, useEffect } from "react";
import "../styles/ProfQuality.css";
import { IoStorefrontSharp } from "react-icons/io5";
import { useMyContext } from "../components/ContextProvider";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import API_URL from "../../config/global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PROFSTORE COMPONENT FOR SAVING ALL PROFILE CONSUMPTION DETAILS IN STORE TABLE

function ProfStore({ toggle }) {
  // Get Data from DB using Context for Dropdowns

  let { profileProdData = [] } = useMyContext();
  let { StoreInCharge = [] } = useMyContext();
  let { StorePallets = [] } = useMyContext();
  let { StoreLocation = [] } = useMyContext();
  let [shift, setShift] = useState(["shiftA", "shiftB", "shiftC"]);

  //Local State Storage

  let [selectProfileCode, setselectProfileCode] = useState(null);
  let [selectProdQuantity, setselectProdQuantity] = useState(null);
  let [selectLocation, setSelectLocation] = useState(null);
  let [selectPalletNo, setSelectPalletNo] = useState(null);
  let [selectInCharge, setSelectInCharge] = useState(null);
  let [selectShift, setselectShift] = useState(null);
  let [SelectedConsumeDate, setSelectedConsumeDate] = useState(new Date());

  //Handle Profile Code Changes

  const handleSelectProfileCode = (event) => {
    setselectProfileCode(event.target.value);
  };

  //Handle Production  shift Changes

  const handleselectShift = (event) => {
    setselectShift(event.target.value);
  };

  //Hold Profile Location Changes

  const handleSelectLocation = (event) => {
    setSelectLocation(event.target.value);
  };
  //Hold Pallet No Changes

  const handleSelectPalletNo = (event) => {
    setSelectPalletNo(event.target.value);
  };
  //Hold In-charge Changes

  const handleSelectInCharge = (event) => {
    setSelectInCharge(event.target.value);
  };

  //Handle Quantity Changes

  const handleselectQuantiy = (event) => {
    setselectProdQuantity(event.target.value);
  };

  //API FOR POST PROFILE CONSUME DETAILS AND HANDLING RESPONSE FOR IT

  const handleSave = async () => {
    try {
      if (
        !selectProfileCode ||
        !selectProdQuantity ||
        !selectLocation ||
        !selectPalletNo ||
        !selectInCharge ||
        !selectPalletNo ||
        !SelectedConsumeDate
      ) {
        toast.error("Please Ensure to Provide All Fields!!!");
      } else {
        const res = await axios.post(`${API_URL}/profStore`, {
          ProfileCode: selectProfileCode,
          Quantity: selectProdQuantity,
          PalletNo: selectPalletNo,
          ConsumedBy: selectInCharge,
          Shift: selectShift,
          ConsumptionDate: SelectedConsumeDate,
          Location: selectLocation,
        });
        // console.log("res", res.data.message);
        if (res.data.message == "Store Details Saved Successfully!!") {
          toast.success("Consumption Details Saved Successfully");

          setselectProfileCode(null);
          setselectProdQuantity(null);
          setSelectLocation(null);
          setSelectPalletNo(null);
          setSelectInCharge(null);
          setselectShift(null);
          setSelectedConsumeDate(new Date());
        } else {
          toast.error("Error in Saving Store Details");
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
    setSelectedConsumeDate(new Date());
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
                <IoStorefrontSharp />
                <span style={{ marginLeft: "10px" }}>Profile Consumption</span>
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
                {/* Consumption Date */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                  Consumption Date:
                  <div className="DateTimePicker">
                    <StyledDatePicker
                      selected={SelectedConsumeDate}
                      onChange={(date) => setSelectedConsumeDate(date)}
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
                {/* Location */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                  Store Location:
                  <select
                    id="dropdownSelect"
                    multiple={false}
                    onChange={handleSelectLocation}
                    value={selectLocation || ""}
                  >
                    <option value="" disabled>
                      Select an Location
                    </option>
                    {StoreLocation.map((location, index) => (
                      <option key={index + 1} value={location.LocationNo}>
                        {location.LocationNo}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Pallet No */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                  Store Pallet No:
                  <select
                    id="dropdownSelect"
                    multiple={false}
                    onChange={handleSelectPalletNo}
                    value={selectPalletNo || ""}
                  >
                    <option value="" disabled>
                      Select an Pallet No
                    </option>
                    {StorePallets.map((pallets, index) => (
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
                    {StoreInCharge.map((data, index) => (
                      <option key={index + 1} value={data.Name}>
                        {data.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row" style={{ marginTop: "45px" }}>
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
              </div>
              <div className="row" style={{ marginTop: "45px" }}>
                <div className="col-md-8"></div>

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
    </>
  );
}

export default ProfStore;
