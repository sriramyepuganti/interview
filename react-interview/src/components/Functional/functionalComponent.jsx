import React, { useState, useContext, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

const ThemeContext = React.createContext('light');

export const FunctionalCompoent = () => {
    const [integer, setInteger] = useState(0);
    const [arr, setArray] = useState([]);
    const [obj, setObj] = useState({});

    const Refernce = useRef(null);// useRef(1)=> {current:1}
    console.log('render')
    useEffect(() => {
        console.log("component did mount or did update");
        return () => {
            console.log("used to remove any subscription to eliminate memroy leak")
        }
    }, [integer]);//empty array means useeffect will not be excuted

    const readIt = (e) => {
        console.log(e);
        console.log(arr);
        Refernce.current.focus();
    }

    return (
        <>
            <ThemeContext.Provider value="dark">
                <div className="main">
                <div>parent component</div>

                    <div className="state">{integer}</div>
                    <button onClick={() => setInteger(integer + 1)}>update state</button>
                    <button onClick={() => setArray((oldValues) => [...oldValues, Math.random()])}>update Array</button>
                    {/* <button onClick={()=>setArray([1,2,3,4])}>update Array</button> */}
                    <button onClick={() => setObj({ id: 1 })}>update obj</button>
                    <ul>{arr.map((ele, index) => {
                        return (
                            <li key={index}>{ele}</li>
                        )
                    })}
                    </ul>
                    <div>{true && 'v-if or ng-if'}</div>
                    <div><input type="text" ref={Refernce} /></div>
                    <div><input type="text" ref={(ref) => ref && ref.focus()} /></div>
                    <hr />
                    <ChildComponent message="static message" emit={readIt} />
                </div>
            </ThemeContext.Provider>
        </>
    )
}

export const ChildComponent = (props) => {
    return (
        <>
            <div>child component</div>

            <div>{props.message}</div>
            <button onClick={() => props.emit("message from child")}>emit messgae</button>
            <hr />
            <SubChild />
        </>
    )
}

ChildComponent.propTypes = {
    message: propTypes.string
}

export const SubChild = () => {
    const theme = useContext(ThemeContext);
    const forwardRef = useRef(null);
    return (
        <>
            <div>subchild component</div>
            <div>{theme}</div>
            <hr />
            <Forward ref={forwardRef} />
            <button onClick={()=> forwardRef.current.focus()}>get forward ref</button>
        </>
    )
}

export const Forward = React.forwardRef((props, ref) => {
    return (
        <>
            <div>forward component</div>

            <input ref={ref}/>
        </>
    )
})