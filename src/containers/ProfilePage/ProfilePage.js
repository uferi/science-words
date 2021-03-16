import React,{Component} from 'react';
import { connect } from "react-redux";

import classes from './ProfilePage.module.css';

class ProfilePage extends Component {
    state={
        selectedWeek: null,
        weeklyStat: []
    }

    componentDidMount() {
        // console.log('did mount');
        // console.log('localId: ',this.props.localId);
        // console.log(this.props.currentWeek);
        const newWeeklyStat = [];
        let newSelectedWeek = 0;
        for(let i in this.props.weeklyStat){
            // console.log('checking week: ',i);
            for(let j in this.props.weeklyStat[i]){
                if( j === this.props.localId){
                    // console.log('in week: ', i, 'found entry: ',j);
                    const item = {
                        week: i,
                        ...this.props.weeklyStat[i][j]
                    };
                    // console.log(item);
                    newWeeklyStat.push(item);
                }
            }
        }
        for( let i=0; i<newWeeklyStat.length; i++){
            if(newWeeklyStat[i].week === this.props.currentWeek){
                newSelectedWeek = i;
            }
        }
        // console.log('updated selection', newSelectedWeek);
        // console.log('collected stats: ', newWeeklyStat);
        this.setState({
            selectedWeek: newSelectedWeek,
            weeklyStat: newWeeklyStat
        })
    }

    componentWillUnmount() {
        this.setState({
            selectedWeek: null,
            weeklyStat: []
        })
    }

    onWeekClickedHandler = (id) => {
        // console.log('item clicked:', id);
        this.setState({
            selectedWeek: id
        })
    }

    render() {

        const weekList = this.state.weeklyStat.map( (item,i) => {
            let itemClasses = [classes.WeekItem];
            if( i === this.state.selectedWeek){
                itemClasses.push(classes.Selected)
            }

            return (
                <div 
                    key={i} 
                    className={itemClasses.join(' ')} 
                    onClick={()=>this.onWeekClickedHandler(i)} >
                        {item.week}
                </div>
            )
        })
        
        const displayWeekData = {...this.state.weeklyStat[this.state.selectedWeek]};
        let allTimeRatio = 0;
        let displayWeekRatio = 0;
        let displayWeekTimeSpent = (displayWeekData.timeSpent/1000/60).toFixed(1);
        if(this.props.userProfiles[this.props.localId].allAnswers !== 0) {
            allTimeRatio = (this.props.userProfiles[this.props.localId].goodAnswers / this.props.userProfiles[this.props.localId].allAnswers).toFixed(3);
        }
        if(displayWeekData.allAnswers !== 0){
            displayWeekRatio = (displayWeekData.goodAnswers/displayWeekData.allAnswers).toFixed(3);
        }
        if(this.state.weeklyStat.length === 0){
            displayWeekRatio = '';
            displayWeekTimeSpent = '';
        }
        
        // console.log(displayWeekData.week);

        return (
            <div className={classes.ProfilePage}>
                <div className={classes.Title}>
                    Profile
                </div>
                <div className={classes.BasicInfo}>
                    <div className={classes.Entry}>
                        <div className={classes.EntryName}>name: </div>
                        <div className={classes.EntryValue}>{this.props.displayName}</div>
                    </div>
                    <div className={classes.Entry}>
                        <div className={classes.EntryName}>email: </div>
                        <div className={classes.EntryValue}>{this.props.email}</div>
                    </div>
                </div>
                <div className={classes.StatSection}>
                    <div className={classes.AllTimeStat}>
                        <div className={classes.InnerTitle}>
                            All Time Stat
                        </div>
                        <div className={classes.AllTimeResult}>
                            <div className={classes.Entry}>
                                <div className={classes.EntryName}>Good Answers: </div>
                                <div className={classes.IconGood}><i className="fa fa-star" aria-hidden="true"/></div>
                                <div className={classes.EntryValue}>{this.props.userProfiles[this.props.localId].goodAnswers}</div>
                            </div>
                            <div className={classes.Entry}>
                                <div className={classes.EntryName}>All Answers: </div>
                                <div className={classes.IconAll}><i className="fa fa-book" aria-hidden="true"/></div>
                                <div className={classes.EntryValue}>{this.props.userProfiles[this.props.localId].allAnswers}</div>
                            </div>
                            <div className={classes.Entry}>
                                <div className={classes.EntryName}>Ratio: </div>
                                <div className={classes.IconRatio}><i className="fa fa-balance-scale" aria-hidden="true"/></div>
                                <div className={classes.EntryValue}>{allTimeRatio}</div>
                            </div>
                            <div className={classes.Entry}>
                                <div className={classes.EntryName}>Time Spent: </div>
                                <div className={classes.IconTime}><i className="fa fa-clock-o" aria-hidden="true"/></div>
                                <div className={classes.EntryValue}>{(this.props.userProfiles[this.props.localId].timeSpent/1000/60).toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.WeeklyStat}>
                        <div className={classes.InnerTitle}>
                            Weekly Results
                        </div>
                        <div className={classes.WeeklyStatContainer}>
                            <div className={classes.WeekList}>
                                {/* <div className={classes.WeekItem}>2021-10</div> */}
                                {weekList}
                            </div>
                            <div className={classes.WeeklyResult}>
                                <div className={classes.Entry}>
                                    <div className={classes.EntryName}>Good Answers: </div>
                                    <div className={classes.IconGood}><i className="fa fa-star" aria-hidden="true"/></div>
                                    <div className={classes.EntryValue}>{displayWeekData.goodAnswers}</div>
                                </div>
                                <div className={classes.Entry}>
                                    <div className={classes.EntryName}>All Answers: </div>
                                    <div className={classes.IconAll}><i className="fa fa-book" aria-hidden="true"/></div>
                                    <div className={classes.EntryValue}>{displayWeekData.allAnswers}</div>
                                </div>
                                <div className={classes.Entry}>
                                    <div className={classes.EntryName}>Ratio: </div>
                                    <div className={classes.IconRatio}><i className="fa fa-balance-scale" aria-hidden="true"/></div>
                                    <div className={classes.EntryValue}>{displayWeekRatio}</div>
                                </div>
                                <div className={classes.Entry}>
                                    <div className={classes.EntryName}>Time Spent: </div>
                                    <div className={classes.IconTime}><i className="fa fa-clock-o" aria-hidden="true"/></div>
                                    <div className={classes.EntryValue}>{displayWeekTimeSpent}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        userProfiles: state.stat.userProfiles,
        weeklyStat: state.stat.weeklyStat,
        displayName: state.auth.displayName,
        email: state.auth.email,
        localId: state.auth.localId,
        currentWeek: state.stat.currentWeek
    }
}

export default connect(mapStateToProp)(ProfilePage)