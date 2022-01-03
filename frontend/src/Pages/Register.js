import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { photoUpload, register } from '../Redux/actions/userActions';
import Loading from '../Components/Loading';
import Message from '../Components/Message';
import "./Register.css";

function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/signin"
    const userRegister = useSelector(state => state.userRegister);
    const { registerInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
        }else if( !firstName || !lastName || !username || !password || !confirmPassword || !email || !mobileNumber){
            alert("Some fields were left empty! Fill them.");
        }else{
            const filename = Date.now() + file?.name;
            if (file) {
                const data = new FormData();
                data.append("name", filename);
                data.append("file", file);
                dispatch(photoUpload(data));
          }
            dispatch(register(firstName, lastName, username, email, filename, mobileNumber, password));
        }
    }

    useEffect(() => {
        if (registerInfo) {
            props.history.push(redirect);
        }
    }, [props.history,redirect,registerInfo,])

    return (
        <div className="form__wrapper">
            <form className="form register" onSubmit={submitHandler}>
                <div>
                    <h1 className="page__title">Create An Account</h1>
                </div>
                <div>
                    {loading && <Loading></Loading>}
                    {error && <Message variant="danger">{error}</Message>}
                </div>
                <div className="picture__container">
                            <div className="image__inner__container">
                                <label htmlFor="file__add">
                                    <i className=" fa fa-user-circle-o" aria-hidden="true"></i>
                                </label>
                                <img src={file && URL.createObjectURL(file)} className="register__picture" alt="" />
                            </div>
                           
                            <input type="file" id="file__add" name="file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                </div>
                <div className="fullname__container">
                  <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" placeholder="Enter First Name" required onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="lastName">
                    <label htmlFor="lastName" className="label__text">Last Name</label>
                    <input type="text" id="lastName" placeholder="Enter Last Name" required onChange={(e) => setLastName(e.target.value)} />
                  </div>  
                </div>
                
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter Username" required onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="tel" id="mobileNumber" placeholder="Enter Mobile Number" required onChange={(e) => setMobileNumber(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className="password__container">
                        <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
                        <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash" } onClick={e => setShowPassword(!showPassword)}></i>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword"> Confirm Password</label>
                    <div className="password__container">
                        <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Re-enter password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                        <i className={showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash" } onClick={e => setShowConfirmPassword(!showConfirmPassword)}></i>
                    </div>
                </div>
                <div>
                    <label />
                    <button className="register__button" disabled={loading} type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already Have An Account? {" "}
                        <Link to={`/signin?redirect=${redirect}`} className="signin">Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
