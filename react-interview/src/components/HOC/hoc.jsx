import React, { useState } from 'react';
const style = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center'
}

const HocCounter = (Component) => {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                count: 0
            }
        }
        render() {
            const {count} = this.state;
            return (<div className="page-loader" style={style}>
                <Component inc={()=> this.setState({count: this.state.count+1})} state={count}/>
            </div>)
        }
    }
}
const ClicksCounter = (props) => {
    return (<>
        <button onClick={props.inc}>Cliked {props.state} times</button>
    </>
    )
}

const HoverCounter = (props) => {

    return (
        <div onMouseEnter={props.inc} >hovered {props.state} times</div>
    )
}

// we can achieve this using state-lifting. but if child are in deep hoc is better
export const HocComponent = HocCounter(HoverCounter);