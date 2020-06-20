import React, {CSSProperties, ReactNode} from 'react';

interface ErrorProps {
    children: ReactNode,
    style?: CSSProperties
}

const duration = 300;

const Error = (props: ErrorProps) => {

    return (
        <p style={props.style} className="help is-danger">{props.children}</p>
    );
};

export default Error;
