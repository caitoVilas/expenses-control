import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({});

const initialLog = false;
const initialUser = {
    token: '',
    id: null,
    userName: '',
    email: '',
    roles: []
};

const AuthProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(initialLog);
    const [user, setUser] = useState(initialUser);

    const handleIsLogged = (logged) => {
        setIsLogged(logged);
    }
    const handleUser = (us) => {
        setUser(us);
    }

    const data = {isLogged, user, handleIsLogged, handleUser};

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export {AuthProvider};
export default AuthContext;