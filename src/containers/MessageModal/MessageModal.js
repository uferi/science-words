import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MessageModal.module.css';

import * as actionTypes from '../../store/actions/index';

class MessageModal extends Component {

    render() {

        let buttonOk = (
            <div className={classes.Button} onClick={this.props.messageClear}>
                        Ok
            </div>
        )

        let fullContent = null;
        if(this.props.messages.length){

            const currentMessage = this.props.messages[0];
            const titleClasses = [classes.Title];
            const messageClasses = [classes.Message];
            const messageModalClasses = [classes.MessageModal];
            const footerClasses = [classes.Footer];

            if(currentMessage.isError){
                titleClasses.push(classes.Error);
                messageModalClasses.push(classes.Error);
                messageClasses.push(classes.Error);
                footerClasses.push(classes.Error);
            }

            let detailContent = null;
            if(currentMessage.detail.length){
                detailContent = (
                    <div className={classes.Detail}>
                            {currentMessage.detail}
                    </div>
                )
            }

            fullContent = (
                <div className={classes.MainContainer}>
                    <div className={messageModalClasses.join(' ')}>
                        <div className={titleClasses.join(' ')}>
                            System Message
                        </div>
                        <div className={messageClasses.join(' ')}>
                            {currentMessage.message}
                        </div>
                        {detailContent}
                        <div className={footerClasses.join(' ')}>
                            {buttonOk}
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <React.Fragment>
                {fullContent}
            </React.Fragment>
        )
    }
}

const mapSateToProps = state => {
    return {
        messages: state.user.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        messageClear: () => dispatch(actionTypes.userMessageClear())
    }
}

export default connect(mapSateToProps,mapDispatchToProps)(MessageModal);