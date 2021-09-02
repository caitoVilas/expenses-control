import React from 'react'
import { useEffect } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Loader from '../components/Loader'
import useFormLogin from '../hooks/useFormLogin'

const initialForm = {
  userName: '',
  password: ''
}

const FormLogin = () => {

  useEffect(() =>{
    window.scroll(0,600);
  },[]);

    let history = useHistory();

    const validateForm = () => {
      let errors = {};

      if(!form.userName.trim()){
        errors.userName = 'El Nombre de usuario es Requerido!';
      }

      if(!form.password.trim()){
        errors.password = 'La Contraseña es Reuerida!';
      }

      return errors;
    }

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
    } = useFormLogin(initialForm, validateForm);

    const handleCancel = () => {
        history.push('/home');
    }

    return (
        <div>
         <Container fluid className="principal">
               <section className="principal">
                 <h2 className="section-title">INGRESO DE USUARIOS</h2>
                 <Container>
                 <article className="base-principal">
                     <Container>
                       <Form className="py-2 px-2" onSubmit={handleSubmit}>
                       <FloatingLabel controlId="fuserName" label="Nombre Usuario">
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
                             <Button type="submit" variant="outline-success"><i className="fas fa-sign-in-alt"></i> Ingresar</Button>
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

export default FormLogin
