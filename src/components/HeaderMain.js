import React from 'react';
import Wave from './Wave';


const HeaderMain = () => {
    return (
        <header className="hero">
            <div className="container">
                <section className="hero-text">
                  <h1>Control de Gastos</h1>
                  <h2>Construyendo ideas <i className="far fa-smile"></i></h2>
                </section>
            </div>
        <Wave />
        </header>
    )
}

export default HeaderMain
