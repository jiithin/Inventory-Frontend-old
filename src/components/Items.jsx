import React, { useEffect } from 'react'

import Pagination from '../components/Pagination'
import FadeIn from 'react-fade-in';


import { FiGrid } from "react-icons/fi";
import { FiLayers } from "react-icons/fi";
import { Link } from 'react-router-dom';


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';

import { deleteProduct, getProducts } from '../redux/features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/auth/authSlice';
import { FILTER_PRODUCTS, selectFilteredPoducts } from '../redux/features/product/filterSlice';


import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from '../redux/features/product/productSlice';

import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Items() {

  useRedirectLoggedOutUser("/login");// reroute to login if loggedout
  const filteredProducts = useSelector(selectFilteredPoducts);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
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


  //for search
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  //top 4 info boxes
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);


  //Delete a product
  const delProduct = async (id) => {
    // console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };
 
  //delete product alert
  const confirmDelete = (id,name) => {
    confirmAlert({
      
      title: <h5>Confirm delete.</h5>,
      message: <p>Do you want to delete <span className='fw-bolder'>{name.toUpperCase()}</span> ?</p>,
      buttons: [
        {
          label: "Delete",
          style: { backgroundColor: '#fe4d53', color: 'white' },
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          style: { backgroundColor: '#e6e6e6', color: '#666666' },
          // onClick: () => alert('Click No')
        },
      ],
    });
  };


  return (
    <>
    <FadeIn>
    <div>

        {/* inventory stats cards */}
        <h2 className='mt-5 ms-3 fw-bold ' style={{color:'#6b76ef'}}><FiGrid className='me-3'/>INVENTORY STATUS</h2>
        <ul className="nav nav-tabs p-3 mt-2 justify-content-between" role="tablist">
                <li className="nav-item" role="presentation" >
                <div className="card border-primary ms-3 mb-3 p-2" style={{width:'14rem'}} >
                <p className="card-text" style={{fontSize:'20px'}}>Total Products</p>
                <h4 className="card-title"><i class="fa-solid fa-layer-group" style={{color: "#6b76ef"}}></i> {products.length}</h4>
                </div>
                 </li>


                 <li className="nav-item ms-3 " role="presentation" >
                <div className="card border-success mb-3 p-2 " style={{width:'14rem'}}>
                <p className="card-text" style={{fontSize:'20px'}}>Total Store Value</p>
                <h4 className="card-title"><i class="fa-solid fa-dollar-sign" style={{color: "#0da054"}}></i> {formatNumbers(totalStoreValue.toFixed(2))}</h4>
                </div>
                 </li>


                 <li className="nav-item ms-3" role="presentation">
                <div className="card border-danger mb-3 p-2" style={{width:'14rem'}}>
                <p className="card-text" style={{fontSize:'20px'}}>Out of Stock</p>
                <h4 className="card-title"><i class="fa-solid fa-chart-pie" style={{color: "#dd274b"}}></i> {outOfStock}</h4>
                </div>
                 </li>


                 <li className="nav-item ms-3" role="presentation">
                <div className="card border-info mb-3 p-2" style={{width:'14rem'}}>
                <p className="card-text" style={{fontSize:'20px'}}>All Categories</p>
                <h4 className="card-title"><i class="fa-solid fa-square-poll-horizontal" style={{color:'#2268c3'}}></i> {category.length}</h4>
                </div>
                 </li>

                </ul>



      <h4 className='p-3 ms-2 fw-bold text-body-secondary'><FiLayers className='me-2'/> INVENTORY ITEMS</h4>

      {/* search by name */}
      <div className="input-group mb-3">
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="form-control w-50 ms-5 " placeholder="Search items by name..." aria-label=""/>
      <span className="input-group-text me-5"><i class="fa-solid fa-magnifying-glass"></i></span>
      
    </div> 
    
    {/*item table */}
    <div className="table-responsive">
    {!isLoading && products.length === 0 ? (
            <p className='text-primary'> No product found, please add a product...</p>
          ) : (
      <table className="table table-hover mt-3">
  <thead>
    <tr>
      <th scope="col" className='fw-bold d-flex'>S/N</th>
      <th scope="col" className='fw-bold'>Name </th>
      <th scope="col" className='fw-bold'>Category </th>
      <th scope="col" className='fw-bold'>Price </th>
      <th scope="col" className='fw-bold'>Quantity </th>
      <th scope="col" className='fw-bold'>Value </th>
      <th scope="col" className='fw-bold'>Action </th>
    </tr>
  </thead>
  <tbody>
  {filteredProducts.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                return(
  <tr className="table-secondary" key={_id}>
    
      <th scope="row">{index + 1}</th>
      <td>{shortenText(name, 16)}</td>
      <td>{category}</td>
      <td>{"$"}{price} </td>
      <td>{quantity} </td>
      <td>{"$"}{price * quantity}</td>
      <td>
        <Link to={`/viewproduct/${_id}`}><i class="fa-solid fa-expand me-4" style={{color:'#5c5c5c'}}></i></Link> 
        <Link to={`/editproduct/${_id}`}><i class="fa-solid fa-file-pen  me-3" style={{color:'#5c5c5c'}}></i></Link>  
        <Link onClick={()=>confirmDelete(_id,name)}><i class="fa-solid fa-trash " style={{color:'#5c5c5c'}}></i></Link>
      </td>
    </tr>
    
    
      );
    })}
  </tbody>
</table>)}

</div>

   <div className='d-flex justify-content-center'>
   <Pagination/>
   </div>
   
    </div>

    </FadeIn>


      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Do you want to delete this product ?</Modal.Title>
        </Modal.Header >
        <Modal.Body>
         <Button variant="danger" className='me-3' onClick={handleClose}>
            Delete
          </Button>
          <Button variant="secondary"  onClick={handleClose}>
            cancel
          </Button>
        </Modal.Body>
        
      </Modal> */}


      {/* <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <h5 className='fw-bolder mt-2'>Delete Product?</h5>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {} from inventory ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>delProduct(_id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}

    </>
    
  )
}

export default Items