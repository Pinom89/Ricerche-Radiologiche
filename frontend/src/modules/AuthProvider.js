import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
    const [pazienteLogin, setPazienteLogin] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider 
            value={{ pazienteLogin,
                     setPazienteLogin, 
                     isLoggedIn,
                     setIsLoggedIn 
                    }}>
            {children}
        </AuthContext.Provider>
    )
}
