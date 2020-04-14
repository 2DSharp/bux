import React from 'react';
import TextField, {TextFieldProps} from "./TextField";

interface SmallTextFieldProps extends TextFieldProps {
    className?: string;
}

const SmallTextField = (props: SmallTextFieldProps) => {
    return (
        <TextField {...props} className={`secondary-textfield ${props.className} `}/>
    );
};

export default SmallTextField;