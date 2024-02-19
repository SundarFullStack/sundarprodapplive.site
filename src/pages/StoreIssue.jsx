import React, { useState, useEffect, useRef } from "react";
import "../styles/ProfProd.css";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { useMyContext } from "../components/ContextProvider";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import API_URL from "../../config/global";
import axios from "axios";
import Popup from "./Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  `;

function StoreIssue({ toggle }) {
  // Get Data from DB using Context for Dropdowns

  let { profileProdData = [] } = useMyContext();
  let { StoreInCharge = [] } = useMyContext();
  let { StorePallets = [] } = useMyContext();
  let { StoreLocation = [] } = useMyContext();
  let { selectedRows = [],setSelectedRows } = useMyContext();
  let { selectedId, setSelectedId } = useMyContext();
  let { PopupCode, setPopupCode } = useMyContext();
  let [shift, setShift] = useState(["shiftA", "shiftB", "shiftC"]);

  //Local State Storage

  let [searchProfileCode, setsearchProfileCode] = useState(undefined);
  let [selectProfileCode, setselectProfileCode] = useState(undefined);
  let [selectProdQuantity, setselectProdQuantity] = useState(undefined);
  let [selectLocation, setSelectLocation] = useState(undefined);
  let [selectPalletNo, setSelectPalletNo] = useState(undefined);
  let [selectInCharge, setSelectInCharge] = useState(undefined);
  let [selectShift, setselectShift] = useState(undefined);
  let [SelectedConsumeDate, setSelectedConsumeDate] = useState(new Date());

  // console.log("selectedId",selectedId)

  //Handle Profile Code

  const handleSelectProfileCode = (event) => {
    setselectProfileCode(event.target.value);
  };
  //Handle search Profile Code

  const handleSearchProfileCode = (event) => {
    setsearchProfileCode(event.target.value);
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

  //Handle Quantity

  const handleselectQuantiy = (event) => {
    setselectProdQuantity(event.target.value);
  };

  //HandleSave

 

  const handleSave = async () => {
    try {
      if (!selectProfileCode ||
        !selectProdQuantity ||
        !selectLocation ||
        !selectInCharge ||
        !selectPalletNo ||
        !SelectedConsumeDate ||
        !selectShift
      ) {
        // console.log(selectProfileCode,
        //   selectProdQuantity,
        //   selectLocation,
        //   selectPalletNo,
        //   selectInCharge,
        //   selectShift,
        //   SelectedConsumeDate)
        alert("Please Ensure to Provide All Fields!!!");
         
      } else {
        // console.log(selectProfileCode,
        //   selectProdQuantity,
        //   selectLocation,
        //   selectPalletNo,
        //   selectInCharge,
        //   selectShift,
        //   SelectedConsumeDate)
        const res = await axios.put(
          `${API_URL}/profIssue/update/${selectedId}`,
          {
            ProfileCode: selectProfileCode,
            qty: selectProdQuantity,
            PalletNo: selectPalletNo,
            updatedBy: selectInCharge,
            Shift: selectShift,
            updatedDate: SelectedConsumeDate,
            Location: selectLocation,
          }
        );
        // console.log("res", res.data.message);
        if (res.data.message == "Store Details updated Successfully") {
          alert("Profile Issue Details Updated Successfully");
          setTimeout(() => {
            handleClear()
        },2000)
        } else if (res.data.message == "Error In Updating Store Details") {
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //Handle Clear

  const handleClear = () => {
    setselectProfileCode(undefined);
    setselectProdQuantity(undefined);
    setSelectLocation(undefined);
    setSelectPalletNo(undefined);
    setSelectInCharge(undefined);
    setselectShift(undefined);
    setSelectedConsumeDate(new Date());
  };

  //Open popup Handling

  const [isPopupOpen, setPopupOpen] = useState(false);

  // console.log("selectProfileCode",selectProfileCode)
  // console.log("searchProfileCode",searchProfileCode)

  // FOR OPEN POPUP OPERATIONS

  const openPopup = () => {
    if (searchProfileCode != undefined) {
      handleClear()
      setPopupOpen(true);
      setPopupCode(searchProfileCode);
    } else {
      toast.error("Please Provide Profile Code");
    }
  };

  // FOR CLOSE POPUP OPERATION

  const closePopup = () => {
    setPopupOpen(false);
 
  };



  useEffect(() => {
    if (selectedRows.length > 0) {
      setselectProfileCode(selectedRows[0].ProfileCode);
      setselectProdQuantity(selectedRows[0].Quantity);
      setSelectLocation(selectedRows[0].Location);
      setSelectPalletNo(selectedRows[0].PalletNo);
      setSelectInCharge(selectedRows[0].ConsumedBy);
    }
  },[selectedRows])

  return (
    <>
       <ToastContainer />
      {/* Profile Searching Card */}
      <div
        className="ProfileProduction"
        id={toggle ? "ProfileProductionS" : "ProfileProductionB"}
      >
          
        <div className="row">
          <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
            <div className="prof-content">
              <p>
                <AiOutlineIssuesClose />
                <span style={{ marginLeft: "10px" }}>Profile Issue</span>
              </p>
              <div className="row" style={{ marginTOp: "40px" }}>
                {/* Profile Code */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                  Profile Code:
                  <select
                    id="dropdownSelect"
                    multiple={false}
                    onChange={handleSearchProfileCode}
                    value={searchProfileCode || ""}
                    required
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
                {/* Search button */}
                <div className="col-6 col-md-4 mt-5">
                  <button type="button" id="button" onClick={openPopup}>
                    Search
                  </button>
                </div>
                {/* Popup For Store Report profile Selection */}

                <Popup isOpen={isPopupOpen} onRequestClose={closePopup} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Issuing Card */}
      <div
        className="ProfileProduction"
        id={toggle ? "ProfileProductionS" : "ProfileProductionB"}
      >
        <div className="row">
          <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
            <div className="prof-content">
              <div className="row" style={{ marginTop: "40px" }}>
                {/* Profile Code */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                  Profile Code:
                  <select
                    id="dropdownSelect"
                    // multiple={false}
                    onChange={handleSelectProfileCode}
                    value={selectProfileCode|| ""}
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
                  Issued Date:
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
                  Issue Quantity:
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
                    value={selectLocation|| ""}
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
                    value={selectPalletNo|| ""}
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
                  Store In-Charge:
                  <select
                    id="dropdownSelect"
                    onChange={handleSelectInCharge}
                    multiple={false}
                    value={selectInCharge|| ""}
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
                  Store Shift:
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
                {/* Save button */}
                <div className="col-6 col-md-4">
                  <button
                    type="button"
                    id="button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  {/* Clear button */}
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

export default StoreIssue;
