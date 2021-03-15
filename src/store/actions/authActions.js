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
                dispatch(authSignUpSuccess());
                data.history.push('/auth');
            })
            .catch( error => {
                console.log(error);
                dispatch(authSignUpFail());
            })

        })
        .catch(error => {
            console.log(error);
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

// export const userSaveProfile = ()