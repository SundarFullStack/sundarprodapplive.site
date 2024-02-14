import React, { useState } from "react";
import "../styles/ProfReport.css";
import { IoStorefrontSharp } from "react-icons/io5";
import { useMyContext } from "../components/ContextProvider";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import API_URL from "../../config/global";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// DATA TABLE CUSTOM CSS STYLES

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#1e1e2c",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};

//DATE TIME PICKER STYLES

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

// REPORT FOR DISPLAYING PRODUCTION DETAILS IN TABLE

function ProfReport({ toggle }) {
  // UTILIZING PROFILE CODE VALUES FROM CONTEXT PROVIDER

  let { profileProdData = [] } = useMyContext();

  // LOCAL STATE STORAGE USING useState HOOK

  let [prodReport, setProdReport] = useState([]);
  let [selectProfileCode, setselectProfileCode] = useState(null);
  const [SelectedStartDate, setSelectedStartDate] = useState(new Date());
  const [SelectedEndDate, setSelectedEndDate] = useState(new Date());

  //HANDLING CHANGES HAPPEN ON PROFILE CODE INPUT

  const handleSelectProfileCode = (event) => {
    setselectProfileCode(event.target.value);
  };

  //API FOR GETTING PRODUCTION DETAILS FROM PRODUCTION COLLECTION(TABLE) AND HANDLING RESPONSE
  // PROVIDING PROFILE CODE AND DATE FOR CONDITION

  const handleSearch = async () => {
    try {
      if (!selectProfileCode || !SelectedStartDate || !SelectedEndDate) {
        toast.error("Please Ensure to Provide All Fields!!!");
      } else {
        const res = await axios.post(`${API_URL}/prodData/profReportData`, {
          ProfileCode: selectProfileCode,
          StartDate: SelectedStartDate,
          EndDate: SelectedEndDate,
        });
        if (!res.data.report.length > 0) {
          toast.error("No Report Found this Code");
        } else {
          toast.success("Production Report Fetched Successfully!!");
          setProdReport(res.data.report);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //HANDLING CLEAR BUTTON FUNCTIONALITY

  const handleClear = () => {
    setselectProfileCode(null),
      setSelectedStartDate(new Date()),
      setSelectedEndDate(new Date());
  };

  //REACT DATA TABLE COLUMNS AND ROWS

  const Column = [
    {
      name: "Code",
      selector: (row) => row.ProfileCode,
      sortable: true,
    },
   {
     name: "Start Date",
      selector: (row) => row.ProdStartTime,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.ProdEndTime,
      sortable: true,
    },
    {
      name: "Line",
      selector: (row) => row.Line,
      sortable: true,
    },
    {
      name: "Scrap(Kgs)",
      selector: (row) => row.Scrap,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.ProfileLen,
      sortable: true,
    },
    {
      name: "Operator",
      selector: (row) => row.ProdOperator,
      sortable: true,
    },
    {
      name: "In-Charge",
      selector: (row) => row.ProdInCharge,
      sortable: true,
    },
    {
      name: "Shift",
      selector: (row) => row.Shift,
      sortable: true,
    },
  ];

  //DATA TABLE SEARCH FILTER OPERATIONS

  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filterData = (item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    );
  };

  const filteredData = prodReport.filter(filterData);

  return (
    <>
      <ToastContainer />
      {/* SEARCHING INPUTS CARD */}
      <div
        className="ProfileReport"
        id={toggle ? "ProfileReportS" : "ProfileReportB"}
      >
        <div className="row">
          <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
            <div className="profReport-content">
              <p>
                <IoStorefrontSharp />
                <span style={{ marginLeft: "10px" }}>
                  Profile Production Report
                </span>
              </p>
              <div className="row" style={{ marginTOp: "40px" }}>
                {/* Profile Code */}
                <div className="col-md-12 col-xl-4 col-lg-4 col-xs-12">
                  Profile Code:
                  <select
                    id="PRdropdownSelect"
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
                <div className="col-md-8"></div>

                <div className="col-6 col-md-4">
                  {/* SEARCH BUTTON */}
                  <button
                    type="button"
                    id="PRSearchbutton"
                    onClick={() => handleSearch()}
                  >
                    Search
                  </button>
                  {/* CLEAR BUTTON */}
                  <button
                    type="button"
                    id="PRClearbutton"
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

      {/* DATA TABLE CARD */}

      <div
        className="ProfileReport"
        id={toggle ? "ProfileReportS" : "ProfileReportB"}
      >
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12 col-xl-12 col-lg-12 col-xs-12">
            <div className="table-responsive">
              {/* SEARCH FILTER */}
              <div className="searchFilter">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleFilterChange}
                />
              </div>
              {/* DATA TABLE */}

              <DataTable
                columns={Column}
                data={filteredData}
                customStyles={customStyles}
                pagination
                paginationPerPage={5}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                noDataComponent={<div>No matching records found</div>}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfReport;
