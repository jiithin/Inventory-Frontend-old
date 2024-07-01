import React, { useState } from 'react'


import Form from 'react-bootstrap/Form';

import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';

import { forgotPassword, validateEmail } from '../../services/authService';

function Forgot() {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return alert("Please enter your email");
    }

    if (!validateEmail(email)) {
      return alert("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };
  return (
    <>
     
    <div className='d-flex align-items-center mt-5'>
     <div className='w-75 container mt-5'>
     
       <div className="d-flex justify-content-center align-items-center">

       
         
       <FadeIn>
      <div className='d-flex justify-content-center align-items-center mt-5 mb-1' >
      <div className='mb-3'>
      <Link to={'/'}><img src="https://res.cloudinary.com/dc13zibyc/image/upload/v1719710607/hpi6y4dukwyalabnyw1k.png" 
              width="55"
              height="55"
              className="d-inline-block align-top"
              alt="shelf logo" /> 
        </Link>
          </div>
       <h2>Reset Password</h2>
        </div>

      <div className='text-muted d-flex justify-content-center mb-2' >
        <p>We’ll send you instructions to reset your password.</p>
         </div>
        <Form onSubmit={forgot}>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Email address</Form.Label>
       <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
       
     </Form.Group>


     <button type="submit" className='btn btn-primary mb-2' style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>
       Get Reset Email
     </button>
     <div className='mt-2'>
     <p className='text-muted'>Back to <Link to={'/login'} style={{textDecoration:'none'}}>Login.</Link></p>
     </div>
     
   </Form>
   </FadeIn>
    </div>
       </div>
          </div>
            
                 
   </>
  )
}

export default Forgot