import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStoreAlt } from 'react-icons/fa';

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: '#c71585' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="me-auto" style={{ fontSize: "25px", color: "white" }}>My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/product"} className="d-flex align-items-center" style={{ fontSize: "18px", color: "white" }}>
                <FaStoreAlt className="me-1" /> Product
              </Nav.Link>
              <Nav.Link as={Link} to={"/cart"} className="d-flex align-items-center" style={{ fontSize: "18px", color: "white" }}>
                <FaShoppingCart className="me-1" /> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;