import React, {useContext, useEffect, useState} from 'react'
import { Col, Container, Row, Table, Button,Form, FloatingLabel } from 'react-bootstrap'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import ListCards from '../components/ListCards';
import AuthContext from '../context/AuthContext';
import { baseURL, cardsURL } from '../enviroment';

const Cards = () => {

    const [cards, setCards] = useState([]);
    const [card, setCard] = useState('');
    const [errors, setErrors] = useState(false);
    const [viewAdd, setViewAdd] = useState(false);
    const {user} = useContext(AuthContext);
    const url = baseURL + cardsURL;
    const auth = 'Bearer '+ user.token;

    const history = useHistory();

    useEffect(() =>{
        window.scroll(0,600);
        getCards(url);
      },[]);

      const getCards = async () => {
          console.log(url)
        try {
            let res = await fetch(url, {
              method: 'get',
              headers: {
                  "content-type": "application/json",
                  "Authorization": auth
              }
            });
            let json = await res.json();
            setCards(json);
          } catch (err) {
            console.log(err);
          }
      }

      const addCard = () => {
        setViewAdd(true);
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        if(card === ''){
          setErrors(true);
        }else{
          setErrors(false);
          const urlcard = baseURL+cardsURL;
          CreateCard(urlcard);
          setCard('');
        }
      }

      const CreateCard = async (urlcard) => {
        try {
          let res = await fetch(urlcard, {
            method: 'post',
            headers: {
                "content-type": "application/json",
                "Authorization": auth
            },
            body: JSON.stringify(card)
          });
          let json = await res.json();

          if(!res.ok){
            const {message} = json;
            throw Error(` ${message}`);
          }
          getCards(url);

        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: err,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 3000
          });
          
        }
      }

      const goHome = () => {
          history.push('/');
      }

      
     const goCancell = () => {
       setCard('');
       setErrors(false);
       setViewAdd(false);
     }

    return (
        <div>
            <Container fluid className="principal">
                <section className="principal">
                <h2 className="section-title">Tarjetas <i className="fas fa-credit-card"></i></h2>
                <Container>
                    <article className="base-principal py-2 text-center">
                        <Container className="px-2 py-2">
                        <Row>    
                            <Col lg={6}>
                            <Table striped bordered hover variant="dark">
                              <thead>
                                <tr>
                                  <th>Tarjeta</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                              {cards.map((card) => <ListCards card={card} />)}
                              </tbody>
                            </Table>
                            <Button variant="secondary" onClick={addCard}>
                            <i className="fas fa-plus-circle"></i> Agregar Tarjeta
                            </Button>
                            </Col>
                            <Col lg={6}>    
                            {viewAdd && 
                                 
                                 <Form onSubmit={handleSubmit}>
                                 <h5>AGREGAR TARJETA</h5>
                                 <FloatingLabel controlId="fuserName" label="Nombre Tarjeta">
                                              <Form.Control type="text" 
                                                            placeholder="Nombre Tarjeta" 
                                                            className="my-2"
                                                            value={card}
                                                            onChange={(e)=> setCard(e.target.value) }
                                                            />
                                              </FloatingLabel>
                                              {errors && <p className="error">
                                                            Nombre de Tarjeta requerida <i className="fas fa-exclamation-triangle"></i>
                                                         </p>}
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

export default Cards
