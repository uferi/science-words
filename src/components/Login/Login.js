import React, {Component} from 'react';

import classes from './Login.module.css';

const login = (props) => {
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

export default login;