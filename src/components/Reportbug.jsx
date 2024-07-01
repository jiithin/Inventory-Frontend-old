import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import FadeIn from 'react-fade-in';

import { FiAlertOctagon } from "react-icons/fi";
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import axios from 'axios';
import { SERVER_URL } from '../services/server_url';
import { Link } from 'react-router-dom';


function Reportbug() {
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
    
  <div className="reportbug">
      <h3 className="mt-3 fw-bold" style={{color:'#fa5c7c'}}><FiAlertOctagon className='me-3' /> Report Bug</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          
        <div>
      <label for="exampleInputEmail1" className="form-label mt-2 text-muted">Issue</label>
      <input type="text" name='about' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="About" value={subject} onChange={(e) => setSubject(e.target.value)}/>
      
    </div>

    <div>
      <label for="screenshot" className="form-label mt-3 text-muted">Share Screenshots</label>
      <input type="file" className="form-control" />
      
    </div>
          
            <div>
      <label for="exampleTextarea" className="form-label mt-3 text-muted" >Details</label>
      <textarea name='message' class="form-control" id="exampleTextarea" rows="7" placeholder="Description..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
    </div>
            <button className="btn btn-danger mt-3 me-3" style={{boxShadow:'0px 5px 10px 1px rgba(250, 92, 124, 0.15)'}}>Submit Report</button>
            <Link to='/products' className="btn btn-light mt-3" style={{boxShadow:'0px 5px 10px 1px rgba(250, 92, 124, 0.15)'}}>Cancel</Link>
         
        </form>

        </div>
        </div>
        
  </Card>
</div>
</FadeIn>
    </>
  )
}

export default Reportbug