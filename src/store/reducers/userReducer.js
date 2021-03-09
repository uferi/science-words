import * as actionTypes from '../actions/actionTypes';

const initialState = {
    localId: '',
    displayName: '',
    email: '',
    // firstName: '',
    // lastName: '',
    // type: 'student',            // student, teacher, admin
    goodAnswers: 0,
    allAnswers: 0,
    timeSpent: 0,       // measured in seconds
}

const userInitProfile = (state, action) => {
    return {
        ...state
    }
}

const userReducer = ( state=initialState, action ) => {
    switch (action.type){
        case actionTypes.USER_TEST_ACTION:
            console.log('[USER_TEST_ACTION] - dispatched successfully - message: ', action.message);
            return state;
        case actionTypes.USER_INIT_PROFILE:
            console.log('[USER_INIT_PROFILE] - dispatched successfully');
            return userInitProfile(state, action);
        default:
            return state;
    }
}

export default userReducer;