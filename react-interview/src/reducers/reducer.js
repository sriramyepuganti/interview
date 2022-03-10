import {combineReducers} from 'redux'
export const reducer = (state = 0, action) => {
    switch (action.type) {
       case 'INCREMENT': return state + 1
       case 'DECREMENT': return state - 1
       case 'RESET' : return 0 
       default: return state
    }
 }

 export const apiCall = (state=[],action)=>{
    switch(action.type){
        case 'API_SUCCESS':
            return [...state,...action.payload]
        default:
            return state
    }
 }

 export default combineReducers({
     reducer,
     apiCall})