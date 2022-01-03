import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants.js";
// import { axiosInstanceInstance } from "../config.js";
import axiosInstance from "axiosInstance";
import { CART_EMPTY } from "../constants/cartConstants.js";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await axiosInstance.post("/api/orders/create", order, {
            headers: {
                "authorization": `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        });

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInformation");
        getState().cart.paymentMethod = "";
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}


export const detailsOrder = (orderId) => async (dispatch, getState) => {

    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await axiosInstance.get(`/api/orders/${orderId}`, {
            headers: { "authorization": `Bearer ${userInfo.token}` }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    }catch (error) {
        const message = 
            error.response && error.response.data.message
             ? error.response.data.message
             : error.message

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message
                
        })
    }
}


export const paymentOrder = (order, paymentResult) => async(dispatch, getState) =>{
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}});
    const {userSignin : {userInfo}} = getState();
    try {
        const { data } = axiosInstance.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: {"authorization" : `Bearer ${userInfo.token}`},
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        const message = 
        error.response && error.response.data.message
         ? error.response.data.message
         : error.message

    dispatch({
        type: ORDER_PAY_FAIL,
        payload: message
            
    })
    }


};

export const listOrderMine = () =>async (dispatch, getState) =>{
    dispatch({type: ORDER_MINE_LIST_REQUEST});
    const { userSignin: {userInfo}} = getState();
    try {
        const { data } = await axiosInstance.get("/api/orders/mine",{
            headers: {
                "authorization": `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message = 
        error.response && error.response.data.message
         ? error.response.data.message
         : error.message

        dispatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: message
                
        })
    }

}