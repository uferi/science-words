import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    isWordsLoading: false,
    words:  null,
    practiceFrom: null,
    practiceTo: null
}

const wordsFetchWords = (state,action) => {
    return {
        ...state
    }
}

const wordsFetchWordsStart = (state,action) => {
    return {
        ...state,
        isWordsLoading: true
    }
}

const wordsFetchWordsSuccess = (state,action) => {
    return {
        ...state,
        isWordsLoading: false
    }
}

const wordsFetchWordsFail = (state,action) => {
    return {
        ...state,
        isWordsLoading: false
    }
}

const wordsSetWords = (state,action) => {
    return {
        ...state,
        words: action.words
    }
}

const wordsSetPracticeRange = (state,action) => {
    return {
        ...state,
        practiceFrom: action.range.from,
        practiceTo: action.range.to
    }
}

const wordsReducer = ( state=initialState, action ) => {
    switch (action.type){
        case actionTypes.WORDS_SET_WORDS:
            return wordsSetWords(state,action);
        case actionTypes.WORDS_FETCH_WORDS:
            return wordsFetchWords(state,action);
        case actionTypes.WORDS_FETCH_WORDS_START:
            return wordsFetchWordsStart(state,action);
        case actionTypes.WORDS_FETCH_WORDS_SUCCESS:
            return wordsFetchWordsSuccess(state,action);
        case actionTypes.WORDS_FETCH_WORDS_FAIL:
            return wordsFetchWordsFail(state,action);
        case actionTypes.WORDS_SET_PRACTICE_RANGE:
            return wordsSetPracticeRange(state,action)
        default:
            return state;
    }
}

export default wordsReducer;