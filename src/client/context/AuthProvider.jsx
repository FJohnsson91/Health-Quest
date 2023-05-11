import { createContext, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [dashData, setDashData] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth,dashData,setDashData }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;