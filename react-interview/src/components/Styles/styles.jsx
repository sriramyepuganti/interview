import React from 'react';
//styles components
import styled from 'styled-components';

//we can import index.css file and use className
import './index.css';

// module css
import styles from './index.module.css';

//inline styles
const style = {
    backgroundColor : 'red'
}



const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props=> props.color}
`;
export const Styles = ()=>{
    return (
        <>
        <div style={{backgroundColor: 'red'}}>inline styles</div>
        <div style={style}>style object</div>
        <Flex color="red">styled components</Flex>
        <div className={"error-icon " + styles.errorIcon}>error text</div>
        </>
    )
}