import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

import classes from './MainPage.module.css';

import Toplist from '../../containers/Toplist/Toplist';

class MainPage extends Component {
    
    makeOverallGoodAnswersToplist = () => {
        const origList = [];
        const sortedList = [];
        for(const profile in this.props.userProfiles){
            origList.push(this.props.userProfiles[profile])
        }
        let iter = 0;
        while(origList.length>0){
            let highestValue = 0;
            let entryPicked = 0;
            for(const entry in origList){
                if(origList[entry].goodAnswers > highestValue){
                    highestValue = origList[entry].goodAnswers;
                    entryPicked = entry;
                }
            }
            sortedList.push(origList[entryPicked]);
            origList.splice(entryPicked,1);
        }
        return sortedList
    }

    makeOverallAllAnswersToplist = () => {
        const origList = [];
        const sortedList = [];
        for(const profile in this.props.userProfiles){
            origList.push(this.props.userProfiles[profile])
        }
        let iter = 0;
        while(origList.length>0){
            let highestValue = 0;
            let entryPicked = 0;
            for(const entry in origList){
                if(origList[entry].allAnswers > highestValue){
                    highestValue = origList[entry].allAnswers;
                    entryPicked = entry;
                }
            }
            sortedList.push(origList[entryPicked]);
            origList.splice(entryPicked,1);
        }
        return sortedList
    }

    makeOverallTimeSpentToplist = () => {
        const origList = [];
        const sortedList = [];
        for(const profile in this.props.userProfiles){
            origList.push(this.props.userProfiles[profile])
        }
        let iter = 0;
        while(origList.length>0){
            let highestValue = 0;
            let entryPicked = 0;
            for(const entry in origList){
                if(origList[entry].timeSpent > highestValue){
                    highestValue = origList[entry].timeSpent;
                    entryPicked = entry;
                }
            }
            sortedList.push(origList[entryPicked]);
            origList.splice(entryPicked,1);
        }
        return sortedList
    }

    makeOverallRatioToplist = () => {
        const origList = [];
        const sortedList = [];
        for(const profile in this.props.userProfiles){
            origList.push(this.props.userProfiles[profile])
        }
        let iter = 0;
        while(origList.length>0){
            let highestValue = 0;
            let entryPicked = 0;
            for(const entry in origList){
                const goodAnswers = origList[entry].goodAnswers;
                const allAnswers = origList[entry].allAnswers;
                if(allAnswers>0){
                    const ratio = goodAnswers/allAnswers;
                    if( ratio > highestValue){
                        highestValue = ratio;
                        entryPicked = entry;
                    }
                }
            }
            sortedList.push(origList[entryPicked]);
            origList.splice(entryPicked,1);
        }
        return sortedList
    }

    ///////////////////////////////

    makeWeeklyGoodAnswersToplist = () => {
        const origList = [];
        const sortedList = [];
        const week =  this.props.displayWeek;
        // const week =  '2021-09'; //for testing

        if(this.props.weeklyStat){
            for(const profile in this.props.weeklyStat[week]){
                origList.push(this.props.weeklyStat[week][profile])
            }
            let iter = 0;
            while(origList.length>0){
                let highestValue = 0;
                let entryPicked = 0;
                for(const entry in origList){
                    if(origList[entry].goodAnswers > highestValue){
                        highestValue = origList[entry].goodAnswers;
                        entryPicked = entry;
                    }
                }
                sortedList.push(origList[entryPicked]);
                origList.splice(entryPicked,1);
            }
        } else {
            // console.log("not there yet");
        }
        return sortedList
    }

    makeWeeklyAllAnswersToplist = () => {
        const origList = [];
        const sortedList = [];
        if(this.props.weeklyStat){
            for(const profile in this.props.weeklyStat[this.props.displayWeek]){
                origList.push(this.props.weeklyStat[this.props.displayWeek][profile])
            }
            let iter = 0;
            while(origList.length>0){
                let highestValue = 0;
                let entryPicked = 0;
                for(const entry in origList){
                    if(origList[entry].allAnswers > highestValue){
                        highestValue = origList[entry].allAnswers;
                        entryPicked = entry;
                    }
                }
                sortedList.push(origList[entryPicked]);
                origList.splice(entryPicked,1);
            }
        }
        return sortedList
    }

    makeWeeklyTimeSpentToplist = () => {
        const origList = [];
        const sortedList = [];

        if(this.props.weeklyStat){
            for(const profile in this.props.weeklyStat[this.props.displayWeek]){
                origList.push(this.props.weeklyStat[this.props.displayWeek][profile])
            }
            let iter = 0;
            while(origList.length>0){
                let highestValue = 0;
                let entryPicked = 0;
                for(const entry in origList){
                    if(origList[entry].timeSpent > highestValue){
                        highestValue = origList[entry].timeSpent;
                        entryPicked = entry;
                    }
                }
                sortedList.push(origList[entryPicked]);
                origList.splice(entryPicked,1);
            }
        }
        return sortedList
    }

