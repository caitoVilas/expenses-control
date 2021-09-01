
import React from 'react';
import java from '../assets/images/icoJava.png';
import spring from '../assets/images/spring.png';
import reactImg from '../assets/images/logo.svg';
import mysql from '../assets/images/mysql.png';

const Footer = () => {
    return (
        <footer>
            <div className="container-footer text-center py-2">
                <h3>Developer : Caito Vilas</h3>
                <h4>&copy; 2021</h4>
                <br></br>
                <h2>Sistema de gestion Control Gastos</h2>
                <hr></hr>
                <p>Tecnologias</p>
                <img src={java} alt="java" className="img-footer" />
                <img src={spring} alt="spring Boot" className="img-footer" />
                <img src={reactImg} alt="react" className="img-footer" />
                <img src={mysql} alt="my sql" className="img-footer" />
                <hr />
                <p>Contacto</p>
                <a href="https://www.linkedin.com/in/caito-vilas-4179291b2/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin ref-footer"></i></a>
                <a href="https://github.com/caitoVilas" target="_blank" rel="noreferrer"><i className="fab fa-github ref-footer"></i></a>
            </div>
            
        </footer>
    )
}

export default Footer
