import React, {useEffect} from "react";
import axios from "axios";
import API_URL from "../../config/global";
import { useMyContext } from "../components/ContextProvider";

// DATA COMPONENT FOR FETCHING DROPDOWN VALUES FROM DB COLLECTIONS USING API'S

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
  let { StoreInCharge, setStoreInCharge } = useMyContext();

  // GetProfileData FUNCTION IS USED TO CALL API'S FOR PRODUCTION SCREENS

  const GetProfileData = async () => {
    try {
      // API DATA FOR PRODUCTION LINE DROPDOWN

      let lineData = await axios.get(`${API_URL}/profile/line`);

      // API DATA FOR PRODUCTION PROFILE CODE DROPDOWN
      let profileData = await axios.get(`${API_URL}/profile/profileCode`);

      // API DATA FOR PRODUCTION SHIFT IN-CHARGE DROPDOWN
      let InChargeData = await axios.get(`${API_URL}/profile/incharge`);

      // API DATA FOR PRODUCTION SHIFT OPERATOR  DROPDOWN

      let operatorData = await axios.get(`${API_URL}/profile/operator`);

      if (lineData || profileData || InChargeData || operatorData) {
        setLineProdData(lineData.data.data);
        setProfileProdData(profileData.data.profileCode);
        setInchargeProdData(InChargeData.data.data);
        setOperatorProdData(operatorData.data.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // GetQualityData FUNCTION IS USED TO CALL API'S FOR QUALITY SCREENS

  const GetQualityData = async () => {
    // API DATA FOR QUALITY REASON LINE DROPDOWN
    const QualityReason = await axios.get(`${API_URL}/profQuality/Reason`);
    // API DATA FOR QUALITY IN-CHARGE LINE DROPDOWN
    const QualityInCharge = await axios.get(`${API_URL}/profQuality/InCharge`);
    // API DATA FOR QUALITY PALLETS LINE DROPDOWN
    const QualityPallets = await axios.get(`${API_URL}/profQuality/Pallets`);
    // API DATA FOR QUALITY LOCATION LINE DROPDOWN
    const QualityLocation = await axios.get(`${API_URL}/profQuality/Location`);

    if (QualityReason || QualityInCharge || QualityPallets || QualityLocation) {
      setQualityReason(QualityReason.data.Reasons);
      setQualityInCharge(QualityInCharge.data.InCharge);
      setQualityPallets(QualityPallets.data.Pallets);
      setQualityLocation(QualityLocation.data.Location);
    }
  };

  //GetStoreData FUNCTION IS USED TO CALL API'S

  const GetStoreData = async () => {
    // API DATA FOR STORE PALLETS LINE DROPDOWN
    const StorePallets = await axios.get(`${API_URL}/profStore/Pallets`);
    // API DATA FOR STORE IN-CHARGE LINE DROPDOWN
    const StoreInCharge = await axios.get(`${API_URL}/profStore/InCharge`);
    // API DATA FOR STORE LOCATION DROPDOWN
    const StoreLocation = await axios.get(`${API_URL}/profStore/Location`);
    if (StorePallets || StoreInCharge || StoreLocation) {
      setStoreInCharge(StoreInCharge.data.InCharge);
      setStorePallets(StorePallets.data.Pallets);
      setStoreLocation(StoreLocation.data.Location);
    }
  };

  useEffect(() => {
    GetProfileData();
    GetQualityData();
    GetStoreData();
  }, []);
  return <></>;
};

export default Data;
