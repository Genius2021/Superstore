import { PRODUCTS_GET_FAIL, PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";



export const getAllProductsReducer = (state = {allProducts: []}, action) => {
    switch (action.type) {
        case PRODUCTS_GET_REQUEST:
            return { loading: true };
        case PRODUCTS_GET_SUCCESS:
            return { ...state, loading: false, success: true, allProducts: action.payload}
        case PRODUCTS_GET_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getSingleProductReducer = (state = {singleProduct:{}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, success: true, singleProduct: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}