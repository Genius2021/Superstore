import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';
import { useEffect } from 'react';
import { getSingleProduct } from '../Redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import "./Product.css";



function SingleProduct(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [ qty, setQty] = useState(1);
  const aProduct = useSelector(state => state.getSingleProduct);
  const { loading, error, singleProduct } = aProduct;


    useEffect(() =>{
      dispatch(getSingleProduct(productId));
    }, [dispatch, productId])

    const addToCartHandler = () =>{
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
          {loading ? (<Loading />) : error ? (<Message variant="danger">{error}</Message>) :

            <div>
            <Link to="/" className="back_to_result">Go Back</Link>
            <div className="row top">
                <div className="box__1">
                    <img src={singleProduct.imageUrl} className="singleProductImage" alt={singleProduct.productName}></img>
                </div>
                <div className="box__2">
                    <ul>
                      <li><h1>{singleProduct.productName}</h1></li>
                      <li><Rating rating={singleProduct.rating} numReviews={singleProduct.numReviews}/></li>
                      <li className="price__container">Price: <span className="the__price">${singleProduct.price}</span></li>
                      <li>Description: <p>{singleProduct.description}</p></li>
                    </ul>
                </div>
                <div className="box__3">
                    <div className="card card-body">
                      <ul>
                        <li>
                          <div className="row lastbox">
                            <div>Price</div>
                            <div className="price">${singleProduct.price * qty}</div>
                          </div>
                        </li>
                        <li>
                          <div className="row lastbox">
                            <div>Status</div>
                            <div>{singleProduct.countInStock > 0 ? <span className="success">In Stock</span> : (<span className="danger">Unavailable</span>)}</div>
                          </div>
                        </li>
                        {
                          singleProduct.countInStock > 0 && (
                            <>
                              <li>
                                <div className="row lastbox">
                                  <div>Qty</div>
                                  <div>
                                    <select value ={qty} onChange={e => setQty(e.target.value)}>
                                      { 
                                        [...Array(singleProduct.countInStock).keys()].map(x =>{
                                          return <option key={x+1} value={x+1}>{x+1}</option>
                                        })
                                      }
                                    </select>
                                  </div>
                                </div>
                              </li>
                              <li>
                              <button onClick={addToCartHandler} className="addToCart__button">Add to Cart</button> 
                              </li>
                            </>
                            
                          )
                        }
                        
                      </ul>
                    </div>
                </div>
            </div>
        </div>}
        </div>
        
    )
}

export default SingleProduct
