import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./styles.css";
import { Link } from 'react-router-dom';

export function NavBar() {

  return (
    <Navbar className="nav-container" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="home">
            <Link to="/"> Home </Link>
            <NavDropdown title="Relatórios" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tithesTable" target="_blank"> Dízimos </NavDropdown.Item>
              <NavDropdown.Item href="/expensesTable" target="_blank"> Saídas </NavDropdown.Item>
              <NavDropdown.Item href="/summaryTable" target="_blank">Movimento financeiro</NavDropdown.Item>
              <NavDropdown.Item href="/otherEntries" target="_blank"> Outras Entradas </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}
