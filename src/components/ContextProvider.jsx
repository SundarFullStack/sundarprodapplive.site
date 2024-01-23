import react,{createContext,useState} from "react";

export const LoginContext = createContext();

const Context = ({ children }) => {
    
    let [loginData, setloginData] = useState("");

    return (<><LoginContext.Provider value={{ loginData, setloginData }}>{ children}</LoginContext.Provider></>)
}

export default Context