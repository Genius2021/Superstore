import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import "./Product.css";

const Product = ({product}) =>{
    return (
    <div key={ product._id } className="card product">
            <Link to={`/products/${ product._id }`}>
                <img className="medium" src={ product.imageUrl } alt={ product.productName } />
            </Link>
        <div className="card-body">
            <Link to={`/products/${ product._id }`}>
                <h2>{ product.productName }</h2>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews}/>
            <div className="price">${ product.price }</div>
        </div>
    </div>
    )
}


export default Product;