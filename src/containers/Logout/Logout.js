import React,{ Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

import classes from "./Logout.module.css";

class Logout extends Component {

    onButtonClickedHandler = () => {
        // console.log('clicked');
        this.props.logout();
    }

    render() {

        return (
            <div className={classes.Logout}>
                <div className={classes.Title}>
                    Logout
                </div>
                <div className={classes.Message}>
                    So you are done with learnig for now, huh ?
                </div>
                <div className={classes.Button} onClick={this.onButtonClickedHandler}>
                    Yeah! - My head is about to blow up! See ya...
                    {/* Yes! - I would really like to leave! */}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);