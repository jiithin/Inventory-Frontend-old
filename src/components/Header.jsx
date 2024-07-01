import React from 'react'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <>
     <Navbar expand="lg" className="bg-body-primary" style={{position:'sticky', top: 0, backdropFilter:'blur(30px)'}}>
      <Container fluid>
        {/* <img src="https://i.imgur.com/hDh68ph.jpg" 
              width="25"
              height="25"
              className="d-inline-block align-top ms-5"
              alt="shelf logo" /> */}
        <Navbar.Brand href="/" className='fw-bold ms-5' style={{color:'#6732aa'}}>
        <img src="https://res.cloudinary.com/dc13zibyc/image/upload/v1719710607/hpi6y4dukwyalabnyw1k.png" alt="upgrade icon" width={'40px'}/> SHELF</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          {/* <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav> */}
         
            {/* <Button variant="success">Log Out</Button> */}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header