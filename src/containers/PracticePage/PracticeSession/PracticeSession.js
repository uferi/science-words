import React,{Component} from 'react';
import {connect} from 'react-redux';

import classes from './PracticeSession.module.css';

import PracticeItem from './PracticeItem/PracticeItem';

class PracticeSession extends Component {
    state = {
        words: [],
        scrambledWords: [],
        questionRemaining: 0,
        resultGoodAnswers: null,
        resultAllAnswers: null,
        resultElapsedTime: null,
        timer: null
    }

    componentDidMount() {
        const newWords = [];
        for(let i=this.props.practiceFrom; i<=this.props.practiceTo; i++){
            const key = 'word-' + i.toString().padStart(4, '0');
            const newWord = {
                id: i,
                eng: this.props.words[key].eng,
                hun: this.props.words[key].hun
            }
            newWords.push(newWord);
        }

        const scrambledWords = [];
        const scrambledOrigWords = [];
        const origWords = [...newWords];
        while(origWords.length){
            const rndElemId = Math.floor(Math.random()*origWords.length);
            scrambledOrigWords.push(origWords[rndElemId]);
            origWords.splice(rndElemId,1)
        }
        // console.log(scrambledOrigWords);
        for(let i=0; i<scrambledOrigWords.length; i++){
            const newEntry =
                {
                    id: scrambledOrigWords[i].id,
                    eng: scrambledOrigWords[i].eng,
                    hun: scrambledOrigWords[i].hun,
                    query: Math.random()>0.5 ? 'hun' : 'eng',
                    answer: ''
                }
            scrambledWords.push(newEntry);
        }
        for(let i=0; i<scrambledOrigWords.length; i++){
            const newEntry =
                {
                    id: scrambledOrigWords[i].id,
                    eng: scrambledOrigWords[i].eng,
                    hun: scrambledOrigWords[i].hun,
                    query: scrambledWords[i].query==='eng' ? 'hun' : 'eng',
                    answer: ''
                }
            scrambledWords.push(newEntry);
        }
        // console.log(scrambledWords);



        this.setState({
            words: newWords,
            scrambledWords: scrambledWords,
            questionRemaining: scrambledWords.length
        });

        this.autoCancelSession();
    }
    
    componentDidUpdate() {
        // console.log(this.props.words);
    }

    onAnswerChangedHandler = (event, id) => {
        // console.log(event.target.value, id);
        const newScrambledWords = [...this.state.scrambledWords];
        newScrambledWords[id].answer = event.target.value;
        let newRemainingAnswers = newScrambledWords.length
        for(let i=0; i<newScrambledWords.length; i++){
            if(newScrambledWords[i].answer !== ''){
                newRemainingAnswers -= 1;
            }
        }

        this.setState({
            scrambledWords: newScrambledWords,
            questionRemaining: newRemainingAnswers
        });
        this.autoCancelSession();
    }

    componentWillUnmount = () => {
        clearTimeout(this.state.timer);
    }

    autoCancelSession = () => {
        clearTimeout(this.state.timer);
        const timer = setTimeout(() => {
            // console.log('timer expired');
            this.props.onCancelSession();
        }, 120*1000)
        this.setState({timer: timer})
    }

    render() {

        const Items = this.state.scrambledWords.map( (word, i) => {
            let checkAnswer = false;
            if (this.props.isChecking){
                if( word.query === 'eng' ){
                    checkAnswer = (word.answer === word.eng) ? 'good':'wrong';
                }else{
                    checkAnswer = (word.answer === word.hun) ? 'good':'wrong';
                }
            }

            return (
                <PracticeItem 
                    key={i} 
                    id={i+1} 
                    word={word} 
                    query={word.query}
                    answer={word.answer}
                    // checkAnswer={i%3===0 ? 'wrong' : 'good'}
                    checkAnswer={checkAnswer} 
                    readOnly={this.props.isChecking} 
                    onChange={(event) => this.onAnswerChangedHandler(event,i)}
                    />
            )
        })


        let doneButton = null;
        let resultMessage = null;
        let titleMessage = null;
        if (!this.props.isChecking){
            titleMessage = 'Practice - Fill In The Missing Pieces';
            doneButton = (
                <div 
                    className={classes.ButtonCancel} 
                    onClick={() => this.props.onCheckItHandler(this.state.scrambledWords)} >
                        OK - I'm DONE! Check it please!
                </div>
            )
        } else {
            clearTimeout(this.state.timer);
            const minutes = Math.floor(this.props.resultElapsedTime/60000);
            const seconds = Math.floor((this.props.resultElapsedTime-minutes*60000)/1000)

            let message = '';
            const ratio = this.props.resultGoodAnswers/this.props.resultAllAnswers;
            if(ratio<=0.2){
                message = 'Practice more!'
            }
            if(ratio>0.2 && ratio<0.4){
                message = 'Try better next time!'
            }
            if(ratio>=0.4 && ratio<0.6){
                message = 'You did OK.'
            }
            if(ratio>=0.6 && ratio<0.8){
                message = 'Good job!'
            }
            if(ratio>=0.8){
                message = 'Perfect!'
            }

            resultMessage = (
                <div className={classes.ResultMessage}>
                    <span>
                        Good: {this.props.resultGoodAnswers} 
                    </span>
                    <span>
                        Total: {this.props.resultAllAnswers} 
                    </span>
                    <span>
                        Time: {(minutes) ? minutes +' min ' : null} { seconds + ' sec'}
                    </span>
                    <span>
                        - {message}
                    </span>
                </div>
            )
            titleMessage = 'Results';
        }
        
        return (
            <div className={classes.PracticeSession}>
                <div className={classes.Header}>
                    <div className={classes.Title}>{titleMessage}</div>
                    <div className={classes.ControlArea}>
                        {/* <div className={classes.RangeFromTitle} onClick={this.onClickFromHandler}>From</div> */}
                        {/* <input className={classes.RangeFromInput} type="number" onChange={this.onInputFromChangedHandler} readOnly value={this.state.inputFrom} ref={this.state.inputFromRef} /> */}
                        {/* <div className={classes.RangeToTitle} onClick={this.onClickToHandler}>To</div> */}
                        {/* <input className={classes.RangeToInput} type="number" onChange={this.onInputToChangedHandler} readOnly value={this.state.inputTo} ref={this.state.inputToRef} /> */}
                        {resultMessage}
                        {doneButton}
                        <div className={classes.ButtonCancel} onClick={this.props.onCancelSession}>{this.props.isChecking ? 'CONTINUE':'CANCEL SESSION'}</div>
                    </div>

                </div>
                <div className={classes.ListArea}>
                    <div className={classes.ListContainer}>
                        {Items}
                    {/* {spinner} */}
                    {/* {this.props.isWordsLoading ? spinner : entry} */}
                    </div>
                </div>
                <div className={classes.Footer}>
                    Questions Total: {this.state.words.length*2} - Remaining: {this.state.questionRemaining}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        practiceFrom: state.words.practiceFrom,
        practiceTo: state.words.practiceTo,
    }
}

export default connect(mapStateToProps)(PracticeSession);