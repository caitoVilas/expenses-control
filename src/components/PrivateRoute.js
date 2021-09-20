import { useContext  } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {

    const {isLogged} = useContext(AuthContext);

    return(
        <Route {...rest}>{isLogged? <Component /> : <Redirect to="/" />}</Route>
    )
}

export default PrivateRoute;