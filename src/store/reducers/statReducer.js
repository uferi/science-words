import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

// currentWeek, displayWeek should look like: '2021-09'

const getCurrentWeek = () => {
        let d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        let dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        let yearStart = new Date(Date.UTC(new Date().getUTCFullYear(),0,1));
        let weekNumber =  Math.ceil((((d - yearStart) / 86400000) + 1)/7);
        const thisYear = new Date().getFullYear().toString();
        const outString = thisYear + '-' + weekNumber.toString().padStart(2,'0');
        // console.log(outString);
    return outString;
    // return '2021-05';
}


const initialState = {
    // currentWeek: (new Date().getFullYear().toString()) + '-' + (Math.floor( (( (new Date().getTime())-(new Date(new Date().getFullYear(), 0, 1).getTime()) )/1000/60/60/24/7) ).toString().padStart(2,'0')),
    // currentWeek: '2021-08',
    currentWeek: getCurrentWeek(),
    displayWeek: getCurrentWeek(),
    isUserProfilesLoading: false,
    isWeeklyStatLoading: false,
    userProfiles: null,
    weeklyStat: null,
}

const statSetUserProfiles = (state,action) => {
    return {
        ...state,
        userProfiles: action.userProfiles
    }
}

const statFetchUserProfilesStart = (state,action) => {
    return {
        ...state,
        isUserProfilesLoading: true
    }
}

const statFetchUserProfilesSuccess = (state,action) => {
    return {
        ...state,
        isUserProfilesLoading: false
    }
}

const statFetchUserProfilesFail = (state,action) => {
    return {
        ...state,
        isUserProfilesLoading: false
    }
}

const statSetWeeklyStat = (state,action) => {
    return {
        ...state,
        weeklyStat: action.weeklyStat
    }
}

const statFetchWeeklyStatStart = (state,action) => {
    return {
        ...state,
        isWeeklyStatLoading: true
    }
}

const statFetchWeeklyStatSuccess = (state,action) => {
    return {
        ...state,
        isWeeklyStatLoading: false
    }
}

const statFetchWeeklyStatFail = (state,action) => {
    return {
        ...state,
        isWeeklyStatLoading: false
    }
}

const statDisplayWeekSet = (state,action) => {
    return {
        ...state,
        displayWeek: action.weekData
    }
}

const statDisplayWeekIncrement = (state,action) => {
    let newYear = +state.displayWeek.split('-')[0];
    let newWeek = +state.displayWeek.split('-')[1];

    newWeek++;
    if(newWeek>52){
        newYear++;
        newWeek=1;
    }

    const newDisplayWeek = newYear.toString() + '-' + newWeek.toString().padStart(2,'0');
    return {
        ...state,
        displayWeek: newDisplayWeek
    }
}

const statDisplayWeekDecrement = (state,action) => {
    let newYear = +state.displayWeek.split('-')[0];
    let newWeek = +state.displayWeek.split('-')[1];

    newWeek--;
    if(newWeek<1){
        newYear--;
        newWeek=52;
    }

    const newDisplayWeek = newYear.toString() + '-' + newWeek.toString().padStart(2,'0');

    return {
        ...state,
        displayWeek: newDisplayWeek
    }
}

const statDisplayWeekToCurrent = (state,action) => {
    const newDisplayWeek = state.currentWeek;
    return {
        ...state,
        displayWeek: newDisplayWeek
    }
}

const statReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.STAT_SET_USER_PROFILES:
            return statSetUserProfiles(state,action);
        case actionTypes.STAT_FETCH_USER_PROFILES_START:
            return statFetchUserProfilesStart(state,action);
        case actionTypes.STAT_FETCH_USER_PROFILES_SUCCESS:
            return statFetchUserProfilesSuccess(state,action);
        case actionTypes.STAT_FETCH_USER_PROFILES_FAIL:
            return statFetchUserProfilesFail(state,action);
        case actionTypes.STAT_SET_WEEKLY_STAT:
            return statSetWeeklyStat(state,action);
        case actionTypes.STAT_FETCH_WEEKLY_STAT_START:
            return statFetchWeeklyStatStart(state,action);
        case actionTypes.STAT_FETCH_WEEKLY_STAT_SUCCESS:
            return statFetchWeeklyStatSuccess(state,action);
        case actionTypes.STAT_FETCH_WEEKLY_STAT_FAIL:
            return statFetchWeeklyStatFail(state,action);
        case actionTypes.STAT_DISPLAY_WEEK_SET:
            return statDisplayWeekSet(state,action);
        case actionTypes.STAT_DISPLAY_WEEK_INCREMENT:
            return statDisplayWeekIncrement(state,action);
        case actionTypes.STAT_DISPLAY_WEEK_DECREMENT:
            return statDisplayWeekDecrement(state,action);
        case actionTypes.STAT_DISPLAY_WEEK_TO_CURRENT:
            return statDisplayWeekToCurrent(state,action);
        default:
            return state;
    }
}

export default statReducer;