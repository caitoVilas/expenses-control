import Button from '@restart/ui/esm/Button';
import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext'

const MyData = () => {

    const {user} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() =>{
        window.scroll(0,600);
      },[]);

    const goHome = () => {
        history.push('/');
    }

    return (
        <div>
            <Container fluid className="principal">
                <section className="principal">
                <h2 className="section-title">MIS DATOS <i className="fas fa-users"></i></h2>
                <Container>
                    <article className="base-principal py-2 text-center">
                       <h5 className="text-secondary">Nombre de Usuario :  <strong className="text-primary">{user.userName}</strong></h5>
                       <h5 className="text-secondary">ID de Usuario : <strong className="text-primary">{user.id}</strong></h5>
                       <h5 className="text-secondary">email : <strong className="text-primary">{user.email}</strong></h5>
                       <hr></hr>
                       <Button className="btn btn-outline-success" onClick={goHome}>
                       <i className="fas fa-home"></i> Inicio
                       </Button>
                    </article>
                </Container>
                </section>
            </Container>
            
        </div>
    )
}

export default MyData
