import * as actionTypes from '../actions/actionTypes';

const initialState = {
    id: '',
    nickName: 'Lau',
    firstName: 'Laura',
    lastName: 'Ugrai',
    password: 'unicorn',
    type: 'student',            // student, teacher, admin
    statAnswersGood: 42,
    statAnswersAll: 50,
    statTimePracticed: 150       // measured in seconds
}

const userInitProfile = (state, action) => {
    return {
        ...state
    }
}

const reducer = ( state=initialState, action ) => {
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

export default reducer;