    makeWeeklyRatioToplist = () => {
        const origList = [];
        const sortedList = [];

        if(this.props.weeklyStat){
            for(const profile in this.props.weeklyStat[this.props.displayWeek]){
                origList.push(this.props.weeklyStat[this.props.displayWeek][profile])
            }
            let iter = 0;
            while(origList.length>0){
                let highestValue = 0;
                let entryPicked = 0;
                for(const entry in origList){
                    const goodAnswers = origList[entry].goodAnswers;
                    const allAnswers = origList[entry].allAnswers;
                    if(allAnswers>0){
                        const ratio = goodAnswers/allAnswers;
                        if( ratio > highestValue){
                            highestValue = ratio;
                            entryPicked = entry;
                        }
                    }
                }
                sortedList.push(origList[entryPicked]);
                origList.splice(entryPicked,1);
            }
        }
        return sortedList
    }

    onPrevWeekHandler = () => {
        console.log('Previous week needed');
    }

    onNextWeekHandler = () => {
        console.log('Next week needed');
    }

    onThisWeekHandler = () => {
        console.log('This week needed');
    }
    
    render() {
        const overallGoodAnswersToplist = this.makeOverallGoodAnswersToplist();
        const overallAllAnswersToplist = this.makeOverallAllAnswersToplist();
        const overallRatioToplist = this.makeOverallRatioToplist();
        const overallTimeSpentToplist = this.makeOverallTimeSpentToplist();
        
        const weeklyGoodAnswersToplist = this.makeWeeklyGoodAnswersToplist();
        const weeklyAllAnswersToplist = this.makeWeeklyAllAnswersToplist();
        const weeklyRatioToplist = this.makeWeeklyRatioToplist();
        const weeklyTimeSpentToplist = this.makeWeeklyTimeSpentToplist();

        const showYear = this.props.displayWeek.split('-')[0];
        const showWeek = this.props.displayWeek.split('-')[1];

        return(
            <div className={classes.MainPage}>
                <div className={classes.Section}>
                    <div className={classes.Title}>
                        All Time Results
                    </div>
                    <div className={classes.Toplists}>
                        <Toplist title={'GOOD ANSWERS'} list={overallGoodAnswersToplist} isLoading={this.props.isUserProfilesLoading} />
                        <Toplist title={'ALL ANSWERS'} list={overallAllAnswersToplist} isLoading={this.props.isUserProfilesLoading} />
                        <Toplist title={'RATIO'} list={overallRatioToplist} isLoading={this.props.isUserProfilesLoading} />
                        <Toplist title={'TIME SPENT'} list={overallTimeSpentToplist} isLoading={this.props.isUserProfilesLoading} />
                    </div>
                </div>
                <div className={classes.Section}>
                    <div className={classes.HeaderWeekly}>
                        <div className={classes.TitleWeekly}>Weekly Results</div>
                        <div className={classes.WeekPicker}>
                            <i className="fa fa-chevron-left" aria-hidden="true" onClick={this.props.displayWeekDecrement}></i>
                            <div>{showYear} week {showWeek}</div>
                            <i className="fa fa-chevron-right" aria-hidden="true" onClick={this.props.displayWeekIncrement}></i>
                            <i className="fa fa-home" aria-hidden="true" onClick={this.props.displayWeekToCurrent}></i>
                        </div>
                    </div>
                    <div className={classes.Toplists}>
                        <Toplist title={'GOOD ANSWERS'} list={weeklyGoodAnswersToplist} isLoading={this.props.isWeeklyStatLoading} />
                        <Toplist title={'ALL ANSWERS'} list={weeklyAllAnswersToplist} isLoading={this.props.isWeeklyStatLoading} />
                        <Toplist title={'RATIO'} list={weeklyRatioToplist} isLoading={this.props.isWeeklyStatLoading} />
                        <Toplist title={'TIME SPENT'} list={weeklyTimeSpentToplist} isLoading={this.props.isWeeklyStatLoading} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userProfiles: state.stat.userProfiles,
        weeklyStat: state.stat.weeklyStat,
        currentWeek: state.stat.currentWeek,
        displayWeek: state.stat.displayWeek,
        isUserProfilesLoading: state.stat.isUserProfilesLoading,
        isWeeklyStatLoading: state.stat.isWeeklyStatLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayWeekIncrement: () => dispatch(actions.displayWeekIncrement()),
        displayWeekDecrement: () => dispatch(actions.displayWeekDecrement()),
        displayWeekToCurrent: () => dispatch(actions.displayWeekToCurrent())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainPage);