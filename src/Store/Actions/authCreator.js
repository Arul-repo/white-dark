import axios from "axios";
import * as ActionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        value: data
    }
}

export const authFail = (err) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: err
    }
}

export const auth = ( postData, postURL ) => {
    postData.returnSecureToken = true;
    const postObject = Object.assign({}, postData);
    return dispatch => {
        dispatch(authStart());
        axios.post(postURL, postObject)
        .then(response => {
            dispatch(authSuccess(response.data));
        })
        .catch( err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}
