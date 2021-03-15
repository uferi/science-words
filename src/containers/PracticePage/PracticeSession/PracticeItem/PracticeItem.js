import React,{Component} from 'react';

import classes from './PracticeItem.module.css';

class PracticeItem extends Component {

    render() {

        let engClasses = [classes.Eng];
        let hunClasses = [classes.Hun]
        let engElement = null;
        let hunElement = null;
        let engTooltip = null;
        let hunTooltip = null;

        if(this.props.query === 'eng'){
            engElement = (<input className={classes.Input} type="text" onChange={this.props.onChange} readOnly={this.props.readOnly} />)
            hunElement = (<div className={classes.Label}>{this.props.word.hun}</div>);
            if(this.props.checkAnswer === 'good'){
                engClasses.push(classes.AnswerGood);
            }
            else if (this.props.checkAnswer === 'wrong') {
                engClasses.push(classes.AnswerWrong);
                engTooltip = (<span className={classes.TooltipText}>{this.props.word.eng}</span>);
            } else {
                if(this.props.answer===''){
                    engClasses.push(classes.Query);
                } else {
                    engClasses.push(classes.QueryFilled);
                }
            }
        }
        if(this.props.query === 'hun'){
            engElement = (<div className={classes.Label}>{this.props.word.eng}</div>);
            hunElement = (<input className={classes.Input} type="text" onChange={this.props.onChange} readOnly={this.props.readOnly} />)
            if(this.props.checkAnswer === 'good'){
                hunClasses.push(classes.AnswerGood);
            }
            else if (this.props.checkAnswer === 'wrong') {
                hunClasses.push(classes.AnswerWrong);
                hunTooltip = (<span className={classes.TooltipText}>{this.props.word.hun}</span>);
            } else {
                if(this.props.answer===''){
                    hunClasses.push(classes.Query);
                } else {
                    hunClasses.push(classes.QueryFilled);
                }
            }
        }


        return (
            <div className={classes.PracticeItem}>
                <div className={classes.Id}>
                    {this.props.id}
                </div>
                <div className={classes.Wordblock}>
                    <div className={engClasses.join(' ')}>
                        <div className={classes.TooltipEng}>
                            {engElement}
                            {engTooltip}
                        </div>
                    </div>
                    <i className="fa fa-minus" aria-hidden="true"></i>
                    <div className={hunClasses.join(' ')}>
                        <div className={classes.TooltipHun}>
                            {hunElement}
                            {hunTooltip}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PracticeItem;