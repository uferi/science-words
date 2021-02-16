import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Login.module.css';

import * as actions from '../../store/actions/index';

class Login extends Component {

    render() {

        this.props.onTestUserAction('Yay! I managed to send a message through redux to dispatch it with actions!');

        return (
            <div className={classes.Login}>
                <h3>Please Sign In!</h3>
                    <div>
                        <label>username:</label>
                        <input className={classes.UsernameInput} type="text" />
                    </div>
                    <div>
                        <label>password:</label>
                        <input className={classes.PasswordInput} type="password" />
                    </div>
                    <button className={classes.Button}>Sign in</button>
                    <div>
                        <p>Don't have an account yet?</p>
                        <a href="#" >Register now</a>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nickName: state.user.nickName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTestUserAction: (message) => dispatch(actions.userTestAction(message))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);