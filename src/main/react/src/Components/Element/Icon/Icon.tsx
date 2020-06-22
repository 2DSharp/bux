import React, {MouseEventHandler} from 'react';

export interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    value: string
    size?: string
    onClick?: MouseEventHandler
    className?: string
}

const Icon = (props: IconProps) => {
    return (
        <span {...props} onClick={props.onClick} className={`icon ${props.className ? props.className : ""} `}>
            <i className={props.value}/>
        </span>
    );
};

export default Icon;