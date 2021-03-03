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

const authUser = (email, password, isSignup, nickName) => {
    // Web API Key AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI

    // dispatch(actions.authStart());

    let token = null
    const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    
    if(isSignup){
        axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI', authData)
        .then(response => {
            token = response.data.idToken;
            
            const userData = {
                idToken : token,
                displayName: nickName,
                returnSecureToken: true
            }
    
            axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI', userData)
            .then( response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            })

        })
        .catch(error => {
            console.log(error);
        })
    } else {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI', authData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })

    }
}


const reducer = ( state=initialState, action ) => {
    switch (action.type){
        case actionTypes.AUTH_USER:
            authUser(action.email, action.password, action.isSignup, action.nickName);
            return state;
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

export default reducer;