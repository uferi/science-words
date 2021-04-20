import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Login.module.css';

import * as actions from '../../store/actions/index';

import MessageModal from '../MessageModal/MessageModal';
import PasswordResetModal from './PasswordResetModal/PasswordResetModal';

class Login extends Component {
    state = {
        nickName: '',
        email: '',
        password: '',
        isSignup: false,
        showPassword: false,
        resetPasswordModal: false
    }

    componentDidMount(){
        // this.setState(
        //     {
        //         email: 'baboca@baboca.com',
        //         password: 'baboca4242',
        //     }
        // )
        // this.setState(
        //     {
        //         email: 'test2@test2.com',
        //         password: 'test24242',
        //     }
        // )
    }

    onEmailChangedHandler = (event) => {
        const newEmail = event.target.value;
        this.setState({
            email: newEmail
        });
    }

    onPasswordChangedHandler = (event) => {
        const newPassword = event.target.value;
        this.setState({
            password: newPassword
        });
    }

    onSignInHandler = () => {
        this.props.onAuth(
            {
                email: this.state.email,
                password: this.state.password,
                isSignup: this.state.isSignup,
                nickName: this.state.nickName,
                history: this.props.history
            }
        )
        // this.props.fetchUserProfiles();
    }

    onPasswordKeyDown = (event) => {
         if(event.key==='Enter'){
             this.onSignInHandler();
         }        
    }

    onShowPasswordHandler = () => {
        this.setState({showPassword: !this.state.showPassword});
    }

    onForgotPasswordHandler = () => {
        // console.log('Forgot password - huh?');
        this.setState({resetPasswordModal: true});
    }

    onForgotPasswordCancelHandler = () => {
        // console.log('False alarm - huh?');
        this.setState({resetPasswordModal: false});
    }

    render() {

        const spinner = (
            <div>
                <p>Loading</p>
                {/* <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> */}
                <i className="fa fa-cog fa-spin" aria-hidden="true"></i>
            </div>
        )

        let resetModal = null;
        if (this.state.resetPasswordModal){
            resetModal = (
                <PasswordResetModal
                    email={this.state.email} 
                    onCancel={this.onForgotPasswordCancelHandler} />
            )
        }

        return (
            <div className={classes.Login}>
                <MessageModal />
                {resetModal}
                <div className={classes.Title}>
                    <h3>Please Sign In!</h3>
                    {this.props.isLoading ? spinner : null}
                </div>
                <div>
                    <label>email:</label>
                    <input 
                        className={classes.UsernameInput} 
                        type="email" 
                        onChange={this.onEmailChangedHandler}
                        value={this.state.email}
                    />
                </div>
                <div>
                    <label>password:</label>
                    <input 
                        className={classes.PasswordInput} 
                        type={this.state.showPassword ? "test" : "password"} 
                        onChange={this.onPasswordChangedHandler} 
                        onKeyDown={this.onPasswordKeyDown}
                        value={this.state.password}
                    />
                </div>
                <div className={classes.ShowPassword} onClick={this.onShowPasswordHandler}>Show Password</div>
                <button className={classes.Button} onClick={this.onSignInHandler}>Sign In</button>
                <div className={classes.ForgotPassword} onClick={this.onForgotPasswordHandler}>(Oh man! - I Forgot My Password!)</div>
                <div>
                    <p>Don't have an account yet?</p>
                    {/* <a href="#" >Register now</a> */}
                    <NavLink to="/register">Register now</NavLink>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nickName: state.user.nickName,
        isLoading: state.auth.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (data) => dispatch(actions.auth(data)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);