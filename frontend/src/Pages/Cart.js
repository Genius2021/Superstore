import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Redux/actions/cartActions';
import Message from '../Components/Message';
import "./Cart.css";

function Cart(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    const signinData = useSelector(state => state.userSignin);
    const { userInfo } = signinData;

    const dispatch = useDispatch();
   
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) =>{
        //delete action
        dispatch(removeFromCart(id));
    };


const checkoutHandler = () =>{
        props.history.push("/signin?redirect=shipping");
    }

    return (
        <div className="row top">
            <div className="shopping__cart">
                <h1>Shopping Cart</h1>
                <Link to="/"><i className="fa fa-plus" aria-hidden="true"></i></Link>
                {cartItems.length === 0 ? <Message>
                    <span className="empty__cart">Boss! Your Cart is Empty. <Link to="/">Go Shopping</Link></span> 
                </Message> : (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.productId}>
                                    <div className="row itemsflex">
                                        <div>
                                            <img src={item.imageUrl} alt={item.productName} className="small"></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.productId}`}>{item.productName}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={e => dispatch(addToCart(item.productId, Number(e.target.value)))} >
                                            { 
                                                [...Array(item.countInStock).keys()].map(x =>{
                                                return <option key={x+1} value={x+1}>{x+1}</option>
                                                })
                                            }
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.productId)}>
                                                Delete <i className="fa fa-trash-o"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
            <div className="priceInfo">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2 className="h2 subtotal">
                                Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)} { cartItems.reduce((a,c) => a + c.qty, 0) === 1 ? "item" : "items"}) : <span className="subtotal__price">${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}</span>
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className={`checkout__button ${cartItems.length === 0 && "disabled__button"}`} disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Cart

