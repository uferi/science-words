import * as actionTypes from './actionTypes';
import * as actions from './index';

import axios from 'axios';

export const fetchWords = () => {
    return dispatch => {
        // console.log('[fetchWords] - dispatched');
        
        const url = 'https://science-words-default-rtdb.firebaseio.com/words.json';

        dispatch(fetchWordsStart());
        
        axios.get(url)
            .then(response=>{
                dispatch(setWords(response.data));
                dispatch(fetchWordsSuccess());
                // console.log(response.data);
            })
            .catch( error => {
                dispatch(fetchWordsFail());
                console.log(error);
            })

    }
}

export const fetchWordsStart = () => {
    return {
        type: actionTypes.WORDS_FETCH_WORDS_START
    }
}

export const fetchWordsSuccess = () => {
    return {
        type: actionTypes.WORDS_FETCH_WORDS_SUCCESS
    }
}

export const fetchWordsFail = () => {
    return {
        type: actionTypes.WORDS_FETCH_WORDS_FAIL
    }
}

export const setWords = (words) => {
    return {
        type: actionTypes.WORDS_SET_WORDS,
        words: words
    }
}

export const setPracticeRange = (range) => {
    return {
        type: actionTypes.WORDS_SET_PRACTICE_RANGE,
        range: range
    }
}