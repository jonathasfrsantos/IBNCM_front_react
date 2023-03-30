import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./styles.css";

export function NavBar() {

    return (
        <Navbar className="nav-container" bg="primary" variant="dark"  expand="lg" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#">Link</Nav.Link>
              <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Dízimos</NavDropdown.Item>
                <NavDropdown.Item href="#"> Saídas </NavDropdown.Item>
                <NavDropdown.Item href="#">Movimento financeiro</NavDropdown.Item>
                <NavDropdown.Item href="#"> Outras Entradas </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

}
