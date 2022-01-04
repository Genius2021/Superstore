import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import { signin } from '../Redux/actions/userActions';
import "./Login.css";

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = props.location.search && props.location.search.split("=")[1]
    
    const signinData = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = signinData;

    const userRegister = useSelector(state => state.userRegister);
    const { registerInfo } = userRegister;

    const updateMessage = useSelector(state => state.message);
    const { errorMessage, successMessage } = updateMessage;

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);


    const submitHandler = (e) => {
        e.preventDefault();
        if( !password || !email ){
            alert("Some fields were left empty! Fill them.");
        }else{
            dispatch(signin( email, password ));
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push("/");
        }
        
        if(redirect){
            if(userInfo){
                props.history.push(redirect);
            }
        }

    }, [props.history,redirect,userInfo,])

    return (
        <div className="form__wrapper">
            <form className="form login" onSubmit={submitHandler}>
                <div>
                    <h1 className="page__title">Log in for Free!</h1>
                </div>
                <div>
                    {loading && <Loading></Loading>}
                    {/* {error && <Message variant="danger">{error}</Message>} */}
                    {(errorMessage || error) && <Message variant="danger">{errorMessage || error }</Message>}
                    {registerInfo && successMessage && <Message variant="success">{ successMessage }</Message>}
                </div>
            
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className="password__container">
                        <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
                        <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash" } onClick={e => setShowPassword(!showPassword)}></i>
                    </div>
                </div>
                <div>
                    <label />
                    <button className="login__button" disabled={loading} type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        Don't Have An Account? {" "}
                        <Link to={`/register?redirect=${redirect}`} className="register">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
