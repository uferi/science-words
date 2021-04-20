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
    messages: []
}

const userInitProfile = (state, action) => {
    return {
        ...state
    }
}

const userMessageSet = (state,action) => {
    const currentMessages = [...state.messages];
    const newMessage = {
        message: action.newMessage.message ? action.newMessage.message : '',
        detail: action.newMessage.detail ? action.newMessage.detail : '',
        isError: action.newMessage.isError ? true : false,
        onAccept: action.newMessage.onAccept ? action.newMessage.onAccept : null
    }
    currentMessages.push(newMessage);

    return {
        ...state,
        messages: currentMessages
    }
}

const userMessageClear = (state,action) => {
    const currentMessages = [...state.messages];
    if(currentMessages.length){
        currentMessages.shift();
    }
    return {
        ...state,
        messages: currentMessages
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
        case actionTypes.USER_MESSAGE_SET:
            return userMessageSet(state,action);
        case actionTypes.USER_MESSAGE_CLEAR:
            return userMessageClear(state,action);
        default:
            return state;
    }
}

export default userReducer;