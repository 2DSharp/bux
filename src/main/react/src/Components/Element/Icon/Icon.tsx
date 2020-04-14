import React from 'react';

export interface IconProps {
    value: string
    size?: string
    color?: string
}

const Icon = (props: IconProps) => {
    return (
        <span className="icon">
            <i className={props.value}/>
        </span>
    );
};

export default Icon;