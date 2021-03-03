import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render() {

        return(
            <React.Fragment>
                <Toolbar displayName={this.props.displayName} />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        displayName: state.auth.displayName
    }
}

export default connect(mapStateToProps)(Layout);