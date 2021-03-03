import React from 'react';

import classes from './Toolbar.module.css';

import NavBar from '../NavBar/NavBar';


const toolbar = (props) => {

    let wellcomeMessage = null;
    if(props.displayName !== ''){
        wellcomeMessage = (
            <div className={classes.Wellcome}>
               Wellcome <strong>{props.displayName}</strong>! Have a good time with practising!
            </div>
        )
    }

    return(
        <header className={classes.Toolbar}>
            <div>
                Science-Words 
            </div>
            {wellcomeMessage}
            <nav>
                <NavBar displayName={props.displayName}/>
            </nav>
        </header>
    );
}

export default toolbar;