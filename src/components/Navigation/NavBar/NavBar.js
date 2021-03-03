import React from 'react';

import classes from './NavBar.module.css';

import NavItem from './NavItem/NavItem';

const navBar = (props) => {

    let authText = 'Sign In';
    if(props.displayName !== ''){
        authText = 'Log Out';
    }

    return(
        <ul className={classes.NavBar}>
            <NavItem path ="/" title='Home'/>
            <NavItem path="/practice" title='Practice'/>
            <NavItem path="/profile" title='Profile'/>
            <NavItem path="/auth" title={authText}/>
        </ul>
    )
}

export default navBar;