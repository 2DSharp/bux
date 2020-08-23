import React from 'react';
import GeneralSpin from "../Element/Loader/GeneralSpin";

const SpinLoader = (props: {bodySize?: number, size?: number}) => {
    let style = {
        height: 400
    };
    if (props.bodySize) {
        style = {
            height: props.bodySize
        }
    }
    return (
        <div className="centered-absolutely" style={style}>
            <GeneralSpin size={props.size ? props.size : 60}/>
        </div>
    );
};

export default SpinLoader;
