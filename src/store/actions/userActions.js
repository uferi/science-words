import * as actionTypes from './actionTypes';

export const userTestAction = (message) => {
    return {
        type: actionTypes.USER_TEST_ACTION,
        message: message
    }
}

