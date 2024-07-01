import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in';



import { FiGrid } from "react-icons/fi";
import { FiCodesandbox } from "react-icons/fi";
import { FiAlertOctagon } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { getUser } from '../services/authService';

function Sidebar() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // console.log("Getting use");
        async function getUserData() {
          const data = await getUser();
          //console.log(data);
          setProfile(data);
        }
        getUserData();
      });

    return (
        <>
        <FadeIn>
            <div className='ms-3 mt-5'>

                <div className="list-group" >

                    <Link to={'/profile'} className="list-group-item list-group-item-action justify-content-center align-items-center  active" style={{height:'10rem'}}>
                        <div className="d-flex w-100 mt-4" >
                            <div className='align-items-center' >
                            <img src={profile?.photo}
                                width="65"
                                height="65"
                                className="d-flex rounded-circle shadow-sm mt-2 "
                                alt="shelf logo" />
                            </div>
                            
                               
                        <h4 className="leftbar-user-name mt-4 p-1 ms-4 fw-bold">{profile?.name.toUpperCase().replace(/\s.*/, '')}</h4>
                        
                        </div>
                        
                    </Link>


                    {/* <small className='text-muted'>Navigation</small> */}
                    <Link to={'/products'} className='list-group-item list-group-item-action p-4 align-items-between'>
                    <FiGrid className='me-3'/>  DashBoard
                        </Link>

                        {/* <Link to={'/addproduct'} className='list-group-item list-group-item-action'>
                        Products</Link> */}

                        <Link to={'/addproduct'} className='list-group-item list-group-item-action p-4'>
                        <FiCodesandbox className='me-3' /> Add Products</Link>

                        <Link to={'/profile'} className='list-group-item list-group-item-action p-4'>
                        <FiUser className='me-3' /> Profile</Link>

                        {/* <Link to={'/profile'} className='list-group-item list-group-item-action'>
                        Edit Profile
                        </Link> */}

                    <Link to={'/contact'} className='list-group-item list-group-item-action p-4'> <FiMessageSquare className='me-3' /> Contact Us</Link>

                    <Link to={'/reportbug'} className='list-group-item list-group-item-action p-4'><FiAlertOctagon className='me-3' /> Report Bug</Link>
                </div>
            </div>
            </FadeIn>
        </>
    )
}

export default Sidebar