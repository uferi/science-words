import * as actionTypes from './actionTypes';
import * as actions from './index';

import axios from 'axios';


export const fetchUserProfiles = () => {
    return dispatch => {
        // console.log('[fetchUserProfiles] - dispatched');

        const url = 'https://science-words-default-rtdb.firebaseio.com/user-profiles.json';

        dispatch(fetchUserProfilesStart());
        axios.get(url)
            .then(response=>{
                dispatch(setUserProfiles(response.data));
                dispatch(fetchUserProfilesSuccess());
                // console.log(response.data);
            })
            .catch( error => {
                dispatch(fetchUserProfilesFail());
                console.log(error);
            })

    }
}

export const setUserProfiles = (userProfiles) => {
    return {
        type: actionTypes.STAT_SET_USER_PROFILES,
        userProfiles: userProfiles
    }
}

export const fetchWeeklyStat = () => {
    return dispatch => {
        // console.log('[fetchWeeklyStat] - dispatched');

        const url = 'https://science-words-default-rtdb.firebaseio.com/weekly-stat.json';

        dispatch(fetchWeeklyStatStart());
        axios.get(url)
        .then(response=>{
                dispatch(setWeeklyStat(response.data));
                dispatch(fetchWeeklyStatSuccess());
                // console.log(response.data);
            })
            .catch( error => {
                dispatch(fetchWeeklyStatFail());
                console.log(error);
            })
    }
}

export const setWeeklyStat = (weeklyStat) => {
    return {
        type: actionTypes.STAT_SET_WEEKLY_STAT,
        weeklyStat: weeklyStat
    }
}

export const fetchUserProfilesStart = () => {
    return {
        type: actionTypes.STAT_FETCH_USER_PROFILES_START
    }
}

export const fetchUserProfilesSuccess = () => {
    return {
        type: actionTypes.STAT_FETCH_USER_PROFILES_SUCCESS
    }
}

export const fetchUserProfilesFail = () => {
    return {
        type: actionTypes.STAT_FETCH_USER_PROFILES_FAIL
    }
}

export const fetchWeeklyStatStart = () => {
    return {
        type: actionTypes.STAT_FETCH_WEEKLY_STAT_START
    }
}

export const fetchWeeklyStatSuccess = () => {
    return {
        type: actionTypes.STAT_FETCH_WEEKLY_STAT_SUCCESS
    }
}

export const fetchWeeklyStatFail = () => {
    return {
        type: actionTypes.STAT_FETCH_WEEKLY_STAT_FAIL
    }
}

export const setDisplayWeek = (weekData) => {
    return {
        type: actionTypes.STAT_DISPLAY_WEEK_SET,
        weekData: weekData
    }
}

export const displayWeekIncrement = () => {
    return {
        type: actionTypes.STAT_DISPLAY_WEEK_INCREMENT
    }
}

export const displayWeekDecrement = () => {
    return {
        type: actionTypes.STAT_DISPLAY_WEEK_DECREMENT
    }
}

export const displayWeekToCurrent = () => {
    return {
        type: actionTypes.STAT_DISPLAY_WEEK_TO_CURRENT
    }
}


export const updateUserProfile = (profileData) => {
    return dispatch => {

        const baseUrl = 'https://science-words-default-rtdb.firebaseio.com';
        const url = `${baseUrl}/user-profiles/${profileData.localId}.json`;

        dispatch(updateUserProfileStart());
        axios.put(url,profileData)
            .then( response => {
                dispatch(updateUserProfileSuccess());
                dispatch(fetchUserProfiles());
                // console.log(response);
            })
            .catch( error => {
                dispatch(updateUserProfileFail());
                // console.log(error);
            })
    }
}

export const updateUserProfileStart = () => {
    return {
        type: actionTypes.STAT_UPDATE_USER_PROFILE_START
    }
}

export const updateUserProfileSuccess = () => {
    return {
        type: actionTypes.STAT_UPDATE_USER_PROFILE_SUCCESS
    }
}

export const updateUserProfileFail = () => {
    return {
        type: actionTypes.STAT_UPDATE_USER_PROFILE_FAIL
    }
}

export const updateWeeklyStat = (data) => {
    return dispatch => {

        const baseUrl = 'https://science-words-default-rtdb.firebaseio.com';
        const url = `${baseUrl}/weekly-stat/${data.currentWeek}/${data.localId}.json`;

        dispatch(updateWeeklyStatStart());
        axios.put(url,data.newStat)
            .then( response => {
                dispatch(updateWeeklyStatSuccess());
                dispatch(fetchWeeklyStat());
                // console.log(response);
            })
            .catch( error => {
                dispatch(updateWeeklyStatFail());
                // console.log(error);
            })
    }
}

export const updateWeeklyStatStart = () => {
    return {
        type: actionTypes.STAT_UPDATE_WEEKLY_STAT_START
    }
}

export const updateWeeklyStatSuccess = () => {
    return {
        type: actionTypes.STAT_UPDATE_WEEKLY_STAT_SUCCESS
    }
}

export const updateWeeklyStatFail = () => {
    return {
        type: actionTypes.STAT_UPDATE_WEEKLY_STAT_FAIL
    }
}
