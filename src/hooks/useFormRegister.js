import { useState } from 'react';

const useFormRegister = (initialForm, validateForm) => {

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setresponse] = useState(null);

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

            console.log(newUser);
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
    })
}

export default useFormRegister
