import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from 'axios';
// import { fetchUserProfiles, fetchUserProfilesStart, fetchUserProfilesSuccess } from './statActions';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSignIn = (data) => {
    return dispatch => {
        
        const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        }

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI';

        axios.post( url, authData)
        .then(response => {
            dispatch(authSuccess(response.data));

            // dispatch(actions.fetchUserProfilesStart());
            dispatch(actions.fetchUserProfiles());

            // dispatch(actions.fetchWeeklyStatStart());
            dispatch(actions.fetchWeeklyStat());

            data.history.push('/');
        })
        .catch(error => {
            dispatch(authFail(error));
            dispatch(actions.userMessageSet({
                message: 'Bad Email or Password !',
                detail: error.toString(),
                isError: true
            }))
        })
    }
}

export const authSignUp = (data) => {
    return dispatch => {

        const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        }

        const profileData = {
            localId: '',
            displayName: data.nickName,
            email: data.email,
            goodAnswers: 0,
            allAnswers: 0,
            timeSpent: 0
        }
        
        // Web API Key AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI
        const urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI';
        const urlUpdate = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI';

        axios.post( urlSignUp, authData)
        .then(response => {
            
            profileData.localId = response.data.localId;
            dispatch(actions.userInitProfile(profileData));

            const token = response.data.idToken;
            const userData = {
                idToken : token,
                displayName: data.nickName,
                returnSecureToken: true
            }
    
            axios.post( urlUpdate, userData)
            .then( response => {
                dispatch(actions.userMessageSet({
                    message: 'User Successfully Created!',
                    detail: 'User is Activated. You can log in immediately with email: ' + data.email,
                    isError: false
                }))
                dispatch(authSignUpSuccess());
                data.history.push('/auth');
            })
            .catch( error => {
                // console.log(error);
                dispatch(actions.userMessageSet({
                    message: 'Something went wrong with nickName update!',
                    detail: error.toString(),
                    isError: true
                }))
                dispatch(authSignUpFail());
            })

        })
        .catch(error => {
            // console.log(error);
            dispatch(actions.userMessageSet({
                    message: 'Something went wrong! - Check All The Fields Please!',
                    detail: error.toString(),
                    isError: true
                }))
            dispatch(authSignUpFail());
        })
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (data) => {
    return dispatch => {
        dispatch(authStart());
        if(data.isSignup){
            dispatch(authSignUp(data));
        } else {
            dispatch(authSignIn(data));
        }
    }
}

export const authSignUpSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS
    }
}

export const authSignUpFail = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


//------------------------------ PASSWORD RESET ----------------------------------------

export const authPasswordReset = (data) => {
    return dispatch => {

        const urlPasswordReset = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDca137usYug1VKuQ59J6keqheUOeJCrI';

        const payload = {
            requestType: 'PASSWORD_RESET',
            email: data.email
        }

        dispatch(authPasswordResetStart());

        axios.post( urlPasswordReset, payload)
            .then( response => {
                // console.log(response);
                dispatch(actions.userMessageSet({
                    message: 'Email was sent successfully to:',
                    detail: response.data.email,
                    isError: false
                }))
                dispatch(authPasswordResetSuccess());
            })
            .catch( error => {
                // console.log(error);
                dispatch(actions.userMessageSet({
                    message: 'Something went wrong with Password Reset!',
                    detail: error.toString(),
                    isError: true
                }))
                dispatch(authPasswordResetFail());
            })

    }
}

export const authPasswordResetStart = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_START
    }
}

export const authPasswordResetSuccess = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_SUCCESS
    }
}

export const authPasswordResetFail = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_FAIL
    }
}