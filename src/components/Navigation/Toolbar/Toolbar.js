import react from 'react';

import classes from './Toolbar.module.css';

import NavBar from '../NavBar/NavBar';


const toolbar = (props) => {

    return(
        <header className={classes.Toolbar}>
            <div>
                logo
            </div>
            <nav>
                <NavBar />
            </nav>
        </header>
    );
}

export default toolbar;