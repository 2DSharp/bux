import React, {ReactNode} from 'react';

interface InputContainerProps {
    children: ReactNode,
    small?: boolean
    inline?: boolean
}
const InputContainer = (props: InputContainerProps) => {
    return (
        <div className={`field vertically-spaced ${props.small ? 'small' : ''} ${props.inline ? 'inline' : ''}`}>
            {props.children}
        </div>
    );
};

export default InputContainer;