import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import FadeIn from 'react-fade-in';

import Form from 'react-bootstrap/Form';

import { FiCodesandbox } from "react-icons/fi";
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createProduct, selectIsLoading } from '../redux/features/product/productSlice';




const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  description: "",
};

function Addproducts( ) {
  useRedirectLoggedOutUser("/login");// reroute to login if loggedout

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);


  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity , description } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/products");
  };



  return (
    <>
    <FadeIn>
    <div className="list-group mt-5 me-4">
  <Card className="list-group-item list-group-item-action flex-column align-items-start">
  <div className='row'>
        <div className='col-6'>
  <div className="addproduct ">
      <h4 className="mt-3 fw-bold" style={{color:'#0acf97'}}><FiCodesandbox className='me-3' /> ADD NEW PRODUCT</h4>
      <div className="section">

        <Form onSubmit={saveProduct}>

        <Form.Group>
      <Form.Label for="product image" className="form-label mt-4 text-muted">Product Image</Form.Label>
      <br />
      <small className="text-muted">Supported Formats: jpg, jpeg, png</small>
      <input type="file" className="form-control" onChange={(e)=>handleImageChange(e)}/>
    </Form.Group>
          
        <Form.Group>
      <Form.Label for="exampleInputEmail1" className="form-label mt-4 text-muted">Product Name</Form.Label>
      <Form.Control value={product?.name} onChange={handleInputChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="Product Name" name="name" />

      
    </Form.Group>

    <Form.Group>
      <Form.Label for="exampleInputEmail1" className="form-label mt-4 text-muted">Product Category</Form.Label>
      <Form.Control value={product?.category} onChange={handleInputChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="Product Category" name="category" />

      
    </Form.Group>

    <Form.Group>
      <Form.Label for="exampleInputEmail1" className="form-label mt-4 text-muted">Product Price</Form.Label>
      <Form.Control value={product?.price} onChange={handleInputChange} type="number" className="form-control" id="exampleInputEmail1" placeholder="Product Price" name="price" />

      
    </Form.Group>

    <Form.Group>
      <Form.Label for="exampleInputEmail1" className="form-label mt-4 text-muted">Product Quantity</Form.Label>
      <Form.Control value={product?.quantity} onChange={handleInputChange} type="number" className="form-control" id="exampleInputEmail1" placeholder="Product Quantity" name="quantity"/>
      
    </Form.Group>

    
          
            <Form.Group>
      <Form.Label for="exampleTextarea" className="form-label mt-4 text-muted" >Product Description</Form.Label>
      <Form.Control value={product?.description} onChange={handleInputChange} as="textarea" rows={7} 
      className="form-control" id="exampleInputEmail1" placeholder="Product Description" name="description"/>
           </Form.Group>
            <button type='submit' className="btn btn-success mt-3 me-3" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Add Product</button>
            <Link to='/products' className="btn btn-light mt-3" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Cancel</Link>
         
        </Form>

        </div>
        </div>

        

        </div>

          {/* image preview */}
        <div className='col-6 mt-5'>
        <Form.Label>
                    <input type="file" style={{display:'none'}} />
           {imagePreview !=null ? (<div className="image-preview"><img src={imagePreview} alt="product image" width={'100%'} className="d-flex rounded  mt-5" /></div>):(<div className="image-drfault-preview"><img src="https://www.svgrepo.com/show/503850/photo.svg" width={'100%'}  className="d-flex rounded  mt-5" alt="default preview" /></div>)}
        </Form.Label>


        </div>

        </div>

        
  </Card>
</div>
</FadeIn>
    </>
  )
}



export default Addproducts