import React, { Component } from 'react';

import classes from './Toplist.module.css';

class Toplist extends Component {
    state = {
        title: 'GOOD ANSWERS',
        list: []
    }

    constructor() {
        super();
        for(let i=0; i<15; i++){
            const newEntry = {
                id: i+1,
                name: '...',
                value: 0
            }
            if( i === 0 ){
                newEntry.name = 'Laura';
                newEntry.value = 1200;
            }
            if( i === 1 ){
                newEntry.name = 'Hilda';
                newEntry.value = 750;
            }
            
            const newList = this.state.list;
            newList.push(newEntry)
            this.setState({list: newList})
        }
        // console.log(this.state.list);
    }

    render() {
        const icon = '⭐';
        // const icon = '⏱';

        const List = this.state.list.map(entry => {
            return (
                <div className={classes.Entry} key={entry.id}>
                    <div className={classes.Number}>{entry.id}.</div>
                    <div className={classes.Name}>{entry.name}</div>
                    <div className={classes.ValueContainer}>
                        <div>{icon}</div>
                        <div  className={classes.Value}>{entry.value}</div>
                    </div>
                </div>
            )
        })


        return(
            <div className={classes.Toplist}>
                <div className={classes.Title}>
                    {this.state.title}
                </div>
                <div className={classes.ListArea}>
                    {List}
                </div>
            </div>
        );
    };
}

export default Toplist;