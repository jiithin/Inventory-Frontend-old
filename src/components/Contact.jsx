import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import FadeIn from 'react-fade-in';


import { FiMessageSquare } from "react-icons/fi";
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { SERVER_URL } from '../services/server_url';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Contact() {
  useRedirectLoggedOutUser("/login");// reroute to login if loggedout
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
    <FadeIn>
    <div className="list-group mt-5 me-4">
  <Card className="list-group-item list-group-item-action flex-column align-items-start">
    <div className='row'>
        <div className='col-8'>
        <div className="contact">
      <h3 className="mt-3 fw-bold" style={{color:'#6b76ef'}}><FiMessageSquare className='me-3' />  Contact Us</h3>
      <p className='text-muted'>Fill the form or contact us via channels listed.</p>
      <div className="section">
        <form onSubmit={sendEmail}>
          
        <div>
      <label for="exampleInputEmail1" className="form-label mt-3 text-muted">Subject</label>
      <input type="text" name="subject" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
      
    </div>
          
            <div>
      <label for="exampleTextarea" className="form-label mt-4 text-muted" >Message</label>
      <textarea name='message' class="form-control" id="exampleTextarea" rows="7" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
    </div>
            <button type='submit' className="btn btn-primary mt-3 me-3" style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>Send Message</button>
            <Link to='/products' className="btn btn-light mt-3" style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}>Cancel</Link>
         
        </form>

        </div>
        </div>
        </div>







        <div className='col-4'>
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active h-100 " style={{borderRadius:'10px'}}>
   
    <h4 className="mb-3 mt-2 ">Contact Information</h4>
    
        <div className="text-start">
                      <p className="text-white"><i class="fa-solid fa-phone" style={{color: '#ffffff'}}></i> <span className="ms-2">(+007) 22 55</span></p>
                      <p className="text-white"><i class="fa-solid fa-envelope" style={{color: '#ffffff'}}></i> <span className="ms-2">shelfmanager@gmail.com</span></p>
                      <p className="text-white"><i class="fa-solid fa-location-dot" style={{color: '#ffffff'}}></i> <span className="ms-2">Barcelona , Spain</span></p>
                      <p className="text-white"><i class="fa-brands fa-x-twitter" style={{color: '#ffffff'}}></i>
                          <span class="ms-2"> @shelfInventory </span>
                      </p>
                  </div>
                  <div className='text-center mt-5 '>
                    <img src="https://coderthemes.com/hyper_2/modern/assets/images/svg/help-icon.svg" alt="upgrade icon" width={'90px'}/>
                    <h5>Unlimited Access</h5>
                    <p>Upgrade to plan to get access to unlimited listings</p>
                    <button className='btn btn-success'>Upgrade <i class="fa-regular fa-circle-up" style={{color: '#ffffff'}}></i></button>
                  </div>
               </a>
        </div>
    </div>
    
  </Card>
</div>
</FadeIn>
    </>
  )
}

export default Contact