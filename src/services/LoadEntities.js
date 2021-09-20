
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { baseURL, entitiesURL } from '../enviroment';

const LoadEntities = (setEntities) => {

    const {user} = useContext(AuthContext);
    const url = baseURL + entitiesURL;
    const auth = JSON.stringify('Bearer ' + user.token);

    const getEntitnties = async (url) => {

        try {
            let res = await fetch(url, {
                method: 'get',
                mode: 'cors',
                headers: {
                    "content-type": "application/json",
                    "authorization": auth
                }
            });
            let json = await res.json();
            setEntities(json);
        } catch (err) {
            console.log(err);
        }
    }

    getEntitnties(url);
    return;
}

export default LoadEntities
