import * as actionTypes from './actionTypes';
import axios from 'axios';

export const userTestAction = (message) => {
    return {
        type: actionTypes.USER_TEST_ACTION,
        message: message
    }
}

export const userInitProfile = (profileData) => {
    return dispatch => {
        
        const baseUrl = 'https://science-words-default-rtdb.firebaseio.com';
        const url = `${baseUrl}/user-profiles/${profileData.localId}.json`;

        axios.put(url,profileData)
            .then( response => {
                // console.log(response);
            })
            .catch( error => {
                // console.log(error);
            })

    }
}
