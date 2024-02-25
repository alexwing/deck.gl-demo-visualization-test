import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MenuTop = ({ name, onSelectMap }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">{name}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Map Mode" id="basic-nav-dropdown">
            <NavDropdown.Item id="Population" href="#Population" onClick={onSelectMap} >Population</NavDropdown.Item>
            <NavDropdown.Item id="GsonLayer" href="#GsonLayer" onClick={onSelectMap}>GsonLayer</NavDropdown.Item>      
          </NavDropdown>          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuTop;