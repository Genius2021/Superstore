import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./CheckoutSteps.css";


function CheckoutSteps(props) {

    const cart = useSelector(state => state.cart);
    const { shippingInformation, paymentMethod } = cart;
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? "active" : ""}><span className={ props.step1 && "active"} >Sign-In <i className="fa fa-check"></i></span></div>
            <div className={props.step2 ? "active" : ""}><span className={ props.step2 ? "active" : "graded-out"} to="/shipping">Shipping </span>{ Object.keys(shippingInformation).length !== 0 && <i className="fa fa-check"></i> }</div>
            <div className={props.step3 ? "active" : ""}><span className={ props.step3 ? "active" : "graded-out"} to="/paymentMethod">Payment </span>{ paymentMethod !== "" && <i className="fa fa-check"></i> }</div>
            <div className={props.step4 ? "active": ""}><span className={ props.step4 ? "active" : "graded-out" } to="/placeOrder">Place Order </span></div>
        </div>
            );
}

export default CheckoutSteps
