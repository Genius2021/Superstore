import { CLEAR__MESSAGE, MESSAGE__ERROR, MESSAGE__SUCCESS, MESSAGE__WARNING } from "../constants/generalConstants";


export const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE__SUCCESS:
            return { ...state, successMessage: action.payload };
        case MESSAGE__WARNING:
            return {...state, warningMessage: action.payload };
        case MESSAGE__ERROR:
            return { ...state, errorMessage: action.payload };
        case CLEAR__MESSAGE:
            return {};
        default:
            return state;
    }
}

