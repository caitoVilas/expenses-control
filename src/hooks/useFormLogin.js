import { useState } from 'react'

const useFormLogin = (initialForm, validateForm) => {

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

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
            console.log(userLogin)
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
