import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavItem.module.css';

const navItem = (props) => {
    return (
        <li className={classes.NavItem}>
            {/* <a href="#">{props.title}</a> */}
            <NavLink 
            className={classes.NavLink}
                exact 
                to={props.path} 
                activeClassName={classes.Active}
            >
                {props.title}
            </NavLink>
        </li>
    )
}

export default navItem;