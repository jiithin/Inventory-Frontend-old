import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/features/product/productSlice';
import { selectIsLoggedIn } from '../redux/features/auth/authSlice';

function Viewproduct() {
  useRedirectLoggedOutUser("/login");// reroute to login if loggedout
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="badge badge-sm " style={{backgroundColor:'#0acf97'}}>In Stock</span>;
    }
    return <span className="badge badge-sm " style={{backgroundColor:'#ff3333'}}>Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <>
    <FadeIn>
      <Card className='mt-5'>
      {product && (
        <div className="row">
          <div className="col-6">
            <h4 className="mt-5 ms-5">
            {product.name}
              <Link to={`/editproduct/${id}`}>
                <i className="fa-solid fa-pen text-muted  ms-3"></i>
              </Link>{" "}
            </h4>
            
            <h6 className="mb-1 ms-5">SKU : <span className='text-muted'>{product.sku}</span></h6>
            <small className="mb-1 ms-5">Added Date: <span className='text-muted'>{product.createdAt.toLocaleString("en-US").slice(0,10)}</span></small>
              
            <p className="font-16 ms-5">
              <i class="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
              <i class="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
              <i class="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
              <i class="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
              <i class="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
            </p>
            {product?.image ? (
            <img
              src={product.image.filePath}
              width={"100%"}
              className="d-flex rounded  mt-3 ms-4"
              alt={product.image.fileName}
            />
          ) : (
            <p className='text-center mt-5'>No image found !!</p>
          )}
          
            
            <small className="mb-1 ms-4">Last Updated: <span className='text-muted'>{product.updatedAt.toLocaleString("en-US").slice(0,10)}</span></small>
          </div>

          <div className="ps-lg-5 col-6">
            
              <div className="mt-5">
                <h4>
                  <span>{stockStatus(product.quantity)}</span>
                </h4>
                
              </div>

              <div className="mt-4">
                <h6 className="font-14">Retail Price:</h6>
                <h3> ${product.price}</h3>
              </div>

              <div className="mt-4">
                <div className="row">
                  <div className="col-md-4">
                    <h6 className="font-14">Available Stock:</h6>
                    <p className="text-sm lh-150">{product.quantity}</p>
                  </div>
                  
                  <div className="col-md-4">
                    <h6 className="font-14">Total Value:</h6>
                    <p className="text-sm lh-150">${product.price * product.quantity}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <h6 className='mb-4'>Category : <span className='text-muted'>{product.category}</span></h6>
                <h6 className="font-14">Description:</h6>
                <p>
                {product.description}
                </p>
              </div>
              
            

              
          </div>

        </div>
      )}

        {/* table */}
        <div className="table-responsive mt-4 p-4">
          <table className="table table-bordered table-centered mb-0">
            <thead className="table-light">
              <tr>
                <th>Outlets</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ASOS Ridley Outlet - NYC</td>
                <td>$439.58</td>
                <td>
                  <div className="progress-w-percent mb-0">
                    <span className="progress-value">478 </span>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "56%" }}
                        aria-valuenow="56"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>$1,89,547</td>
              </tr>
              <tr>
                <td>Marco Outlet - SRT</td>
                <td>$449.99</td>
                <td>
                  <div className="progress-w-percent mb-0">
                    <span className="progress-value">73 </span>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "16%" }}
                        aria-valuenow="16"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>$87,245</td>
              </tr>
              <tr>
                <td>Chairtest Outlet - HY</td>
                <td>$435.87</td>
                <td>
                  <div className="progress-w-percent mb-0">
                    <span className="progress-value">781 </span>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>$5,87,478</td>
              </tr>
              <tr>
                <td>Nworld Group - India</td>
                <td>$459.89</td>
                <td>
                  <div className="progress-w-percent mb-0">
                    <span className="progress-value">815 </span>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>$55,781</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      </FadeIn>
    </>
  );
}

export default Viewproduct