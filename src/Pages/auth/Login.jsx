import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';

import FadeIn from 'react-fade-in';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";



const initialState = {
  email: "",
  password: ""
};


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("All fields are required");
    }

    if (!validateEmail(email)) {
      return alert("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      //console.log(data);
      await dispatch(SET_LOGIN(true));
      //await dispatch(SET_NAME(data.name));
      //sessionStorage.setItem("name",data.name)
      sessionStorage.setItem("token",data.token)
      navigate("/products");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
    
    <div className='d-flex align-items-center mt-4' >
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
           <h2>Sign In</h2>
         </div>

       <div className='text-muted d-flex justify-content-center mb-2' >
         <p>Enter your credentials to access admin panel.</p>
          </div>
         <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleInputChange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
        <Form.Text className="text-muted">
          Forgot password ? <Link to={'/forgot'} style={{textDecoration:'none'}}>Click Here.</Link>
        </Form.Text>
      </Form.Group>
      <button type='submit' className='btn btn-primary mb-2' style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>
        Log In
      </button>
      <div className='mt-2'>
      <p className='text-muted'>Don't have an account ? CLick here to <Link to={'/register'} style={{textDecoration:'none'}}>Register.</Link></p>
      </div>
    </Form>
    </FadeIn>
     </div>
        </div>
        
           </div>
             
                  
    </>
  )
}


export default Login