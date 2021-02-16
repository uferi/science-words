import React from 'react';

import classes from './NavBar.module.css';

import NavItem from './NavItem/NavItem';

const navBar = (props) => {
    return(
        <ul className={classes.NavBar}>
            <NavItem title='Home'/>
            <NavItem title='Practice'/>
            <NavItem title='Sign in'/>
        </ul>
    )
}

export default navBar;