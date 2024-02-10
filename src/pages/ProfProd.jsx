import React, { useState } from "react";
import "../styles/ProfProd.css";
import { MdBuild } from "react-icons/md";
import { useMyContext } from "../components/ContextProvider";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import API_URL from "../../config/global";
import axios from "axios";

function ProfProd({ toggle }) {


  let { lineProdData = [] } = useMyContext();
  let { InchargeProdData = [] } = useMyContext();
  let { profileProdData = [] } = useMyContext();
  let { operatorProdData = [] } = useMyContext();



  let [selectProfileCode, setselectProfileCode] = useState(null);
  let [selectProdLine, setselectProdLine] = useState(null);
  let [selectProdProdIncharge, setselectProdProdIncharge] = useState(null);
  let [selectProdScrap, setselectProdScrap] = useState(null);
  let [selectProdQuantity, setselectProdQuantity] = useState(null);
  let [selectProdOperator, setselectProdOperator] = useState(null);
  let [selectShift, setselectShift] = useState(null);
  let [shift, setShift] = useState(["shiftA", "shiftB", "shiftC"]);
  const [SelectedStartDate, setSelectedStartDate] = useState(new Date());
  const [SelectedEndDate, setSelectedEndDate] = useState(new Date());

  // console.log("profileProdData", profileProdData);
  // console.log("selectProfileDesc", selectProfileDesc);
  // console.log("InchargeProdData", InchargeProdData);
  // console.log("lineProdData", lineProdData);
  // console.log("operatorProdData", operatorProdData);

  //Handle Profile Code

  const handleSelectProfileCode = (event) => {
    setselectProfileCode(event.target.value);
  };

  //Handle Profile Code

  const handlesetselectProdLine = (event) => {
    setselectProdLine(event.target.value);
  };

  //Handle Profile Code

  const handleselectProdProdIncharge = (event) => {
    setselectProdProdIncharge(event.target.value);
  };

  //Handle Profile Code

  const handleselectProdOperator = (event) => {
    setselectProdOperator(event.target.value);
  };
  //Handle Profile Code

  const handleselectShift = (event) => {
    setselectShift(event.target.value);
  };

  //Handle Production Scrap

  const handleselectScrap = (event) => {
    setselectProdScrap(event.target.value);
  };
  //Handle Production Quantiy

  const handleselectQuantiy = (event) => {
    setselectProdQuantity(event.target.value);
  };
  //handleSave

  const handleSave = async () => {
    try {
      if (
        !selectProfileCode ||
        !selectProdLine ||
        !selectProdProdIncharge ||
        !selectProdOperator ||
        !selectShift ||
        !SelectedStartDate ||
        !SelectedEndDate ||
        !selectProdScrap ||
        !selectProdQuantity
      ) {
        alert("Please Ensure to Provide All Fields!!!");
      } else {
      //   console.log("selectProfileCode", selectProfileCode);
      //   console.log("selectProdLine", selectProdLine);
      //   console.log("selectProdProdIncharge", selectProdProdIncharge);
      //   console.log("selectProdOperator", selectProdOperator);
      //   console.log("selectShift", selectShift);
      //   console.log("selectShift", selectShift);
      //   console.log("SelectedStartDate", SelectedStartDate);
      //  console.log("SelectedEndDate", SelectedEndDate);
      //   console.log("selectProdScrap", selectProdScrap);
      //   console.log("selectProdQuanity", selectProdQuantity);
        
        const res = await axios.post(`${API_URL}/prodData`, {
          ProfileCode: selectProfileCode,
          ProdStartTime: SelectedStartDate,
          ProdEndTime: SelectedEndDate,
          Line: selectProdLine,
          Scrap: selectProdScrap,
          ProfileLen: selectProdQuantity,
          ProdInCharge: selectProdProdIncharge,
          ProdOperator: selectProdOperator,
          Shift: selectShift,
        });
        // console.log("res", res.data.message)
        if (res.data.message == "Production Details Saved Successfully") {
          alert(res.data.message);
          setselectProfileCode(null);
          setselectProdLine(null)
          setselectProdProdIncharge(null)
          setselectProdOperator(null)
          setselectShift(null)
          setSelectedStartDate(new Date())
          setSelectedEndDate(new Date())
          setselectProdScrap(null)
          setselectProdQuanity(null)
             }else if(res.data.message == "Error in Saving Production Details") {
              alert("Error in Saving Production Details")
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
      className="ProfileProduction"
      id={toggle ? "ProfileProductionS" : "ProfileProductionB"}
    >
      <div className="row">
        <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
          <div className="prof-content">
            <p>
              <MdBuild />
              <span style={{ marginLeft: "10px" }}>Profile Production</span>
            </p>
            <div className="row" style={{ marginTOp: "40px" }}>
              {/* Profile Code */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Profile Code:
                <select
                  id="dropdownSelect"
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
              {/* Production Start Time */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Production Start Time:
                <div className="DateTimePicker">
                  <StyledDatePicker
                    selected={SelectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
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
              {/* Production Start Time */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Production End Time:
                <div className="DateTimePicker">
                  <StyledDatePicker
                    selected={SelectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
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
            </div>
            <div className="row" style={{ marginTop: "45px" }}>
              {/* Line */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Production Line:
                <select
                  id="dropdownSelect"
                  onChange={handlesetselectProdLine}
                  value={selectProdLine || ""}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {lineProdData.map((prod_line, index) => (
                    <option key={index + 1} value={prod_line.Line}>
                      {prod_line.Line}
                    </option>
                  ))}
                </select>
              </div>
              {/* Profile Scrap*/}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Profile Scrap (Kgs):
                <div className="dropdown">
                  <input
                    id="dropdownSelect"
                    className="dropdown-btn"
                    type="number"
                    placeholder="Eg: 10"
                    value={selectProdScrap || ""}
                    onChange={handleselectScrap}
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
              {/* Shift */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Production Shift:
                <select
                  id="dropdownSelect"
                  onChange={handleselectShift}
                  value={selectShift || ""}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {shift.map((shift, index) => (
                    <option key={index + 1} value={shift}>
                      {shift}
                    </option>
                  ))}
                </select>
              </div>
              {/* Shift InCharge */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Shift In-Charge:
                <select
                  id="dropdownSelect"
                  onChange={handleselectProdProdIncharge}
                  value={selectProdProdIncharge || ""}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {InchargeProdData.map((InchargeName, index) => (
                    <option key={index + 1} value={InchargeName.Name}>
                      {InchargeName.Name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Shift Operator */}
              <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                Shift Operator:
                <select
                  id="dropdownSelect"
                  onChange={handleselectProdOperator}
                  value={selectProdOperator || ""}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {operatorProdData.map((prod_operator, index) => (
                    <option key={index + 1} value={prod_operator.OperatorName}>
                      {prod_operator.OperatorName}
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

export default ProfProd;
