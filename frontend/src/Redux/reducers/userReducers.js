import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_SIGNIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_PHOTO_UPLOAD_REQUEST, USER_PHOTO_UPLOAD_SUCCESS, USER_PHOTO_UPLOAD_FAIL } from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, registerInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }

}


export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { ...state, loading: true };
        case USER_SIGNIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}
export const userDetailsReducer = (state = { loading: true,}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
export const updateProfileReducer = (state = { loadingUpdate: false }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loadingUpdate: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { ...state, loadingUpdate: false, successUpdate: true, user: action.payload };
        case USER_UPDATE_PROFILE_FAIL:
            return { ...state, loadingUpdate: false, errorUpdate: action.payload };
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

export const photoUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PHOTO_UPLOAD_REQUEST:
            return { ...state, loading: true };
        case USER_PHOTO_UPLOAD_SUCCESS:
            return { ...state, loading: false, successUpload: true };
        case USER_PHOTO_UPLOAD_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}
