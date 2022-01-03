import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile, photoUpdate, } from "../Redux/actions/userActions";
import "./Profile.css";
import Message from "../Components/Message";


function Profile() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    // const updatedProfileInfo = useSelector(state => state.updateProfile);
    // const { successUpdate, user} = updatedProfileInfo;

    const updateMessage = useSelector(state => state.message);
    const { errorMessage, successMessage } = updateMessage;

    const userId = userInfo._id;
    const picture = userInfo.picture;


    // const publicFolder = "https://stars-blog.herokuapp.com/images/"

    const publicFolder = "http://localhost:5000/images/"

    const [newFirstName, setNewFirstName] = useState(userInfo.firstName);
    const [newLastName, setNewLastName] = useState(userInfo.lastName);
    const [newAddress, setNewAddress] = useState(userInfo.address);
    const [newCity, setNewCity] = useState(userInfo.city);
    const [newPostalCode, setNewPostalCode] = useState(userInfo.postalCode);
    const [newCountry, setNewCountry] = useState(userInfo.country);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [file, setFile] = useState(null);


    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    
    const [showUpdatePic, setShowUpdatePic] = useState(false);
    const [showUpdateName, setShowUpdateName] = useState(false);
    const [showUpdateAddress, setShowUpdateAddress] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    
    const dispatch = useDispatch();

    const showPicHandler = (e) =>{
        setShowUpdatePic(!showUpdatePic);
    }
    const showNameHandler = (e) =>{
        setShowUpdateName(!showUpdateName);
    }
    const showAddressHandler = (e) =>{
        setShowUpdateAddress(!showUpdateAddress);
    }
    const showPasswordHandler = (e) =>{
        setShowUpdatePassword(!showUpdatePassword);
    }


    const profileUpdateHandler = (e) => {
        e.preventDefault();
        if( newPassword !== confirmNewPassword){
            alert("Passwords do not match");
        }else if(newPassword === "" || confirmNewPassword === ""){
            alert("The password fields cannot be empty");
        }else{
            const filename = Date.now() + file?.name;
            if (file) {
                const data = new FormData();
                data.append("name", filename);
                data.append("file", file);
                dispatch(photoUpdate(data));
            }
            dispatch(updateProfile({userId, newFirstName, newLastName, newAddress, newCity, newPostalCode, newCountry, currentPassword, newPassword, filename}));
            setNewFirstName("");
            setNewLastName("");
            setNewAddress("");
            setNewCity("");
            setNewCountry("");
            setCurrentPassword("")
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };

    return (
        <>
          <div className="update__container">
            <form className="form profile">
              <h1 className="page__name">Profile Page</h1>
                {/* {successUpdate && <Message variant="success">You have Successfully Updated your Profile!</Message>} */}
                {successMessage && <Message variant="success">{successMessage}</Message>}
                {errorMessage && <Message variant="danger">{errorMessage}</Message>}
                <div className="form__child">
                    <div className="box__3 profile" onClick={showPicHandler}>
                        <h2 className="the__title">Update Picture</h2>
                    </div>

                    {/* The code on the next line reads the following. If toggler is false, and the box1 is not in the
                       ToggleList Array, then give it a displayNone class*/}
                    <div className={`sub__container ${!showUpdatePic && "displayNone" }`}>
                        <div className="pic__container">
                            <img src={file ? URL.createObjectURL(file) : (picture && publicFolder + picture) || (publicFolder + "profilePic/profilePic.jpg") } className="profile__image" alt="profile__pic" />
                            <label htmlFor="file__add">
                                <i className="pic__icon fa fa-user-circle-o "></i>
                            </label>
                            <input type="file" id="file__add" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                            {/* <button className="profile__delete">Delete Account</button> */}
                        </div>
                        <button type="submit" onClick={profileUpdateHandler} className="button update">Update</button>
                    </div>
                </div>

                <div className="form__child">
                    <div className="box__3 profile" onClick={showNameHandler}>
                        <h2 className="the__title" >Update Name</h2>
                    </div>
                    <div className={`sub__container ${!showUpdateName && "displayNone" }`}>
                        <div className="data__input">
                            <label className="firstName" htmlFor="firstName">First Name: </label>
                            <input type="text" placeholder="First Name" id="firstName" value={newFirstName} onChange={e => setNewFirstName(e.target.value)} />
                        </div>
                        <div className="data__input">
                            <label className="lastName" htmlFor="lastName">Last Name: </label>
                            <input type="text" placeholder="Last Name" id="lastName" value={newLastName} onChange={e => setNewLastName(e.target.value)} />
                        </div>
                        <button type="submit" onClick={profileUpdateHandler} className="button update">Update</button>
                    </div>
                </div>

                <div className="form__child">
                    <div className="box__3 profile"  onClick={showAddressHandler}>
                        <h2 className="the__title">Update Your Address</h2>
                    </div>
                    <div className={`sub__container ${!showUpdateAddress && "displayNone" }`}>
                        <div className="data__input">
                            <label className="address" htmlFor="address">Address: </label>
                            <input type="text" placeholder="Last Name" id="address" value={newAddress} onChange={e => setNewAddress(e.target.value)} />
                        </div>
                        <div className="data__input">
                            <label className="city" htmlFor="city">City: </label>
                            <input type="text" placeholder="City" id="city" value={newCity} onChange={e => setNewCity(e.target.value)} />
                        </div>
                        <div className="data__input">
                            <label className="postalCode" htmlFor="postalCode">Postal Code: </label>
                            <input type="text" placeholder="Postal Code" id="postalCode" value={newPostalCode} onChange={e => setNewPostalCode(e.target.value)} />
                        </div>
                        <div className="data__input">
                            <label className="country" htmlFor="country">Country: </label>
                            <input type="text" placeholder="Country" id="country" value={newCountry} onChange={e => setNewCountry(e.target.value)} />
                        </div>
                        <button type="submit" onClick={profileUpdateHandler} className="button update">Update</button>
                    </div>
                </div>

                <div className="form__child">
                    <div className="box__3 profile" onClick={showPasswordHandler}>
                      <h2 className="the__title">Update Password</h2>
                    </div>
                    <div className={`sub__container ${!showUpdatePassword && "displayNone" }`}>
                        <div className="data__input">
                            <label className="password" htmlFor="currentpassword">Current Password: </label>
                            <div className="input__container" >
                                <input type={showCurrentPassword ? "text" : "password"} placeholder="Enter Your Current Password" id="currentpassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                                <i className={showCurrentPassword ? "fa fa-eye" : "fa fa-eye-slash" } onClick={e => setShowCurrentPassword(!showCurrentPassword)}></i>
                            </div>
                        </div>
                        <div className="data__input">
                            <label className="password" htmlFor="newpassword">New Password: </label>
                            <div className="input__container" >
                                 <input type={showNewPassword ? "text" : "password"} placeholder="New Password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                <i className={showNewPassword ? "fa fa-eye" : "fa fa-eye-slash" } onClick={e => setShowNewPassword(!showNewPassword)}></i>
                            </div>
                        </div>
                        <div className="data__input">
                            <label className="password" htmlFor="confirmNewPassword">Confirm New Password: </label>
                            <div className="input__container" >
                                <input type={showConfirmNewPassword ? "text" : "password"} placeholder="Confirm New Password" id="confirmNewPassword" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                                <i className={showConfirmNewPassword ? "fa fa-eye" : "fa fa-eye-slash" } onClick={e => setShowConfirmNewPassword(!showConfirmNewPassword)}></i>
                            </div>
                        </div>
                        <button type="submit" onClick={profileUpdateHandler} className="button update">Update</button>
                    </div>
                </div>
            </form>
          </div>
        </>
    )
}

export default Profile
