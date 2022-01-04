import { axiosInstance } from "../../config.js";
import { MESSAGE__ERROR, MESSAGE__SUCCESS } from "../constants/generalConstants";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_PHOTO_UPDATE_FAIL, USER_PHOTO_UPDATE_REQUEST, USER_PHOTO_UPDATE_SUCCESS, USER_PHOTO_UPLOAD_FAIL, USER_PHOTO_UPLOAD_REQUEST, USER_PHOTO_UPLOAD_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axiosInstance.post("/api/users/signin", { email, password });
        
        if(data._id){
        const { message, ...rest } = data
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: rest });
        dispatch({ type: MESSAGE__SUCCESS, payload: message });
        localStorage.setItem("userInfo", JSON.stringify(rest));
      }else{

          dispatch({type: MESSAGE__ERROR, payload: data.message})
      }


    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const register = (firstName, lastName, username, email, picture, mobileNumber, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const { data } = await axiosInstance.post("/api/users/register", { firstName, lastName, username, email, picture, mobileNumber, password });
        
        if(data._id){
            const { message, ...rest } = data
            dispatch({ type: USER_REGISTER_SUCCESS, payload: rest });
            dispatch({ type: MESSAGE__SUCCESS, payload: message });
          }else{
    
              dispatch({type: MESSAGE__ERROR, payload: data.message})
          }
       
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const signout = () => (dispatch, getState) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingInformation");
    dispatch({ type: USER_SIGNOUT });
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await axiosInstance.get(`/api/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${userInfo.token}`
            }
        });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: USER_DETAILS_FAIL, payload: message })
    }
}


export const updateProfile = (user) => async (dispatch, getState) =>{

    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const { userSignin: {userInfo}} = getState();
    try {
        const { data } = await axiosInstance.put("/api/users/profile", user, {
            headers: {
                "authorization": `Bearer ${userInfo.token}`
            }
        });
        
            if(data._id){
                const { message, ...rest } = data
                dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: rest})
                dispatch({type: MESSAGE__SUCCESS, payload: message})
                dispatch({type: USER_SIGNIN_SUCCESS, payload: rest})
                localStorage.setItem("userInfo", JSON.stringify(rest))
            }else{
                console.log( data, "data")
                dispatch({type: MESSAGE__ERROR, payload: data.message})
            }

        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message })
    }
}

export const photoUpdate = (file) => async (dispatch) => {
    dispatch({ type: USER_PHOTO_UPDATE_REQUEST, payload: { file } });
    try {
        const { data } = await axiosInstance.post("/api/upload", file);
        dispatch({ type: USER_PHOTO_UPDATE_SUCCESS, payload: data });
        console.log("success in updating image file")
    } catch (error) {
        dispatch({
            type: USER_PHOTO_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const photoUpload = (file) => async (dispatch) => {
    dispatch({ type: USER_PHOTO_UPLOAD_REQUEST, payload: { file } });
    try {
        const { data } = await axiosInstance.post("/api/upload", file);
        dispatch({ type: USER_PHOTO_UPLOAD_SUCCESS, payload: data });
        console.log("success in uploading image file")
    } catch (error) {
        dispatch({
            type: USER_PHOTO_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};