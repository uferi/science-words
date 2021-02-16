import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './UserProfile.module.css';

class UserProfile extends Component {
    render() {
        return (
            <div className={classes.UserProfile}>
                <div className={classes.NickName}>{this.props.nickName}</div>
                <div className={classes.FullName}>( {this.props.firstName} {this.props.lastName} )</div>
                <div className={classes.Stat}>⭐: {this.props.statAnswersGood}</div>
                <div className={classes.Stat}>🧭: {(this.props.statTimePracticed/60).toFixed(1)} min</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nickName: state.user.nickName,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        statAnswersGood: state.user.statAnswersGood,
        statTimePracticed: state.user.statTimePracticed,
    }
}


export default connect(mapStateToProps)(UserProfile);