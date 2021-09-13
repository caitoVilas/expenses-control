import {useEffect, useState, useContext} from 'react';
import { Col, Container, Row, Table, Button,Form, FloatingLabel} from 'react-bootstrap';
import ListEntities from '../components/ListEntities';
import { useHistory } from 'react-router';

import AuthContext from '../context/AuthContext'
import { baseURL, entitiesURL } from '../enviroment';
import Swal from 'sweetalert2';

const Entitities = () => {

    const [entities, setEntities] = useState([]);
    const [entity, setEntity] = useState('');
    const [errors, setErrors] = useState(false);
    const [viewAdd, setViewAdd] = useState(false);
    const {user} = useContext(AuthContext);
    const url = baseURL + entitiesURL;
    const auth = 'Bearer '+ user.token;
   
    const history = useHistory();

    useEffect(() =>{
        window.scroll(0,600);
        getentities(url);
      },[]);

      const getentities = async () => {
        
        try {
          let res = await fetch(url, {
            method: 'get',
            headers: {
                "content-type": "application/json",
                "Authorization": auth
            }
          });
          let json = await res.json();
          setEntities(json);
        } catch (err) {
          console.log(err);
        }
      }

      const addEntity = () => {
        setViewAdd(true);
        //getentities(url);
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        if(entity === ''){
          setErrors(true);
        }else{
          setErrors(false);
          const urlentity = baseURL+entitiesURL;
          createEntity(urlentity);
          setEntity('');
        }

        //setViewAdd(false);
      }

      const createEntity = async (urlentity) => {
        try {
          let res = await fetch(urlentity, {
            method: 'post',
            headers: {
                "content-type": "application/json",
                "Authorization": auth
            },
            body: JSON.stringify(entity)
          });
          let json = await res.json();
          
          if(!res.ok){
            const {message} = json
            throw Error(` ${message}`);
          }
          getentities(url);
          
        } catch (err) {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: err,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000
          });
        }
      }


      const goHome = () => {
        history.push('/');
      }

      const goCancell = () =>{
        setEntity('');
        setErrors(false);
        setViewAdd(false);
      }

    return (
        <div>
              <Container fluid className="principal">
                <section className="principal">
                <h2 className="section-title">ENTIDADES <i className="fas fa-university"></i></h2>
                <Container>
                    <article className="base-principal py-2 text-center">
                        <Container className="px-2 py-2">
                        <Row>    
                            <Col lg={6}>
                            <Table striped bordered hover variant="dark">
                              <thead>
                                <tr>
                                  <th>Entidad</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {entities.map((en) => <ListEntities key={en.id} entity={en} />)}
                              </tbody>
                            </Table>
                            <Button variant="secondary" onClick={addEntity}>
                            <i className="fas fa-plus-circle"></i> Agregar Entidad
                            </Button>
                            </Col>
                            <Col lg={6}>    
                                {viewAdd && 
                                 
                                  <Form onSubmit={handleSubmit}>
                                  <h5>AGREGAR ENTIDAD</h5>
                                  <FloatingLabel controlId="fuserName" label="Nombre Entidad">
                                               <Form.Control type="text" 
                                                             placeholder="Nombre Entidad" 
                                                             className="my-2"
                                                             value={entity}
                                                             onChange={(e)=> setEntity(e.target.value) }
                                                             />
                                               </FloatingLabel>
                                               {errors && <p className="error">
                                                             Nombre de Entidad requerida <i className="fas fa-exclamation-triangle"></i>
                                                          </p>}
                                               <Row>
                                                 <Col>
                                                  <Button variant="success" type="submit">
                                                    <i className="far fa-save"></i> Guardar Entidad
                                                  </Button>
                                                 </Col>
                                                 <Col>
                                                  <Button variant="danger" onClick={goCancell}>
                                                    <i className="far fa-save"></i> Cancelar
                                                  </Button>
                                                 </Col>
                                               </Row>
                                              
                                  </Form>
                                }
                            </Col>
                        </Row>
                        </Container>
                        <hr />
                        <Button variant="success" onClick={goHome}>
                        <i className="fas fa-home"></i> Inicio
                        </Button>
                    </article>
                </Container>          
                </section>
            </Container>
        </div>
    )
}

export default Entitities
