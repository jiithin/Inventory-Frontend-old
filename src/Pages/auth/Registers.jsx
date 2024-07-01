import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';

import FadeIn from 'react-fade-in';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { useDispatch } from 'react-redux';



const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

function Registers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return alert("All fields are required");
    }
    if (password.length < 6) {
      return alert("Passwords must be atleast 6 characters");
    }
    if (!validateEmail(email)) {
      return alert("Please enter a valid email");
    }
    if (password !== password2) {
      return alert("Passwords do not match");
    }

    const userData = {name,email,password};
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      sessionStorage.setItem("name",data.name)
      navigate("/products");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

  };
  return (
    <>
     
     <div className='d-flex align-items-center mt-5'>
      <div className='w-75 container mt-4'>
      
        <div className="d-flex justify-content-center align-items-center">

        
          
        <FadeIn>
       <div className='d-flex justify-content-center align-items-center' >
       <div className='mb-3'>
       <Link to={'/'}><img src="https://res.cloudinary.com/dc13zibyc/image/upload/v1719710607/hpi6y4dukwyalabnyw1k.png" 
              width="55"
              height="55"
              className="d-inline-block align-top"
              alt="shelf logo" /> 
        </Link>
           </div>
        <h2>Sign Up</h2>
         </div>

       <div className='text-muted d-flex justify-content-center mb-2' >
         <p>Create your account, it takes less than a minute.</p>
          </div>
         <Form onSubmit={register}>
         <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Full Name" name="name" value={name} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleInputChange} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Create Password" name="password" value={password} onChange={handleInputChange} />
      </Form.Group>
       


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3 success" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I accept Terms and Conditions" />
      </Form.Group>
      <button className='btn btn-success mb-2' style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>
        Sign Up
      </button>
      <div className='mt-2'>
      <p className='text-muted'>Already have an account ? CLick here to <Link to={'/login'} className='link-success' style={{textDecoration:'none'}}>Login.</Link></p>
      </div>
      
    </Form>
    </FadeIn>
     </div>
        </div>
           </div>
             
                  
    </>
  )
}

export default Registers