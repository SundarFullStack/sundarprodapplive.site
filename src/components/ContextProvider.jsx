import react, { createContext, useState, useContext } from "react";

// CREATE CONTEXT USING CREATECONTEXT KEYWORD WITH LOGIN CONTEXT VARIABLE
export const LoginContext = createContext({
  loginData: [],
  setLoginData: () => Promise,
  profileProdData: [],
  setProfileProdData: () => Promise,
  lineProdData: [],
  setLineProdData: () => Promise,
  InchargeProdData: [],
  setInchargeProdData: () => Promise,
  operatorProdData: [],
  setOperatorProdData: () => Promise,
  QualityReason: [],
  setQualityReason: () => Promise,
  QualityInCharge: [],
  setQualityInCharge: () => Promise,
  QualityPallets: [],
  setQualityPallets: () => Promise,
  QualityLocation: [],
  setQualityLocation: () => Promise,
  StoreInCharge: [],
  setStoreInCharge: () => Promise,
  StorePallets: [],
  setStorePallets: () => Promise,
  StoreLocation: [],
  setStoreLocation: () => Promise,
  PopupCode: [],
  setPopupCode: () => Promise,
  selectedRows: [],
  setSelectedRows: () => Promise,
  selectedId: [],
  setSelectedId: () => Promise,
});

// EXPORTING CONTEXT WITH USECONTEXT KEYWORD
export const useMyContext = () => useContext(LoginContext);

// CONTEXT COMPONENT FOR MANAGING VALUES

const Context = ({ children }) => {
  let [loginData, setLoginData] = useState(null);
  let [PopupCode, setPopupCode] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  let [lineProdData, setLineProdData] = useState([]);
  let [InchargeProdData, setInchargeProdData] = useState([]);
  let [operatorProdData, setOperatorProdData] = useState([]);
  let [profileProdData, setProfileProdData] = useState([]);
  let [QualityReason, setQualityReason] = useState([]);
  let [QualityInCharge, setQualityInCharge] = useState([]);
  let [QualityPallets, setQualityPallets] = useState([]);
  let [QualityLocation, setQualityLocation] = useState([]);
  let [StoreLocation, setStoreLocation] = useState([]);
  let [StorePallets, setStorePallets] = useState([]);
  let [StoreInCharge, setStoreInCharge] = useState([]);

  // STORING ALL STATE VALUES IN VALUE OBJECT FOR PROVIDING TO CHILDREN COMPONENTS

  let value = {
    loginData,
    setLoginData,
    profileProdData,
    setProfileProdData,
    lineProdData,
    setLineProdData,
    InchargeProdData,
    setInchargeProdData,
    operatorProdData,
    setOperatorProdData,
    QualityReason,
    setQualityReason,
    QualityInCharge,
    setQualityInCharge,
    QualityPallets,
    setQualityPallets,
    QualityLocation,
    setQualityLocation,
    StoreInCharge,
    setStoreInCharge,
    StorePallets,
    setStorePallets,
    StoreLocation,
    setStoreLocation,
    PopupCode,
    setPopupCode,
    selectedRows,
    setSelectedRows,
    selectedId,
    setSelectedId,
  };

  return (
    // PROVIDING ALL STATE VALUES TO CHILDREN WITH PROVIDER
    <>
      <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    </>
  );
};

export default Context;
