import React from 'react';
import classNames from "classnames";

export interface PrimaryButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean
}
const PrimaryButton = (props: PrimaryButtonProps) => {
    const loadingStyle = classNames({
        'is-loading': props.loading
    });
    return (
        <button {...props} className={`button is-primary primary-btn-override ${loadingStyle} ${props.className && props.className}`} >
            {props.children}
        </button>
    );
};

export default PrimaryButton;
