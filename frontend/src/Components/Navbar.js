import React from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../Redux/actions/userActions';
import { capitalizeWord } from '../ReusableFunctions';


function Navbar() {
    const signinData = useSelector(state => state.userSignin);
    const { userInfo } = signinData;

    const dispatch = useDispatch();
    const picture = userInfo?.picture;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart

    const publicFolder = "http://localhost:5000/images/"

    const signoutHandler = () =>{
        dispatch(signout());
    }

    return (
        <>
            <div className="navbar__left">
             <Link to="/" className="logo"><span className="super">Super</span><span className="store">Store</span></Link>
            </div>
            <div className="navbar__right">
                    <ul className="navbar__links">
                      <li><Link to="/">Home</Link></li>
                      {userInfo && <li className="exception">Welcome back, Boss! {capitalizeWord(userInfo?.firstName)}</li>}
                      {userInfo && (<li>
                            <Link className="cart__length" to="/cart">Cart
                                {cartItems.length > 0 && (
                                    <div className="badge">{cartItems.length}</div>
                                )}
                            </Link>
                         </li>)
                      }
                      <li><Link to="/register">{ !userInfo ? "Register": "" }</Link></li>
                      <li><Link onClick={ userInfo && signoutHandler} to={userInfo ? "/" : "/signin"}>{ userInfo ? "Logout" : "Login" }</Link></li>
                    </ul>
                  { userInfo && <Link to="/profile"><img className="nav__pic" src={(picture && (publicFolder + picture)) || (publicFolder + "profilePic/profilePic.jpg")} alt="" /></Link>}
            </div>
        </>
    )
}

export default Navbar;
