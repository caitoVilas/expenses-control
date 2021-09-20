import { useContext } from 'react';
import { useState } from 'react'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext';
import { baseURL, publicURL } from '../enviroment';

const useFormLogin = (initialForm, validateForm) => {

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const {handleIsLogged, handleUser} = useContext(AuthContext);

    let history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validateForm(form));

        if(Object.keys(errors).length === 0){
            setLoading(true);
            const userLogin = {
                userName: form.userName,
                password: form.password
            };

            const login = async (url) =>{

                try {
                    let res = await fetch(url, {
                        method: 'post',
                        mode: 'cors',
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(userLogin)
                    })
                    let json = await res.json();
                    if(!res.ok){
                        console.log(res)
                        throw Error(res)
                    }
                    const userLog = {
                        token: json.jwt,
                        id: json.user.id,
                        userName: json.user.userName,
                        email: json.user.email,
                        roles: json.user.roles,
                    }
                    setLoading(false);
                    setResponse(json);
                    handleIsLogged(true);
                    handleUser(userLog);
                    Swal.fire({
                        icon: 'success',
                        title: `Bienvenido ${json.user.userName}`,
                        text: 'Acceso autorizado',
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 3000
                    });
                    history.push('');
                } catch (err) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'No Autorizado!',
                        text: 'Nombre de usuario o contraseña invalidos',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
                
            }      
             const url = baseURL+publicURL+'/login';
             login(url)      
            }else{
                return;
            }
          
            
        }
    

   

    return ({
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    });
}

export default useFormLogin
