import React, {useEffect, useState} from 'react';
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
        <TextField error={props.error}
                   errorMsg={props.errorMsg}
                   forwardRef={props.forwardRef}
                   onChange={props.onChange}
                   placeholder={props.placeholder} name={props.name}
                   leftIcon={props.leftIcon}
                   type={passwordType}
                   rightIcon="mdi-eye"
                   rightIconClickable={true}
                   onRightIconClick={togglePassword}
                   label={props.label}
        />
    );
};

export default PasswordField;