import React from 'react';

export const JsxDiv = <div className="test">hello world</div>;
export const ElementDiv = React.createElement(
    'p',
    { className: 'test' },
    "hello world"
)

export const CloneDiv = React.cloneElement(
    ElementDiv,
    { className: 'clone' },
    "new text"
)

export const DotComponent = {
    DatePicker: function (props) {
        return <div>Date picker {new Date().toDateString()}</div>;
    },
    TimePicker: function (props) {
        return (<span>
            <div>Time Picker {new Date().getTime()}</div>
            <div />

            <div></div>

            <div>{false}</div>

            <div>{null}</div>

            <div>{undefined}</div>

            <div>{true}</div>
        <div>show:{String(true)}</div>
        </span>)
    }
}