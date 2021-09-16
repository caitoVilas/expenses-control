import { useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { baseURL, publicURL } from '../enviroment';

const useFormRegister = (initialForm, validateForm) => {

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    //const [response, setresponse] = useState(null);

    const history = useHistory();

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
            const newUser = {
                userName: form.userName,
                email: form.email,
                password: form.password,
                roles: 'user'
            }

            const register = async (url) =>{

               try {
                 let res = await fetch(url, {
                     method: 'post',
                     mode: 'cors',
                     headers: {
                        "content-type": "application/json"
                     },
                     body: JSON.stringify(newUser)
                 });
                 let json = await res.json();

                 setLoading(false);
                 Swal.fire({
                     icon: 'success',
                     title: 'Usuario Registrado!',
                     showCancelButton: false,
                     showConfirmButton: false,
                     timer: 3000
                 });
                 history.push('');
               } catch (err) {
                   setLoading(false);
                   Swal.fire({
                       icon: 'error',
                       title: 'Error al guardar Usuario',
                       showConfirmButton: false,
                       showCancelButton: false,
                       timer: 3000
                   });
               }
            }
            const url = baseURL + publicURL+'/createuser';
            register(url);
        }else{
            return;
        }
    }


    return ({
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    })
}

export default useFormRegister
