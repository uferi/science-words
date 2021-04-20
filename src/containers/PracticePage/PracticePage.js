import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './PracticePage.module.css';

import * as actions from '../../store/actions/index';

import SetupPractice from './SetupPractice/SetupPractice';
import PracticeSession from "./PracticeSession/PracticeSession";

class PracticePage extends Component {
    state = {
        isSetup: true,
        isChecking: false,
        beginPracticeTime: null,
        endPracticeTime: null,
        sessionElapsedTime: null,
        sessionGoodAnswers: null,
        sessionAllAnswers: null
    }

    componentDidMount() {
        if(!this.props.words){
            this.props.fetchWords();
        }
    }

    onBeginSession = () => {
        // console.log('Yo - BEGIN!');
        const now = Date.now();
        // console.log(now);
        this.setState({
            isSetup: false,
            beginPracticeTime: now,
            endPracticeTime: null
        });
    }
    
    onCancelSession = () => {
        this.setState({
            isSetup: true,
            isChecking: false,
            beginPracticeTime: null,
            endPracticeTime: null
        });
    }
    
    onCheckItHandler = (scrambledWords) => {
        const now = Date.now();
        const timeElapsed = now - this.state.beginPracticeTime;
        
        let goodAnswers = 0;
        let allAnswers = 0;
        
        for(let i=0; i<scrambledWords.length; i++){
            allAnswers++;
            if(scrambledWords[i].query === 'eng'){
                if(scrambledWords[i].eng === scrambledWords[i].answer){
                    goodAnswers++;
                }
            } else {
                if(scrambledWords[i].hun === scrambledWords[i].answer){
                    goodAnswers++;
                }
            }
        }

        this.setState({
            isChecking: true,
            endPracticeTime: now,
            sessionElapsedTime: timeElapsed,
            sessionGoodAnswers: goodAnswers,
            sessionAllAnswers: allAnswers
        });

        const newUserProfile = {...this.props.userProfiles[this.props.localId]};
        newUserProfile.goodAnswers += goodAnswers
        newUserProfile.allAnswers += allAnswers;
        newUserProfile.timeSpent += timeElapsed;
        this.props.updateUserProfile(newUserProfile);

        
        let data = null;
        let newWeeklyStat = {
                    allAnswers: allAnswers,
                    displayName: this.props.displayName,
                    goodAnswers: goodAnswers,
                    timeSpent: timeElapsed
        }

        if(this.props.weeklyStat !== null){
            if( this.props.weeklyStat[this.props.currentWeek] &&
                this.props.weeklyStat[this.props.currentWeek][this.props.localId] ) {
                    newWeeklyStat = null;
                    newWeeklyStat = {...this.props.weeklyStat[this.props.currentWeek][this.props.localId]};
                    newWeeklyStat.allAnswers += allAnswers;
                    newWeeklyStat.goodAnswers += goodAnswers;
                    newWeeklyStat.timeSpent += timeElapsed;
            }
        }

        data = {
            localId: this.props.localId,
            currentWeek: this.props.currentWeek,
            newStat: newWeeklyStat
        }
        this.props.updateWeeklyStat(data);
    }


    render() {

        // console.log(this.props.currentWeek);

        let pageContent = null;
        if(this.state.isSetup){
            pageContent = (
                <SetupPractice words={this.props.words} isWordsLoading={this.props.isWordsLoading} onBeginSession={this.onBeginSession}/>
            )
        } else {
            pageContent = (
                <PracticeSession 
                    words={this.props.words} 
                    onCancelSession={this.onCancelSession} 
                    onCheckItHandler={this.onCheckItHandler} 
                    resultGoodAnswers={this.state.sessionGoodAnswers} 
                    resultAllAnswers={this.state.sessionAllAnswers} 
                    resultElapsedTime={this.state.sessionElapsedTime} 
                    isChecking={this.state.isChecking} />
            )
        }

        return (
            <div className={classes.PracticePage}>
                {/* practice page */}
                {pageContent}
            </div>
        )
    }
}

const mapSateToProps = state => {
    return {
        words: state.words.words,
        isWordsLoading: state.words.isWordsLoading,
        userProfiles: state.stat.userProfiles,
        weeklyStat: state.stat.weeklyStat,
        currentWeek: state.stat.currentWeek,
        localId: state.auth.localId,
        displayName: state.auth.displayName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWords: () => dispatch(actions.fetchWords()),
        updateUserProfile: (newProfile) => dispatch(actions.updateUserProfile(newProfile)),
        updateWeeklyStat: (data) => dispatch(actions.updateWeeklyStat(data))
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(PracticePage);