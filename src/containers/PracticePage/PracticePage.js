import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './PracticePage.module.css';

import * as actions from '../../store/actions/index';

import SetupPractice from './SetupPractice/SetupPractice';

class PracticePage extends Component {
    state = {
        isSetup: true
    }

    componentDidMount() {
        if(!this.props.words){
            this.props.fetchWords();
        }
    }

    render() {

        // console.log(this.props.words);

        return (
            <div className={classes.PracticePage}>
                {/* practice page */}
                <SetupPractice words={this.props.words} isWordsLoading={this.props.isWordsLoading}/>
            </div>
        )
    }
}

const mapSateToProps = state => {
    return {
        words: state.words.words,
        isWordsLoading: state.words.isWordsLoading
    }
}

const mapReducerToProps = dispatch => {
    return {
        fetchWords: () => dispatch(actions.fetchWords())
    }
}

export default connect(mapSateToProps,mapReducerToProps)(PracticePage);