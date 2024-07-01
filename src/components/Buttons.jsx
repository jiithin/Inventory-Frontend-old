import React from 'react'

import Button from 'react-bootstrap/Button';

function Buttons() {
  return (
    <>
    <Button className="btn-primary" style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>Primary</Button>{' '}
      <Button className="btn-secondary" style={{boxShadow:'0px 5px 10px 1px rgba(108, 117, 125, 0.15)'}}>Secondary</Button>{' '}
      <Button className="btn-success" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Success</Button>{' '}
      <Button className="btn-warning" style={{boxShadow:'0px 5px 10px 1px rgba(255, 195, 90, 0.15)'}}>Warning</Button>{' '}
      <Button className='btn-danger' style={{boxShadow:'0px 5px 10px 1px rgba(250, 92, 124, 0.15)'}}>Danger</Button>{' '}
      <Button className="btn-info" style={{boxShadow:'0px 5px 10px 1px rgba(57, 175, 209, 0.15)'}}>Info</Button>{' '}
      <Button className="btn-light" style={{boxShadow:'0px 5px 10px 1px rgba(108, 117, 125, 0.15)'}} >Light</Button>{' '}
      <Button className="btn-dark" style={{boxShadow:'0px 5px 10px 1px rgba(49, 58, 70, 0.15)'}}>Dark</Button>{' '}
      <Button variant="link" >Link</Button>
    </>
  )
}

export default Buttons