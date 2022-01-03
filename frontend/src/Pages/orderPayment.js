import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, paymentOrder } from '../Redux/actions/orderActions';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import "./orderPayment.css";
import { ORDER_PAY_RESET } from '../Redux/constants/orderConstants';

function Order(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loadingPay, errorPay, successPay } = orderPay;

    const dispatch = useDispatch();
    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await axios.get("/api/payPlatform/PayPal/config");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }

        if (!order._id || successPay || (order && order._id !== orderId)) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch(detailsOrder(orderId));
        } else {
            if (!order._isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, orderId, order, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(paymentOrder(order, paymentResult));
    }

    return loading ? (<Loading></Loading>) :
        error ? (<Message variant="danger">{error}</Message>) : (
            <div>

                <h1>Order {order._id}</h1>
                <div className="row top">
                    <div className="card__big">
                        <ul>
                            <li>
                                <div className="card card-body">
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>First Name:</strong> {order.shippingInformation.firstName} <br />
                                        <strong>Last Name:</strong> {order.shippingInformation.lastName} <br />
                                        <strong>Address:</strong> {order.shippingInformation.address}, {order.shippingInformation.city}, {order.shippingInformation.postalCode},
                                         {order.shippingInformation.country}
                                    </p>
                                    {order.isDelivered ?
                                        (<Message variant="success">Delivered at {order.deliveredAt}</Message>)
                                        : (<Message variant="danger">Not Delivered</Message>)
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {order.paymentMethod} <br />
                                    </p>
                                    {order.isPaid ?
                                        (<Message variant="success"> Paid at {order.paidAt}</Message>)
                                        : (<Message variant="danger">Not Paid</Message>)
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h2>Order Items</h2>
                                    <ul>
                                        {
                                            order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row itemsflex">
                                                        <div>
                                                            <img src={item.imageUrl} alt={item.name} className="small"></img>
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
                    <div className="card__small paypal">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="row smallCard">
                                        <div>Items</div>
                                        <div>${order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row smallCard">
                                        <div>Shipping</div>
                                        <div>${order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row smallCard">
                                        <div>Tax</div>
                                        <div>${order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row smallCard">
                                        <div><strong>Order Total</strong></div>
                                        <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                    </div>
                                </li>
                                {
                                    !order.isPaid && (
                                        <li>
                                            {!sdkReady ?
                                                (<Loading></Loading>) : (
                                                    <>
                                                        {errorPay && <Message variant="danger">{errorPay}</Message>}
                                                        {loadingPay && <Loading></Loading>}
                                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                                    </>
                                                )}
                                        </li>

                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>)
}

export default Order
