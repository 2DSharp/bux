import React, {useState} from 'react';
import classNames from "classnames";
import MdIcon from "../Icon/MDIcon";

export interface PrimaryButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean,
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    const loadingStyle = classNames({
        'is-loading': props.loading
    });

    return (
        <button {...props}
                className={`button is-primary primary-btn btn-override ${loadingStyle} ${props.className && props.className}`}>
            <span>
                {props.children}

            </span>
        </button>
    );
};

export default PrimaryButton;
