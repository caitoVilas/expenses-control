
import React, { useContext } from 'react'
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext'

const initialUser = {
  token: '',
  id: null,
  userName: '',
  email: '',
  roles: []
};

const MainMenu = () => {

  const {isLogged, user, handleIsLogged, handleUser} = useContext(AuthContext);

  const logout = () => {
    Swal.fire({
      icon: 'info',
      title: `Hasta pronto ${user.userName}!`,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 3000
    });
    handleIsLogged(false);
    handleUser(initialUser);
  }
    return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
      <Navbar.Brand href="#home"><i className="fas fa-money-check-alt"></i> Gestion Gastos</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home"><i className="fas fa-home"></i> Inicio</Nav.Link>
         {!isLogged && <Nav.Link href="#register"><i className="fas fa-user-plus"></i> Registrarse</Nav.Link>}
         {!isLogged && <Nav.Link href="#login"><i className="fas fa-sign-in-alt"></i> Ingresar</Nav.Link>}
         {isLogged &&  <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      <i className="fas fa-hand-holding-usd"></i> Gastos
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                        <i className="fas fa-receipt"></i> Asientos</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
         }
         {isLogged && <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      <i className="fas fa-money-check"></i> Tarjetas
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#institution">
                        <i className="fas fa-university"></i> Entidades</Dropdown.Item>
                          <Dropdown.Item href="#cards">
                          <i className="fab fa-cc-visa"></i> Tarjetas</Dropdown.Item>
                          <Dropdown.Item href="#my-credits-cads">
                          <i className="fas fa-credit-card"></i> Mis Tarjetas</Dropdown.Item>
                          <Dropdown.Item>
                          <i className="fas fa-file-contract"></i> Resumen Cuenta</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
         }
         {isLogged && <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      <i className="fas fa-user-circle"></i> {user.userName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                      <Dropdown.Item href="#myData">
                      <i className="fas fa-id-card-alt"></i> Mis datos </Dropdown.Item>
                        <Dropdown.Item className="bg-danger link-light" onClick={logout}>
                        <i className="fas fa-power-off"></i> Cerrar Session</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    }
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default MainMenu
