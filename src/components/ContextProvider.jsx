import react, { createContext, useState,useContext } from "react";

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
  setQualityReason:()=>Promise,
  QualityInCharge: [],
  setQualityInCharge:()=>Promise,
  QualityPallets: [],
  setQualityPallets:()=>Promise,
  QualityLocation: [],
  setQualityLocation: () => Promise,
  StoreInCharge:[],
  setStoreInCharge:()=>Promise,
  StorePallets:[],
  setStorePallets:()=>Promise,
  StoreLocation:[],
  setStoreLocation: () => Promise,
  PopupCode: [],
  setPopupCode: () => Promise,
  selectedRows:[],
  setSelectedRows: () => Promise,
  selectedId:[],
  setSelectedId: () => Promise
  
});

export const useMyContext = () => useContext(LoginContext);


const Context = ({ children }) => {
  let [loginData, setLoginData] = useState("");
  let [PopupCode, setPopupCode] = useState("");
  const [selectedRows, setSelectedRows] = useState("");
  const [selectedId, setSelectedId] = useState("");
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
   
    
    // console.log("PopupCode", PopupCode);

    let value =
    {
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
      setSelectedId
    }

  return (
    <>
      <LoginContext.Provider
        value={value}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default Context;
