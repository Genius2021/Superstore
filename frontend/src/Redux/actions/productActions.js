import { PRODUCTS_GET_FAIL, PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import axios from "axios";


export const getAllProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCTS_GET_REQUEST });

    try {
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCTS_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCTS_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getSingleProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    try {

        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

