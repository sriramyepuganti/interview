export function increment() {
    return {
       type: 'INCREMENT'
    }
 }
 export function decrement() {
    return {
       type: 'DECREMENT'
    }
 }
 export function reset() {
    return { type: 'RESET' }
 }

export function fetchData() {
  return dispatch => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                dispatch({type:'API_SUCCESS',payload: json} )})
  };
}