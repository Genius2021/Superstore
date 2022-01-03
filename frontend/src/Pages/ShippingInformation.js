import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../Components/CheckoutSteps';
import { saveShippingInformation } from "../Redux/actions/cartActions";
import "./ShippingInformation.css";


function ShippingInformation(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const cart = useSelector(state => state.cart);
    const { shippingInformation } = cart


    if (!userInfo) {
        props.history.push("/signin");
    }

    const [firstName, setFirstName] = useState(shippingInformation?.firstName || userInfo.firstName);
    const [lastName, setLastName] = useState(shippingInformation?.lastName || "");
    const [address, setAddress] = useState(shippingInformation?.address || "");
    const [city, setCity] = useState(shippingInformation?.city || "");
    const [postalCode, setPostalCode] = useState(shippingInformation?.postalCode || "");
    const [country, setCountry] = useState(shippingInformation?.country || "");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInformation({ firstName, lastName, address, city, postalCode, country }));
        props.history.push("/paymentMethod");
    }
    return (
        <div>
            <CheckoutSteps step1 step2 />
            <form className="shippingInfo__form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div className="fullname__container">
                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" placeholder="Enter First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter postalcode" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter country" value={country} onChange={e => setCountry(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="shippingInfo__button" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingInformation
