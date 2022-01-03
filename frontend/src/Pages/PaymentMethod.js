import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../Redux/actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';
import "./PaymentMethod.css";

function PaymentMethod(props) {
    const cart = useSelector(state => state.cart);
    const {shippingInformation} = cart;

    useEffect(() => {
            //Note: It is 6 because I am expecting 6 keys for shipping i.e firstName, lastName, city, country, address, postalCode.
        Object.keys(shippingInformation).length < 6 &&  props.history.push("/shipping");

    }, [props.history, shippingInformation])
   
    const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);
    const dispatch = useDispatch();

    // cart.paymentMethod = paymentMethod;
    
    const submitHandler = (e) =>{
            e.preventDefault();
        if(paymentMethod === ""){
            alert("Choose a payment method to proceed.");
        }else{
            dispatch(savePaymentMethod(paymentMethod));
            props.history.push("/placeOrder");
        }
    }

    // useEffect(() => {
        
    // }, [input])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form className="paymentMethod" onSubmit={submitHandler}>
                <div>
                    <h1>Choose Payment Method</h1>
                </div>
                <div className="payment__container">
                    <input type="radio" id="paypal" value="PayPal" name="paymentMethod" checked={ paymentMethod === "PayPal" } onClick={e => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div className="payment__container">
                    <input type="radio" id="stripe" value="Stripe" name="paymentMethod" checked={ paymentMethod === "Stripe" } onClick={e => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                  <button className="paymentMethod__button" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethod
