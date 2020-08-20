import React from 'react';

const PrimaryButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button {...props} className={`button is-primary primary-btn-override ${props.className && props.className}`} >
            {props.children}
        </button>
    );
};

export default PrimaryButton;
