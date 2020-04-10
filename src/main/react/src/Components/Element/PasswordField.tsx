import React, {useState} from 'react';
import TextField, {TextFieldProps} from "./TextField";

const PasswordField = (props: TextFieldProps) => {
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType == "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };
    return (
        <TextField
                   errorMsg={props.errorMsg}
                   forwardRef={props.forwardRef}
                   placeholder={props.placeholder} name={props.name}
                   leftIcon={props.leftIcon}
                   type={passwordType}
                   rightIcon="mdi-eye"
                   onChange={props.onChange}
                   rightIconClickable={true}
                   onRightIconClick={togglePassword}
                   label={props.label}
        />
    );
};

export default PasswordField;