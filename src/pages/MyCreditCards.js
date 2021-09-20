import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Table, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useHistory } from 'react-router'
import Swal from 'sweetalert2';
import ListCreditCards from '../components/ListCreditCards';
import AuthContext from '../context/AuthContext';
import { baseURL, cardsURL, entitiesURL, myCreditCardsURL } from '../enviroment';
import Cards from './Cards';

const MyCreditCards = () => {

    const [creditCars, setCreditCards] = useState([]);
    const [cards, setCards] = useState([]);
    const [entities, setEntities] = useState([]);
    const [entity, setEntity] = useState(null);
    const [card, setCard] =useState(null);
    const [viewAdd, setViewAdd] = useState(false);
    const history = useHistory();
    
    const {user} = useContext(AuthContext);
    const auth = 'Bearer ' + user.token;
    const url = baseURL + myCreditCardsURL + '/my-cards/' + user.id; 
    const url1 = baseURL + myCreditCardsURL;
    const urlCard = baseURL + cardsURL;
    const urlInstitution = baseURL + entitiesURL;

    useEffect(() =>{
        window.scroll(0,600);
       getCreditCards(url);
      },[]);

    const getCreditCards = async (url) => {
        try {
            let res = await fetch(url, {
                method: 'get',
                mode: 'cors',
                headers: {
                    "content-type": "application/json",
                    "Authorization": auth
                }
            });
            let data = await res.json();
            setCreditCards(data);
        } catch (err) {
            console.log(err)
        }
    }

    const addCCards = () => {
        setViewAdd(true);
        getCards(urlCard);
        getIndtitutions(urlInstitution);
    };

    const getCards = async (urlCard) => {
        try {
            let res = await fetch(urlCard, {
                method: 'get',
                mode: 'cors',
                headers: {
                    "content-type": "application/json",
                    "Authorization": auth
                }
            });
            let data = await res.json();
            setCards(data);
        } catch (err) {
            console.log(err)
        }
    }

    const getIndtitutions = async (urlInstitution) => {
        try {
            let res = await fetch(urlInstitution, {
                method: 'get',
                mode: 'cors',
                headers: {
                    "content-type": "application/json",
                    "Authorization": auth
                }
            });
            let data = await res.json();
            setEntities(data);
        } catch (err) {
            console.log(err)
        }
    }

    const handleEChange = (e) => {
        setEntity(e.target.value);
    }

    const handleCChange = (e) => {
        setCard(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(entity === null || card === null){
            return;
        }else{
            let newCreditCard = {institution_id: parseInt(entity),card_id: parseInt(card), user_id: user.id};
           saveCreditCard(newCreditCard);

        }
    }

    const saveCreditCard = async(newCreditCard) => {
        try {
            let res = await fetch(url1, {
                method: 'post',
                mode: 'cors',
                headers: {
                    "content-type": "application/json",
                    "Authorization": auth
                },
                body: JSON.stringify(newCreditCard)
            });
            let data = await res.json();
            if(!res.ok){
                const {message} = data;
                throw Error(` ${message}`);
            }
            setViewAdd(false);
            getCreditCards(url);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err,
                showCancelButton:false,
                showConfirmButton: false,
                timer: 3000
            });
        }
    }

    const goHome = () => {
        history.push('');
    }

    const goCancell = () => {
        setViewAdd(false);
        setCard(null);
        setEntity(null);
    }

    return (
        <div>
            <Container fluid className="principal">
                <section className="principal">
                <h2 className="section-title">Mis Tarjetas <i className="fas fa-credit-card"></i></h2>
                <Container>
                    <article className="base-principal py-2 text-center">
                        <Container className="px-2 py-2">
                        <Row>    
                            <Col lg={6}>
                            {creditCars.length > 0 &&    
                            <Table striped bordered hover variant="dark">
                              <thead>
                                <tr>
                                  <th>Mis Tarjetas</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {creditCars.map((cc) => <ListCreditCards cc={cc} />)}
                              </tbody>
                            </Table>
                            }
                            {creditCars.length === 0 && <h5 className="text-danger">No tienes Tarjetas</h5>}
                            <Button variant="secondary" onClick={addCCards}>
                            <i className="fas fa-plus-circle"></i> Agregar Tarjeta
                            </Button>
                            </Col>
                            <Col lg={6}>    
                                {viewAdd &&
                                    <Form onSubmit={handleSubmit}>
                                        <h5>AGREGAR TARJETA</h5>
                                        <Row className="g-2">
                                        <Col md>
                                        <FloatingLabel controlId="fselect1" label="Elige Tarjeta">    
                                        <Form.Select onChange={handleCChange}>
                                            <option value={0}>Elige Tarjeta...</option>
                                            {cards.map((card) => <option value={card.id}>{card.name}</option>)}
                                        </Form.Select>
                                        </FloatingLabel>
                                        </Col>
                                        <Col md>
                                        <FloatingLabel controlId="fselect2" label="Elige Entidad" >    
                                        <Form.Select onChange={handleEChange}>
                                            <option value={0}>Elije Entidad...</option>
                                            {entities.map((en) => <option value={en.id}>{en.name}</option>)}
                                        </Form.Select>
                                        </FloatingLabel>
                                        </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                                <Col>
                                                 <Button variant="success" type="submit">
                                                   <i className="far fa-save"></i> Guardar Tarjeta
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

export default MyCreditCards
