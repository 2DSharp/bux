import React, {ReactNode} from 'react';

interface InputContainerProps {
    children: ReactNode,
    small?: boolean
}
const InputContainer = (props: InputContainerProps) => {
    return (
        <div className={`field vertically-spaced ${props.small && 'small'}`}>
            {props.children}
        </div>
    );
};

export default InputContainer;