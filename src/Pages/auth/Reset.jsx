import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';

import FadeIn from 'react-fade-in';
import { Link, useParams } from 'react-router-dom';


import Card from 'react-bootstrap/Card';
import { resetPassword } from '../../services/authService';


const initialState = {
  password: "",
  password2: "",
};

function Reset() {

  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return alert("Passwords must be up to 6 characters");
    }
    if (password !== password2) {
      return alert("Passwords do not match");
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      alert(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>  
       <FadeIn>
       <div className="d-flex justify-content-center align-items-center mt-5">
        <Card className='d-flex justify-content-center align-items-center mt-5' border="success" style={{ width: '30rem', height:'25rem' }}>
        <div className='d-flex justify-content-center align-items-center mt-5 mb-1'>
        <div className='mb-3'>
      <Link to={'/'}><img src="https://res.cloudinary.com/dc13zibyc/image/upload/v1719757910/shelf_logog_b76hpu.png" 
              width="55"
              height="55"
              className="d-inline-block align-top"
              alt="shelf logo" /> 
        </Link>
          </div>
       <h2 className='link-success' > Reset Password</h2>
        </div>

      
        <Form onSubmit={reset}>

        <Form.Group className="mb-3" controlId="formBasicPassword"  style={{width:'300px'}}>
       <Form.Label>New Password</Form.Label>
       <Form.Control name='password' type="password" placeholder="Enter New Password" value={password} onChange={handleInputChange}/>
     </Form.Group>
  

     <Form.Group className="mb-3" controlId="formBasicPassword"  style={{width:'300px'}}>
       <Form.Label>Confirm Password</Form.Label>
       <Form.Control name='password2' type="password" placeholder="Re-Enter New Password" value={password2} onChange={handleInputChange}/>
     </Form.Group>
    
     <button type='submit' className='btn btn-success mb-2' style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>
       Reset Password
     </button>
     <div className='mt-2 mb-5'>
     <p className='text-muted'>Back to <Link to={'/login'} className='link-success' style={{textDecoration:'none'}}>Login.</Link></p>
     </div>
    
     
   </Form>
      </Card>
    </div>
      </FadeIn>
   
            
                 
   </>
  )
}

export default Reset