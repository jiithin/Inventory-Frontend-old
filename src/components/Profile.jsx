import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in';
import { Card } from 'react-bootstrap';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { SET_NAME, SET_USER, selectIsLoggedIn } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/authService';
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, getProducts, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../redux/features/product/productSlice';

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Profile() {
  useRedirectLoggedOutUser("/login");// reroute to login if loggedout
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // console.log("Getting use");
    async function getUserData() {
      const data = await getUser();
      // console.log(data);

      setProfile(data);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  //inventory details
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
      
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch ]);
    //top 4 info boxes
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock);
    const category = useSelector(selectCategory);
  
    useEffect(() => {
      dispatch(CALC_STORE_VALUE(products));
      dispatch(CALC_OUTOFSTOCK(products));
      dispatch(CALC_CATEGORY(products));
    }, [dispatch, products]);

  return (
    <>
    <FadeIn>
    <div className="list-group mt-5 me-4">
      {profile===null?(<p className='text-center p-5'>Loading please wait...</p>):(
        <div className="card">
  <Card className="list-group-item list-group-item-action flex-column align-items-start active">
    <div className="d-flex w-100 justify-content-between ">
    <img src={profile?.photo}
                                width="150"
                                height="150"
                                className="d-flex rounded shadow-sm mt-2 "
                                alt={profile?.name} />

             <Link to={'/editprofile'} className="text-white" ><i class="fa-solid fa-pen"></i></Link>
      
    </div>
    <h4 className="mb-4 mt-2 fw-bold">{profile?.name.toUpperCase()}</h4>
    
    <div className='row'>
        <div className='col-lg-2 col-sm-1 text-center'>
        <h6 className="mb-1 fw-bold ">$ {`${formatNumbers(totalStoreValue.toFixed(2))}  `}</h6>
         <small className='text-body-white'>Inventory Value</small>
        </div>

        <div className='col-lg-2 col-sm-1 text-center'>
        <h6 className="mb-1 fw-bold ">{products.length}</h6>
         <small className='text-body-white text-center'>Total Products</small>
        </div>

        <div className='col-lg-2 col-sm-1 text-center'>
        <h6 className="mb-1 fw-bold">{outOfStock}</h6>
         <small className='text-body-white'>Out Of Stock</small>
        </div>

        <div className='col-lg-4 col-sm-1'>
        </div>

        <div className='col-lg-2 col-sm-1 text-center'>
        <Link to={"/changepassword"} className="btn btn-success" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Edit Password</Link>
        </div>
    
    </div>
    
  </Card>

  
  <Card className="list-group-item list-group-item-action flex-column align-items-start">
  
                                
                  <h4 class="header-title mt-0 mb-3 text-muted fw-bold">Seller Information</h4>
                  <p class="text-muted font-13">
                      {profile?.bio}
                  </p>

                  <div class="text-start">
                      <p class="text-muted"><strong>Full Name :</strong> <span class="ms-2">{profile?.name}</span></p>
                      <p class="text-muted"><strong>Phone :</strong><span class="ms-2">{profile?.phone}</span></p>
                      <p class="text-muted"><strong>Email :</strong> <span class="ms-2">{profile?.email}</span></p>
                      <p class="text-muted"><strong>Location :</strong> <span class="ms-2">{profile?.location}</span></p>
                      <p class="text-muted"><strong>Languages :</strong>
                          <span class="ms-2">{profile?.languages} </span>
                      </p>

                  </div>
                                                      
  </Card>
  </div>
  )}
</div>
</FadeIn>
    </>
  )
}

export default Profile