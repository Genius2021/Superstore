import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from "./reducers/orderReducers";
import { getAllProductsReducer, getSingleProductReducer } from "./reducers/productReducers";
import { updateProfileReducer, userDetailsReducer, userRegisterReducer, userSigninReducer, } from "./reducers/userReducers";
import { messageReducer } from "./reducers/generalReducers";


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    },

    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInformation: localStorage.getItem("shippingInformation") ? JSON.parse(localStorage.getItem("shippingInformation")) : {},
        paymentMethod: "",
    }
};

const reducer = combineReducers({
  
    userSignin: userSigninReducer,
    cart: cartReducer,
    getAllProducts: getAllProductsReducer,
    getSingleProduct: getSingleProductReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    updateProfile: updateProfileReducer,
    message : messageReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;