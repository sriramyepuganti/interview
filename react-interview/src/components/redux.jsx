import React from 'react';
import {connect,dispatch} from 'react-redux';
import { increment, decrement,fetchData} from '../actions/action';
const Redux = (props)=>{
    const {increment,decrement,counter,fetchData} = props;
    return(
        <>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
        {counter.reducer}
        <button onClick={fetchData}>emit</button>
        <ul>
        {counter.apiCall.map((ele,index)=>{
            return (<li key={index}>{ele.title}</li>)
        })}
            </ul>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        counter: state
     };
 };

 const mapDispatchToProps = (dispatch)=>{
     return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        fetchData: ()=> dispatch(fetchData())
     }
 }

//  const counter = useSelector(state => state.counter)
//  const currentUser = useSelector(state => state.currentUser)

// const dispatch = usedispatch();
// dispatch({type: 'sss',payload}) or dispatch(functionName())

export default connect(mapStateToProps,mapDispatchToProps)(Redux);