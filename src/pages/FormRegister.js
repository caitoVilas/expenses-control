
import React from 'react'
import { Container, FloatingLabel, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useFormRegister from '../hooks/useFormRegister';
import Loader from '../components/Loader';
import { useEffect } from 'react';

const initialForm = {
    userName: '',
    email: '',
    password: ''
};

const FormRegister = () => {

    useEffect(() =>{
        window.scroll(0,600);
      },[]);

    let history = useHistory();

    const validateForm = () => {
        let errors = {};

        if(!form.userName.trim()){
            errors.userName = 'El Nombre de usuario es Requerido!';
        }

        if(!form.email.trim()){
            errors.email = 'El email es Requerido!';
        }

        if(!form.password.trim()){
            errors.password = 'La Contraseña es Reuerida!';
        }
        return errors;
    };

    let styles = {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#dc3545',
        marginTop: '3px',
        textAlign: 'center'
    }

    const {
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit
    } = useFormRegister(initialForm, validateForm);
    

    const handleCancel = () => {

        history.push('/');
    }

    return (
        <div>
            <Container fluid className="principal">
               <section className="principal">
                 <h2 className="section-title">REGISTRO DE USUARIOS</h2>
                 <Container>
                 <article className="base-principal">
                     <Container>
                       <Form className="py-2 px-2" onSubmit={handleSubmit}>
                       <FloatingLabel controlId="fname" label="Nombre Usuario">
                         <Form.Control type="text" 
                                       placeholder="Nombre Usuario" 
                                       className="my-2"
                                       name="userName"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={form.userName} />
                         {errors.userName && <p style={styles}>{errors.userName} <i className="fas fa-exclamation-triangle">
                             </i></p>}
                       </FloatingLabel>
                       <FloatingLabel controlId="femail" label="email">
                         <Form.Control type="text" 
                                       placeholder="email" 
                                       className="my-2"
                                       name="email"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={form.email} />
                          {errors.email && <p style={styles}>{errors.email} <i className="fas fa-exclamation-triangle">
                             </i></p>}
                       </FloatingLabel>
                       <FloatingLabel controlId="fpassword" label="Contraseña">
                         <Form.Control type="password" 
                                       placeholder="Contraseña" 
                                       className="my-2"
                                       name="password"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={form.password} />
                          {errors.password && <p style={styles}>{errors.password} <i className="fas fa-exclamation-triangle">
                             </i></p>}
                       </FloatingLabel>
                       <hr />
                       <Container>
                       <Row className="text-center">
                           <Col>
                             <Button type="submit" variant="outline-success"><i className="far fa-check-circle"></i> Registrar</Button>
                           </Col>
                           <Col>
                             <Button variant="outline-danger" onClick={handleCancel}>
                                 <i className="fas fa-ban"></i> Cancelar
                            </Button> 
                           </Col>
                       </Row>
                       </Container>
                       </Form>
                       <Container className="text-center">
                          {loading && <Loader />}
                       </Container>
                     </Container>
                 </article>
                 </Container>
               </section>          
            </Container>
        </div>
    )
}



export default FormRegister
