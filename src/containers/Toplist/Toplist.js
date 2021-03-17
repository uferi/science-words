import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Toplist.module.css';

class Toplist extends Component {
    state = {
        title: 'GOOD ANSWERS',
        list: []
    }

    constructor() {
        super();

        // for(let i=0; i<15; i++){
        //     const newEntry = {
        //         id: i+1,
        //         name: '...',
        //         value: 0
        //     }
        //     if( i === 0 ){
        //         newEntry.name = 'Laura';
        //         newEntry.value = 1200;
        //     }
        //     if( i === 1 ){
        //         newEntry.name = 'Hilda';
        //         newEntry.value = 750;
        //     }
            
        //     const newList = this.state.list;
        //     newList.push(newEntry)
        //     this.setState({list: newList})
        // }

        // console.log(this.state.list);
    }

    render() {
        let icon = null;
        let field = '';

        if( this.props.title === 'GOOD ANSWERS'){
            icon = '⭐';
            field = 'goodAnswers';
        }

        if( this.props.title === 'ALL ANSWERS'){
            icon = '⭐';
            field = 'allAnswers';
        }
        if( this.props.title === 'TIME SPENT'){
            // icon = '⏱';
            icon = '⌚';
            // icon = '<i className="fa fa-clock-o" aria-hidden="true"></i>';
            field = 'timeSpent';
        }
        // / this.props.title==='RATIO' ? ((entry['allAnswers']===0)? 0:(entry['goodAnswers']/entry['allAnswers']).toPrecision(2))  : entry[field] }</div>

        const List = this.props.list.map( (entry, i) => {

            let value = null;
            switch (this.props.title) {
                case 'GOOD ANSWERS':
                    value = entry.goodAnswers;
                    break;
                case 'ALL ANSWERS':
                    value = entry.allAnswers;
                    break;
                case 'RATIO':
                    if(entry.allAnswers>0){
                        value = (entry.goodAnswers/entry.allAnswers).toFixed(3);
                    }else{
                        value = 0;
                    }
                    break;
                case 'TIME SPENT':
                    value = (entry.timeSpent/60000).toFixed(1);
                    break;
                default:
                    break;
            }

            const entryClasses = [classes.Entry];
            const numberClasses = [classes.Number];
            const nameClasses = [classes.Name];
            const valueClasses = [classes.Value];
            if( entry.displayName === this.props.displayName){
                entryClasses.push(classes.Highlighted);
                numberClasses.push(classes.Highlighted);
                nameClasses.push(classes.Highlighted);
                valueClasses.push(classes.Highlighted);
            }
                        
            return (
                <div className={entryClasses.join(' ')} key={i}>
                    <div className={numberClasses.join(' ')}>{i+1}.</div>
                    <div className={nameClasses.join(' ')}>{entry.displayName}</div>
                    <div className={classes.ValueContainer}>
                        <div className={classes.IconGood}>{this.props.title==='GOOD ANSWERS' ? <i className="fa fa-star" aria-hidden="true"/>: null}</div>
                        <div className={classes.IconAll}>{this.props.title==='ALL ANSWERS' ? <i className="fa fa-book" aria-hidden="true"/>: null}</div>
                        <div className={classes.IconTime}>{this.props.title==='TIME SPENT' ? <i className="fa fa-clock-o" aria-hidden="true"/>: null}</div>
                        <div className={classes.IconRatio}>{this.props.title==='RATIO' ? <i className="fa fa-balance-scale" aria-hidden="true"/>: null}</div>
                        <div className={valueClasses.join(' ')}>{value}</div>
                            
                    </div>
                </div>
            )
        })

        const spinner = (
            <div className={classes.Spinner}>
                {/* <p>Loading</p> */}
                {/* <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> */}
                <i className="fa fa-cog fa-spin" aria-hidden="true"></i>
            </div>
        )

        return(
            <div className={classes.Toplist}>
                <div className={classes.Title}>
                    {this.props.title}
                </div>
                <div className={classes.ListArea}>
                    <div className={classes.ListContainer}>
                        {this.props.isLoading ? spinner : List}
                    </div>
                </div>
                <div className={classes.Footer}>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        displayName: state.auth.displayName
    }
}

export default connect(mapStateToProps)(Toplist);