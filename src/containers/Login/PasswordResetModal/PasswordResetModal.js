import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './PasswordResetModal.module.css';

import * as actionTypes from '../../../store/actions/index';

class PasswordResetModal extends Component {
    
    state = {
        email: ''
    }

    componentDidMount() {
        this.setState({
            email: this.props.email
        })
    }

    onInputChangedhandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    onAcceptClickedHandler = () => {
        // console.log('email: ' + this.state.email);
        const data = {
            email: this.state.email
        }
        this.props.authPasswordReset(data)
        this.props.onCancel();
    }

    render() {

        return(
                <div className={classes.MainContainer}>
                    <div className={classes.MessageModal}>
                        <div className={classes.Title}>
                            Reset Password
                        </div>
                        <div className={classes.Message}>
                            Fill in your email address please!
                        </div>
                        <input type="email" onChange={this.onInputChangedhandler} value={this.state.email}/>
                        <div className={classes.Footer}>
                            <div className={classes.Button} onClick={this.onAcceptClickedHandler} >Send</div>
                            <div className={classes.Button} onClick={this.props.onCancel}>Cancel</div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapSateToProps = state => {
    return {
        messages: state.user.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authPasswordReset: (data) => dispatch(actionTypes.authPasswordReset(data))
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(PasswordResetModal);