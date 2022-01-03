import { CLEAR__MESSAGE, MESSAGE__ERROR, MESSAGE__SUCCESS, MESSAGE__WARNING } from "../constants/generalConstants"


export const messageSuccess = (message) => (dispatch, getState) => {
        dispatch({ type: MESSAGE__SUCCESS, payload: message })

}


export const messageWarning = (message) => (dispatch, getState) => {
        dispatch({ type: MESSAGE__WARNING, payload: message })

}


export const messageError = (message) => (dispatch, getState) => {
        dispatch({ type: MESSAGE__ERROR, payload: message })
       
}

export const clearMessage = () => (dispatch) =>{
    dispatch({type: CLEAR__MESSAGE})
}