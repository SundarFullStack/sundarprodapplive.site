import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useMyContext } from "../components/ContextProvider";
import axios from "axios";
import API_URL from "../../config/global";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

// CUSTOM STYLES FOR REACT DATA TABLE

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

// POPUP FOR IDENTIFYING PROFILE STOCK IN SEARCHED PROFILE CODE

const Popup = (({ isOpen, onRequestClose }) => {

  let { PopupCode } = useMyContext();
  let [prodData, setProdData] = useState([]); 
 

  //HANDLING CHECKLIST OPERATIONS

  const { selectedRows, setSelectedRows } = useMyContext();
  const { selectedId, setSelectedId } = useMyContext();

  const handleSelectedRowsChange = (selectedRows) => {
    setSelectedRows([]);
    setSelectedRows(selectedRows.selectedRows);
    setSelectedId(selectedRows.selectedRows[0]._id);
    onRequestClose();
    // console.log(selectedRows.selectedRows)
  };
  

  // GetProfileData FUNCTION IS USED TO FETCH PROFILE STOCK DETAILS FROM STORE COLLECTION

  const GetProfileData = async () => {
    try {
      const response = await axios.get(`${API_URL}/profIssue/${PopupCode}`);

      if (response.data.data.length < 1) {

        toast.error("No Report Found this Code");
      } else {
        toast.success("profile Data Fetched Successfully!!");
        
        setProdData(response.data.data);
      
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // CALLING API ON RENDERING POPUP WITH GETPROFILE CODE

  useEffect(() => {
    if (PopupCode) {
      GetProfileData();
    }
  }, [PopupCode]);

  //DATA TABLE COLUMNS AND ROWS

  const Column = [
    {
      name: "Code",
      selector: (row) => row.ProfileCode,
      sortable: true,
    },
    {
      name: "Consumption Date",
      selector: (row) => row.ConsumptionDate,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.Quantity,
      sortable: true,
    },
    {
      name: "Consumed By",
      selector: (row) => row.ConsumedBy,
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


  //DATA TABLE SEARCH FUNCTIONALITIES

  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filterData = (item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    );
  };

  const filteredData = prodData.filter(filterData);

  return (
    <>
    
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <ToastContainer />
        <div className="searchFilter" style={{ marginTop: "30px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleFilterChange}
          />
        </div>

      {/* DAA TABLE COMPONENT */}

        <DataTable
          columns={Column}
          data={filteredData}
          customStyles={customStyles}
          pagination
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          paginationPerPage={5}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          noDataComponent={<div>No matching records found</div>}
      ></DataTable>
      
      {/* CLOSE BUTTON */}

        <button id="button" onClick={onRequestClose}>
          Close
        </button>
        
      </Modal>

      </>
 
  );
});

export default Popup;
