import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../Redux/actions/orderActions';
import CheckoutSteps from '../Components/CheckoutSteps'
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import { ORDER_CREATE_RESET } from '../Redux/constants/orderConstants';
import "./PlaceOrder.css";


function PlaceOrder(props) {
    const cart = useSelector(state => state.cart);
    const {shippingInformation, cartItems, ...rest} = cart;

    Object.keys(shippingInformation).length < 6 &&  props.history.push("/shipping");

    if(cartItems.length === 0 ){
        props.history.push("/");
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); //5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    
    const dispatch = useDispatch();

    const placeOrderHandler = (e) =>{
        e.preventDefault();
        dispatch(createOrder({...rest, shippingInformation, orderItems: cartItems}));
    };

    useEffect(() => {
        if(success){
            props.history.push(`/orderPayment/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order,props.history,success]);

    const capitalize = (string) =>{
        const allLowercase = string.toLowerCase();
        const firstLetterUpper = allLowercase[0].toUpperCase();
        const answer = allLowercase.replace(allLowercase[0], firstLetterUpper);
        return answer;
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="card__big">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>First Name:</strong> {capitalize(cart?.shippingInformation.firstName)}  <br />
                                    <strong>Last Name:</strong> { capitalize(cart?.shippingInformation.lastName) } <br />
                                    <strong>Address:</strong> {cart?.shippingInformation.address}, {cart?.shippingInformation.city}, {cart?.shippingInformation.postalCode}, {cart?.shippingInformation.country}.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <p>
                                    <strong>Method:</strong> {cart?.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => (
                                            <li key={item.productId}>
                                                <div className="row itemsflex">
                                                    <div>
                                                        <img src={item.imageUrl} alt={item.productName} className="small"></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.productId}`}>{item.productName}</Link>
                                                    </div>
                                                    <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                    <div className="card__small">
                      <ul>
                        <li className="liTitle">
                           <h2>Order Summary</h2>
                        </li>
                        <li>
                           <div className="row smallCard">
                               <div>Items:</div>
                               <div> ${cart.itemsPrice.toFixed(2)}</div>
                           </div>
                        </li>
                        <li>
                           <div className="row smallCard">
                               <div>Shipping:</div>
                               <div> ${cart.shippingPrice.toFixed(2)}</div>
                           </div>
                        </li>
                        <li>
                           <div className="row smallCard">
                               <div>Tax:</div>
                               <div> ${cart.taxPrice.toFixed(2)}</div>
                           </div>
                        </li>
                        <li>
                           <div className="row smallCard">
                               <div><strong>Order Total:</strong></div>
                               <div><strong> ${cart.totalPrice.toFixed(2)}</strong></div>
                           </div>
                        </li>
                            <button type="button" onClick={placeOrderHandler} className="placeOrder__button" disabled={cart.cartItems.length === 0 || loading}>Place Order</button>
                            {loading && <Loading></Loading>}
                            {error && <Message variant="danger">{error}</Message>}
                      </ul>
                    </div>
                </div>
        </div>
    )
}

export default PlaceOrder
