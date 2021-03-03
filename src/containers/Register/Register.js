import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Register.module.css';

import * as actions from '../../store/actions/index';

class Register extends Component {
    state = {
        nickName: '',
        email: '',
        password: '',
        isSignup: true
    }

    onNickNameChangedHandler = (event) => {
        const newNickName = event.target.value;
        // console.log(newNickName);
        this.setState({
            nickName: newNickName
        });
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

    onRegisterHandler = () => {
        this.props.onAuth(
            {
                email: this.state.email,
                password: this.state.password,
                isSignup: this.state.isSignup,
                nickName: this.state.nickName,
                history: this.props.history
            }
        )
        // this.props.history.push('/auth');
        // console.log(this.state);


        
    }

    render() {

        // this.props.onTestUserAction('Yay! I managed to send a message through redux to dispatch it with actions!');

        const spinner = (
            <div>
                <p>Loading</p>
                {/* <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> */}
                <i className="fa fa-cog fa-spin" aria-hidden="true"></i>
            </div>
        )

        return (
            <div className={classes.Register}>
                <div className={classes.Title}>
                    <h3>Register New User!</h3>
                    {this.props.isLoading ? spinner : null}
                </div>
                <div>
                    <label>nickname:</label>
                    <input 
                        className={classes.UsernameInput} 
                        type="text" 
                        onChange={this.onNickNameChangedHandler} 
                        value={this.state.nickName}
                    />
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
                        type="password" 
                        onChange={this.onPasswordChangedHandler} 
                        value={this.state.password}
                    />
                </div>
                <button className={classes.Button} onClick={this.onRegisterHandler}>Register</button>
                <div>
                    <p>If you have an account already: </p>
                    {/* <a href="#" >Register now</a> */}
                    <NavLink to="/auth">Sign In</NavLink>
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
        onAuth: (data) => dispatch(actions.auth(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);