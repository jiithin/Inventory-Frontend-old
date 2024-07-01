import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import FadeIn from 'react-fade-in';

import Form from 'react-bootstrap/Form';

import { FiCodepen  } from "react-icons/fi";
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProduct, getProducts, selectProduct, updateProduct } from '../redux/features/product/productSlice';



function Editproduct() {
  useRedirectLoggedOutUser("/login");// reroute to login if loggedout
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productEdit = useSelector(selectProduct);
  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);


  
  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };


  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if(productImage){
    formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({id,formData}));
    await dispatch(getProducts())

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
      <h4 className="mt-3 fw-bold" style={{color:'#6b76ef'}}><FiCodepen  className='me-3' /> Edit Product Details</h4>
      <h5 className="mt-3 fw-bold text-success ms-5" style={{color:'#6b76ef'}}> {product?.name}</h5>
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
            <button type='submit' className="btn btn-primary mt-3 me-3" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Update Product</button>
            <Link to='/products' className="btn btn-light mt-3" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Cancel</Link>
         
        </Form>

        </div>
        </div>

        

        </div>

          {/* image preview */}
        <div className='col-6 ' style={{marginTop:'125px'}}>
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

export default Editproduct