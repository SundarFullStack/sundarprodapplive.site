import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API_URL from "../../config/global";
import { useMyContext } from "../components/ContextProvider";
const Data = () => {
  let { lineProdData, setLineProdData } = useMyContext();
  let { InchargeProdData, setInchargeProdData } = useMyContext();
  let { operatorProdData, setOperatorProdData } = useMyContext();
  let { profileProdData, setProfileProdData } = useMyContext();
  let { QualityReason, setQualityReason } = useMyContext();
  let { QualityInCharge, setQualityInCharge } = useMyContext();
  let { QualityPallets, setQualityPallets } = useMyContext();
  let { QualityLocation, setQualityLocation } = useMyContext();
  let { StoreLocation, setStoreLocation } = useMyContext();
  let { StorePallets, setStorePallets } = useMyContext();
  let {StoreInCharge, setStoreInCharge } = useMyContext();

  const GetProfileData = async () => {
    //Line API Calling
    try {

      //Production Line

      let lineData = await axios.get(`${API_URL}/profile/line`);

      //Profile Code
      let profileData = await axios.get(`${API_URL}/profile/profileCode`);

      //Production In-charge
      let InChargeData = await axios.get(`${API_URL}/profile/incharge`);

      //Production Operator

      let operatorData = await axios.get(`${API_URL}/profile/operator`);

      if (lineData || profileData || InChargeData || operatorData) {
        // console.log("lineData",lineData.data.data);
        // console.log("profileData",profileData.data.profileCode);
        // console.log("InChargeData",InChargeData.data.data);
        // console.log("operatorData",operatorData.data.data);
        setLineProdData(lineData.data.data);
        setProfileProdData(profileData.data.profileCode);
        setInchargeProdData(InChargeData.data.data);
        setOperatorProdData(operatorData.data.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  //Get Quality Details

  const GetQualityData = async() => {
    //Reason
    //Status
    //In-Charge
    //Pallets
    //Location

    const QualityReason = await axios.get(`${API_URL}/profQuality/Reason`);
    const QualityInCharge = await axios.get(`${API_URL}/profQuality/InCharge`);
    const QualityPallets = await axios.get(`${API_URL}/profQuality/Pallets`);
    const QualityLocation = await axios.get(`${API_URL}/profQuality/Location`);
    if (QualityReason ||QualityInCharge||QualityPallets||QualityLocation ) {
      // console.log("QualityReason", QualityReason.data.Reasons);
      // console.log("QualityInCharge", QualityInCharge.data.InCharge);
      // console.log("QualityPallets", QualityPallets.data.Pallets);
      // console.log("QualityLocation", QualityLocation.data.Location);
      //Bind Values in Context Providers
     setQualityReason(QualityReason.data.Reasons)
     setQualityInCharge(QualityInCharge.data.InCharge)
     setQualityPallets(QualityPallets.data.Pallets)
     setQualityLocation(QualityLocation.data.Location)

    }
    
  }


  //Get Store Details

  const GetStoreData = async () => {
    
    const StorePallets = await axios.get(`${API_URL}/profStore/Pallets`);
    const StoreInCharge = await axios.get(`${API_URL}/profStore/InCharge`);
    const StoreLocation = await axios.get(`${API_URL}/profStore/Location`);
    if (StorePallets || StoreInCharge ||StoreLocation) {
      // console.log("StorePallets", StorePallets.data.Pallets);
      // console.log("StoreInCharge", StoreInCharge.data.InCharge);
      // console.log("StoreLocation", StoreLocation.data.Location);
      setStoreInCharge(StoreInCharge.data.InCharge)
      setStorePallets(StorePallets.data.Pallets)
      setStoreLocation(StoreLocation.data.Location)
    }
  }

  useEffect(() => {
    GetProfileData();
    GetQualityData();
    GetStoreData();
   

  }, []);
  return <></>;
};

export default Data;
