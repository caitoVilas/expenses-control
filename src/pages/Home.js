import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';


import cuentas from '../assets/images/cuentas.jpg';
import tarjetas from '../assets/images/tarjetas.jpg';

const Home = () => {

  useEffect(() =>{
    window.scroll(0,0);
  },[]);
  
    return (
      <div>
       
        <main className="container-fluid principal">
          <section className="container  py-2">
            <Row>
              <Col md={6} >
                <Card className="text-center" bg="secondary" text="white">
                    <Card.Img variant="top" src={cuentas} className="image-card" />
                    <Card.Body>
                        <Card.Title>Gestiona tus Gastos</Card.Title>
                        <Card.Text>lleva el control de tus gastos diarios, ingresos, egresos y mejora el manejo de tu economia hogareña</Card.Text>
                    </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
              <Card className="text-center" bg="secondary" text="white">
                    <Card.Img variant="top" src={tarjetas} className="image-card" />
                    <Card.Body>
                        <Card.Title>Gestiona tus Tarjetas</Card.Title>
                        <Card.Text>Crea cuentas con tus tarjetas y gestiona los gastos, obten resumenes de cuentas mensuales por tarjeta</Card.Text>
                    </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </main>
      </div>
    );
}

export default Home
