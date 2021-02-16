import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    totalWords: 3,
    wordPairs:  [   {wordId: 0, eng: 'monkey', hun: 'majom'},
                    {wordId: 1, eng: 'ball', hun: 'labda'},
                    {wordId: 2, eng: 'table', hun: 'asztal'} ],
}

const reducer = ( state=initialState, action ) => {
    switch (action.type){
        case actionTypes.WORD_TEST_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;