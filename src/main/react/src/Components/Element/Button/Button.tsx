import React from 'react';
import classNames from "classnames";
import {PrimaryButtonProps} from "./PrimaryButton";

const Button = (props: PrimaryButtonProps) => {
    const loadingStyle = classNames({
        'is-loading': props.loading
    });
    return (
        <button {...props} className={`button btn btn-override ${loadingStyle} ${props.className && props.className}`}>
            {props.children}
        </button>
    );
};

export default Button;
