import React from 'react';

const Label = (props: { children?: any, required?: boolean }) => {
    return (
        <label className="label">{props.children} {props.required && <span style={{color: "red"}}>*</span>}</label>
    );
};

export default Label;
