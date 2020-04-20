import React, {MouseEventHandler} from 'react';

export interface IconProps {
    value: string
    size?: string
    onClick?: MouseEventHandler
    className?: string
}

const Icon = (props: IconProps) => {
    return (
        <span onClick={props.onClick} className={`icon ${props.className} `}>
            <i className={props.value}/>
        </span>
    );
};

export default Icon;