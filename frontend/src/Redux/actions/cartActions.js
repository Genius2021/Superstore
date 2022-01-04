import { axiosInstance } from "../../config.js";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axiosInstance.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productName: data.productName,
            imageUrl: data.imageUrl,
            price: data.price,
            productId: data._id,
            qty,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInformation = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_INFO, payload: data });
    localStorage.setItem("shippingInformation", JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
}