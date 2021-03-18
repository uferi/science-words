import React, {Component,Ref} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './SetupPractice.module.css';

import SetupItem from './SetupItem/SetupItem';

class SetupPractice extends Component {
    state = {
        inputFrom: '',
        inputTo: '',
        words: [],
        totalWords: 0,
        highlighted: null,
        inputFromRef: null,
        inputToRef: null
    }

    componentDidMount() {
        this.componentDidUpdate();
        if(!this.state.inputToRef){
            this.setState(
                {
                    inputFromRef: React.createRef(),
                    inputToRef: React.createRef()
                }
            )
        }        
    }

    componentDidUpdate = () => {
        const newWords = [];
        if(this.props.words && this.state.words.length===0){
            for(const entry in this.props.words){
                const word = {
                    id: +entry.split('-')[1],
                    eng: this.props.words[entry].eng,
                    hun: this.props.words[entry].hun
                }
                // console.log(+entry.split('-')[1]);
                // console.log(this.props.words[entry]);
                // newWords[entry]=this.props.words[entry];
                newWords.push(word);
            }
            if(this.props.practiceFrom && this.props.practiceTo){
                this.setState({
                    inputFrom: this.props.practiceFrom,
                    inputTo: this.props.practiceTo,
                    words: newWords,
                    totalWords: newWords.length
                })
            } else {
                this.setState({
                    inputFrom: '1',
                    inputTo: newWords.length,
                    words: newWords,
                    totalWords: newWords.length
                })
            }
        }

        this.props.saveRange(
            {
                from: this.state.inputFrom,
                to: this.state.inputTo
            }
        )
        
        if(this.state.inputFromRef){
            this.state.inputFromRef.current.value = this.state.inputFrom;
        }
        if(this.state.inputToRef){
            this.state.inputToRef.current.value = this.state.inputTo;
        }
        
    }

    onInputFromChangedHandler = (event) => {
        // console.log('from:',event.target.value);
        let newFrom = +event.target.value;
        let newTo = +this.state.inputTo;
        if(newFrom === 0){
                newFrom = +this.state.inputFrom;
            }
        if(newFrom<1){
            newFrom = 1;
        }
        if(newFrom>this.state.totalWords){
            newFrom = this.state.totalWords;
        }
        if(newTo<newFrom){
            newTo = newFrom;
        }
        this.setState({
            inputFrom: newFrom,
            inputTo: newTo
        })
    }

    onInputFromKeyDown = (event) => {
        if(event.key==='Enter'){
            let newFrom = +this.state.inputFromRef.current.value;
            let newTo = +this.state.inputTo;
            if(newFrom === 0){
                newFrom = +this.state.inputFrom;
            }
            if(newFrom<1){
                newFrom = 1;
            }
            if(newFrom>this.state.totalWords){
                newFrom = this.state.totalWords;
            }
            if(newTo<newFrom){
                newTo = newFrom;
            }
            this.setState({
                inputFrom: newFrom,
                inputTo: newTo
            })
        }
    }

    onInputToChangedHandler = (event) => {
        // console.log('to:',event.target.value);
        let newFrom = +this.state.inputFrom;
        let newTo = +event.target.value;
        if(newTo === 0){
                newTo = +this.state.inputTo;
            }
        if(newTo<1){
            newTo = 1;
        }
        if(newTo>this.state.totalWords){
            newTo = this.state.totalWords;
        }
        if(newTo<newFrom){
            newFrom = newTo;
        }
        this.setState({
            inputFrom: newFrom,
            inputTo: newTo
        })
    }

    onInputToKeyDown = (event) => {
        if(event.key==='Enter'){
            let newFrom = +this.state.inputFrom;
            let newTo = +this.state.inputToRef.current.value;
            if(newTo === 0){
                newTo = +this.state.inputTo;
            }
            if(newTo<1){
                newTo = 1;
            }
            if(newTo>this.state.totalWords){
                newTo = this.state.totalWords;
            }
            if(newTo<newFrom){
                newFrom = newTo;
            }
            this.setState({
                inputFrom: newFrom,
                inputTo: newTo
            })
        }
    }

    onItemClickedHandler = (itemId) => {
        // console.log('clicked item id: ',itemId);
        if(this.state.highlighted === itemId){
            this.setState({
                highlighted: null
            })
        } else {
            this.setState({
                highlighted: itemId
            })
        }
    }

    onClickFromHandler = () => {
        if(this.state.highlighted){
            let newFrom = this.state.highlighted;
            let newTo = +this.state.inputTo;
            if(newFrom<1){
                newFrom = 1;
            }
            if(newFrom>this.state.totalWords){
                newFrom = this.state.totalWords;
            }
            if(newTo<newFrom){
                newTo = newFrom;
            }
            this.setState({
                inputFrom: newFrom,
                inputTo: newTo,
                highlighted: null
            })
        }
    }

    onClickToHandler = () => {
        if(this.state.highlighted){
            let newFrom = +this.state.inputFrom;
            let newTo = this.state.highlighted;
            if(newTo<1){
                newTo = 1;
            }
            if(newTo>this.state.totalWords){
                newTo = this.state.totalWords;
            }
            if(newTo<newFrom){
                newFrom = newTo;
            }
            this.setState({
                inputFrom: newFrom,
                inputTo: newTo,
                highlighted: null
            })
        }
    }

    onBeginClickedHandler = () => {
        // console.log(this.state.inputFromRef);
        // this.state.inputFromRef.current.value = '3';
        // console.log('practice should begin from: ', this.state.inputFrom, ' to: ', this.state.inputTo);
        this.props.onBeginSession();
    }

    render() {

        // const words = this.prepareWords(this.props.words);
        const words = [...this.state.words];
        // console.log(words);

        let entry = null;
        if(words.length>0){
            entry = words.map( (item,i) => {
                let isSelected = false;
                const idFrom = +this.state.inputFrom;
                const idTo = +this.state.inputTo;
                if( item.id >= idFrom && item.id <= idTo){
                    isSelected = true;
                }
                return (
                    <SetupItem 
                        key={item.id} 
                        item={item}
                        isSelected={ isSelected ? true : false } 
                        clicked={()=>this.onItemClickedHandler(item.id)} 
                        highlighted={this.state.highlighted} />
                )
            })
        }

        const spinner = (
            <div className={classes.Spinner}>
                <i className="fa fa-cog fa-spin" aria-hidden="true"></i>
            </div>
        )

        let classesButtonFrom = [classes.RangeFromTitle];
        let classesButtonTo = [classes.RangeToTitle];
        if(this.state.highlighted){
            classesButtonFrom.push(classes.Highlighted);
            classesButtonTo.push(classes.Highlighted);
        }

        const selected = (+this.state.inputTo) - (+this.state.inputFrom) + 1;

        return (
            <div className={classes.SetupPractice}>
                <div className={classes.Header}>
                    <div className={classes.Title}>Setup Practice Session</div>
                    <form className={classes.ControlArea}>
                        <div className={classesButtonFrom.join(' ')} onClick={this.onClickFromHandler}>From</div>
                        <input 
                            className={classes.RangeFromInput} 
                            type="number" 
                            onBlur={this.onInputFromChangedHandler} 
                            onKeyDown={this.onInputFromKeyDown} ref={this.state.inputFromRef} />
                        <div className={classesButtonTo.join(' ')} onClick={this.onClickToHandler}>To</div>
                        <input 
                            className={classes.RangeToInput} 
                            type="number" 
                            onBlur={this.onInputToChangedHandler} 
                            onKeyDown={this.onInputToKeyDown} 
                            ref={this.state.inputToRef} />
                        <div className={classes.ButtonBegin} onClick={this.onBeginClickedHandler}>BEGIN PRACTICE SESSION</div>
                    </form>

                </div>
                <div className={classes.ListArea}>
                    <div className={classes.ListContainer}>
                    {/* {spinner} */}
                    {this.props.isWordsLoading ? spinner : entry}
                    </div>
                </div>
                <div className={classes.Footer}>
                    Total Words: {words.length} - Selected: {selected}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        practiceFrom: state.words.practiceFrom,
        practiceTo: state.words.practiceTo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveRange: (range) => dispatch(actions.setPracticeRange(range))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SetupPractice);