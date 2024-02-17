import React, { useState } from "react";
import "../styles/ProfReport.css";
import { MdBookmarkAdded } from "react-icons/md";
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

// CUSTOM CSS STYLES FOR DATA TABLE

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

// COMPONENT FOR DISPLAYING SAVED QUALITY DETAILS IN  TABLE

function QualityReport({ toggle }) {
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

  //API FOR GETTING QUALITY DETAILS FROM QUALITY COLLECTION(TABLE) AND HANDLING RESPONSE
  // PROVIDING PROFILE CODE AND DATE FOR CONDITION

  const handleSearch = async () => {
    try {
      if (!selectProfileCode || !SelectedStartDate || !SelectedEndDate) {
        toast.error("Please Ensure to Provide All Fields!!!");
      } else {
        const res = await axios.post(`${API_URL}/profQuality/report`, {
          ProfileCode: selectProfileCode,
          StartDate: SelectedStartDate,
          EndDate: SelectedEndDate,
        });

        if (!res.data.report.length > 0) {
          toast.error("No Report Found On THis Code");
        } else {
          toast.success("Quality Report Fetched Successfully!!");
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
      name: "Holded Date",
      selector: (row) => row.HoldedDate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.HoldReason,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.Quantity,
      sortable: true,
    },
    {
      name: "Holded By",
      selector: (row) => row.HoldedBy,
      sortable: true,
    },
    {
      name: "Pallet No",
      selector: (row) => row.PalletNo,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.Location,
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
                <MdBookmarkAdded />
                <span style={{ marginLeft: "10px" }}>Quality Report</span>
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

export default QualityReport;
