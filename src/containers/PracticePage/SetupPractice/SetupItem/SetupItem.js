import React, {Component} from 'react';

import classes from './SetupItem.module.css';

class SetupItem extends Component {

    render() {

        let rootClasses = [classes.SetupItem];
        if(this.props.isSelected){
            rootClasses.push(classes.Selected);
        }
        if(this.props.highlighted === this.props.item.id){
            rootClasses.push(classes.Highlighted);
        }

        return (
            <div className={rootClasses.join(' ')} onClick={()=>this.props.clicked()}>
                <div className={classes.Id}>
                    {this.props.item.id}
                </div>
                <div className={classes.WordPair}>
                    <div className={classes.Eng}>
                        {this.props.item.eng}
                    </div>
                    {/* <i className="fa fa-arrows-h" aria-hidden="true"></i> */}
                    <i className="fa fa-minus" aria-hidden="true"></i>
                    <div className={classes.Hun}>
                        {this.props.item.hun}
                    </div>

                </div>
            </div>
        )
    }
}

export default SetupItem;