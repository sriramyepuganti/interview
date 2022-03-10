import React, { Component } from 'react';
const style = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center'
}
const ThemeContext = React.createContext('light');

ThemeContext.displayName = "ContextDisplay";

export class ClassComponent extends Component {
    constructor(props) {
        super(props);// use super otherwise will throw error
        console.log("constructor");
        this.withBind = this.withBind.bind(this);
        this.state = {
            arr: [],
            integer: 1
        }
        this.refName = React.createRef();
    }
    withBind() {
        console.log(this);// it will give ClassComponent reference
    }
    withOutBind() {
        console.log(this);//it will give undefined
    }
    withES6 = () => {
        console.log(this); // it will give ClassComponent reference
    }
    messageFromChild = (e) => {
        console.log(e)
    }
    updateArray = () => {
        this.setState({ integer: this.state.integer + 1 })
        this.setState((state, props) => {
            return state.arr.push(2)
        });
        console.log(this.refName.current.outerText);
    }


    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps()");
        console.log(props);
        console.log(state);
        return null
    }

    componentDidMount() {
        console.log("component did mount");
    }
    componentDidUpdate() {
        console.log("component did update")
    }
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate ")
        return true
    }

    getSnapshotBeforeUpdate(prevprop, prevstate) {
        console.log("getSnapshotBeforeUpdate");
        console.log(prevprop);
        console.log(prevstate);
        return null;
    }
    componentWillUnmount() {
        console.log("component will unmount");
    }
    render() {
        console.log("render")
        // component should have render, otherwise it will throw error
        return (
            <div style={style}>
                <ThemeContext.Provider value="dark1">
                    <div>Parent compoent</div>
                    <div className="test">hello world</div>
                    <button onClick={this.withBind}>withBind</button>
                    <button onClick={this.withOutBind}>withOutBind</button>
                    <button onClick={this.withES6}>withES6</button>
                    <button onClick={this.updateArray}>update state + {this.state.integer}</button>
                    <div ref={this.refName}>normal ref</div>
                    <input type="text" ref={(ref)=> ref && ref.focus()} /> {/* call back ref can be used for dynamic purpose */}
                    <hr />
                    <ChildComponent data="parentToChild" emitEvent={this.messageFromChild}></ChildComponent>
                    <hr/>
                    <ConsumerContext />
                </ThemeContext.Provider>
            </div>
        )
    }
}

export class ChildComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <div>Child Component</div>
                <div>{this.props.data}</div>
                <button onClick={() => this.props.emitEvent("message from  child")}>send message</button>
                <hr />
                <SubChildComponent></SubChildComponent>
            </>
        )
    }
}

export class SubChildComponent extends Component {
    constructor(props) {
        super(props);
        this.customForwardRef = React.createRef();
    }
    static contextType = ThemeContext;
    render() {
        return (
            <>  <div>sub child compoent</div>
                <div>{this.context}</div>
                <button onClick={()=> this.customForwardRef.current.focusInput()}>focus on forward component</button>
                <ForwardRef ref={this.customForwardRef}></ForwardRef>
            </>
        )
    }
}
// ref can be sent to class compoents, for functional compoents use forwardRef function
export class  ForwardRef extends React.Component {
    constructor(props) {
        super(props);
        this.customForwardRef = React.createRef();
    }

    focusInput(){
        this.customForwardRef.current.focus();
    }

    render(){
    return (
        <>
        <div>Forward Ref compoent</div>
        <input ref={this.customForwardRef}/>
        </>
    )
    }
}

export class ConsumerContext extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {
                    (theme) => {
                        return (theme)
                    }
                }
            </ThemeContext.Consumer>
        )
    }
}