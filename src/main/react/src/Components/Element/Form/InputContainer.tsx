import React, {ReactElement} from 'react';

interface InputContainerProps {
    children: ReactElement
}
const InputContainer = (props: InputContainerProps) => {
    return (
        <div className="field vertically-spaced">
            {props.children}
        </div>
    );
};

export default InputContainer;