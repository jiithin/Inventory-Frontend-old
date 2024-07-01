import React, { useEffect } from 'react'

import Header from '../../components/Header'
import { Button, Col, Row } from 'react-bootstrap'
import Sidebar from '../../components/Sidebar'
import Buttons from '../../components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import Items from '../../components/Items'
import Profile from '../../components/Profile'
import Contact from '../../components/Contact'
import Reportbug from '../../components/Reportbug'
import Addproducts from '../../components/Addproducts'
import Viewproduct from '../../components/Viewproduct'
import Editprofile from '../../components/Editprofile'
import Editproduct from '../../components/Editproduct'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN , selectName } from '../../redux/features/auth/authSlice'
import { logoutUser } from '../../services/authService'
import ChangePassword from '../../components/ChangePassword'






function Dashboard({products,profile,contact,reportbug,addproduct,viewproduct,editprofile,editproduct,changepassword}) {
  const isdashboard=products?true:false
  const isprofile =profile?true:false
  const iscontact=contact?true:false
  const isreportbug=reportbug?true:false
  const isaddproduct=addproduct?true:false
  const iseditprofile=editprofile?true:false
  const isviewproduct=viewproduct?true:false
  const iseditproduct=editproduct?true:false
  const ischangepassword=changepassword?true:false

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    sessionStorage.clear();
    navigate("/");

  };

  
  return (
    <>
    <div className='bg-body-tertiary'>
    <Header/>


              {/* welcome banner */}
               <ul className="nav nav-tabs p-3" role="tablist">
                <li className="nav-item ms-5" role="presentation">
                <h2>Welcome, <span className='text-success fw-bold'> {name.toUpperCase().replace(/\s.*/, '')}</span></h2>
                </li>
  
               <li className='ms-auto'>
               <button onClick={logout} className='btn btn-danger' style={{boxShadow:'0px 5px 10px 1px rgba(250, 92, 124, 0.15)'}}>Log Out</button>
               </li>
                </ul>




    <Row>
        {/* <h2 className='mt-4 mx-5'>Welcome <span className='text-success fw-bolder'>Alex</span></h2> */}

        {/* my projects */}
        <Col sm={12} md={4} lg={3} style={{border:'black', borderRadius:'5px'}}> 
        
          <Sidebar/>
        </Col>

        {/* profile */}
        <Col sm={12} md={8} lg={9} >
        

        {isdashboard&& <Items products={products}/>}
        {isprofile&& <Profile/>}
        {iscontact&& <Contact/>}
        {isreportbug&& <Reportbug/>}
        {isaddproduct&& <Addproducts/>}
        {isviewproduct&& <Viewproduct/>}
        {iseditprofile&& <Editprofile/>}
        {iseditproduct&& <Editproduct/>}
        {ischangepassword&& <ChangePassword/>}

        </Col>
      </Row>

     
      </div>
    </>
  )
}

export default Dashboard