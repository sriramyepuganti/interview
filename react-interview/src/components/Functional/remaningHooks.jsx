import React, { useState, useReducer, useCallback, useMemo, useEffect, useImperativeHandle, useRef, useLayoutEffect, useDebugValue } from 'react';

// use reducer
function init(initialCount) {
    return { count: initialCount };
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return init(action.payload)
        default:
            throw new Error();
    }
}

const initialState = {
    count: 0
}
// usecallback


export const Hooks = ({ initialCount }) => {
    console.log('render');
    const [state, dispatch] = useReducer(reducer, initialCount, init);//create the initial state lazily
    const [initState, initDispatch] = useReducer(reducer, initialState);
    const childRef = useRef(null);


    return (
        <>
            <div className="case-1 usereducer">
                Count: {state.count}
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button
                    onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
                    Reset
      </button>
            </div>
            <div className="case-2 usereducer">
                Count: {initState.count}
                <button onClick={() => initDispatch({ type: 'decrement' })}>-</button>
                <button onClick={() => initDispatch({ type: 'increment' })}>+</button>
            </div>
            <div className="case-3">
                <UseMemo />
            </div>
            <div className="case-4">
                <UseCallBackCom />
            </div>
            <div className="case-5">
                <UseImperativeHandle ref={childRef} onFocus={() => childRef.current.customFun()} />
            </div>
            <div className="case-6">
                <UseLayoutEffect />
            </div>
            <div className="case-7">
                <UseDebugValue />
            </div>
        </>
    );
}

const UseMemo = () => {
    console.log('use memo compoent render');
    const [data, setData] = useState(0);
    const [count, setCount] = useState(0);
    const fetchData = () => {
        setData(Math.random());
    }

    const heavyCalc = (data) => {
        console.log('havey Calc in use memo');
        return data * 100;
    }
    useEffect(fetchData, []);

    //const result = heavyCalc(data); //it will run for every render
    const result = useMemo(() => heavyCalc(data), [data])
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Counter-{count}</button>
            <div>{result}</div>
        </div>
    )
}

const UseCallBackCom = () => {
    console.log('use call back render');
    const [state, setstate] = useState(0);
    const handleClick = useCallback(() => {
        setstate(state + 10)
    }, [state])
    return (
        <>
            <button onClick={handleClick}>emit call back</button>
        </>
    )
}

const UseLayoutEffect = () => {
    console.log('render from UseLayoutEffect');
    const [state, setstate] = useState('')
    const inputRef = useRef(null);
    const ref = React.useRef()
    useEffect(() => {
        console.log(inputRef.current.value)
    })

    useLayoutEffect(() => {
        console.log(inputRef.current.value) // <-- this logs an old value because this runs first!
    })

    return (
        <>
            <input type="text" ref={inputRef} onKeyUp={() => setstate(inputRef.current.value)} />{state}
        </>
    )
}

const UseImperativeHandle = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        customFun: () => {
            console.log('Input is in focus');
        },
    }));
    return <input ref={inputRef} {...props} />;
})


const UseDebugValue = () => {
    const test = useFriendStatus(12);
    return (
        <>
        <div>use debug value: {test}</div>
        </>
    )
}

function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(friendID);

    useDebugValue(isOnline ? 'Online' : 'Offline');

    return isOnline;
}