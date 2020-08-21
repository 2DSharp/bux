import React from 'react';

const Label = (props: { children?: any, for?: string, required?: boolean }) => {
    return (
        <label htmlFor={props.for} className="label">{props.children} {props.required && <span style={{color: "red"}}>*</span>}</label>
    );
};

export default Label;
