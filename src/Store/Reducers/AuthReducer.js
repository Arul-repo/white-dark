import * as actionTypes from "../Actions/actionTypes";
import { authUtility } from "../authUtility";

const userState = ({
    token: null,
    userId:null,
    email:null,
    loading: false,
    error: null
});

const authReducer = (state = userState, action) => {

    const authStart = (state, action) => {
        return authUtility(state, {
            error: null,
            loading: true
        })
    }

    const authSuccess = (state, action) => {
        return authUtility(state, {
            error: null,
            loading: false,
            token: action.value.idToken,
            userId:action.value.localId,
            email:action.value.email
        })
    }

    const authFail = (state, action) => {
        return authUtility(state, {
            error: action.error.message,
            loading: false
        })
    }

    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
                return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
}

export default authReducer;