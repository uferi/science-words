import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

import axios from 'axios';

const initialState = { 
    isAuthenticated: false,
    isLoading: false,
    displayName: '',
    email: '',
    expiresIn: '',
    idToken: '',
    localId: '',
    refreshToken: '',
    registered: false,
    error: null
}

const authStart = (state, action) => {
    return {
        ...state,
        isLoading: true
    }
}

const authSignUpSuccess = (state, action) => {
    return {
        ...state,
        isLoading: false,
    }
}

const authSignUpFail = (state, action) => {
    return {
        ...state,
        isLoading: false,
    }
}

const authSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        displayName: action.authData.displayName,
        email: action.authData.email,
        expiresIn: action.authData.expiresIn,
        idToken: action.authData.idToken,
        localId: action.authData.localId,
        refreshToken: action.authData.refreshToken,
        registered: action.authData.registered,
        error: null
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        isLoading: false,
        error: action.error
    }
}

const authReducer = ( state=initialState, action ) => {
    switch (action.type){
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            return authSignUpSuccess(state,action);
        case actionTypes.AUTH_SIGNUP_FAIL:
            return authSignUpFail(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        default:
            return state;
    }
}

export default authReducer;