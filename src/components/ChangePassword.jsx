import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { changePassword } from '../services/authService';
import FadeIn from 'react-fade-in/lib/FadeIn';


const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
  };

function ChangePassword() {
    const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return alert("New passwords do not match");
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    alert(data);
    navigate("/profile");
  };

    
  return (
    <div className="list-group mt-5 me-4">
        <FadeIn>
      <Card className="list-group-item list-group-item-action flex-column align-items-start border rounded">
    <div className='row'>
        <div className='col-lg-8 col-sm-12 mb-5'>
        <div className="contact">
      <h3 className="mt-3 fw-bold " style={{color:'#6b76ef'}}><RiLockPasswordFill   className='me-3' />  Change Password</h3>
      <p className='text-muted'>Read Instructions before changing the password.</p>
      <div className="section">
        <form onSubmit={changePass} >
          
        <div>
      <label for="oldpassword" className="form-label mt-3 text-muted">Old Password</label>
      <input type="password" className="form-control w-50" id="oldpassword" aria-describedby="emailHelp" placeholder="Enter Old Password" name="oldPassword" value={oldPassword} onChange={handleInputChange} />
      
    </div>

    <div>
      <label for="newpassword" className="form-label mt-3 text-muted">New Password</label>
      <input type="password" className="form-control w-50" id="password" aria-describedby="emailHelp" placeholder="Enter New Password" name="password"  value={password} onChange={handleInputChange}/>
      
    </div>

    <div>
      <label for="confirmnewpassword" className="form-label mt-3 text-muted">Confirm New Password</label>
      <input type="password" name="password2" className="form-control w-50" id="password2" aria-describedby="emailHelp" placeholder="Re-Enter New Password" value={password2} onChange={handleInputChange} />
      
    </div>
          
            <button type='submit' className="btn btn-primary mt-3 me-3" style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>Change Password</button>
            <Link to='/profile' className="btn btn-light mt-3" style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>Cancel</Link>
         
        </form>

        </div>
        </div>
        </div>



        <div className='col-lg-4 col-sm-12'>
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active h-100 " style={{borderRadius:'10px'}}>

        <div className='d-flex align-items-center justify-content-center'>
        <img src="https://res.cloudinary.com/dc13zibyc/image/upload/v1719757910/shelf_logog_b76hpu.png" alt="upgrade icon" width={'80px'}/>
        </div>
   
    <h3 className="mb-3 mt-2 text-center">Instructions</h3>
    
                  <div className='text-center mt-2 '>
                    <p>1.Make it at least 8 characters long.</p>
                    <p>2.Include a mix of uppercase and lowercase letters, numbers, and special characters.</p>
                    <p>3.Avoid using easily guessable information like your name or birthdate.</p>
                    <Link to={"/changepassword"} className='btn btn-success w-100'>More about Strong Password</Link>
                  </div>
               </a>
        </div>
    </div>
    
  </Card>
  </FadeIn>
    </div>
  )
}

export default ChangePassword