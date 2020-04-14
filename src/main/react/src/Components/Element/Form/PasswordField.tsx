import React, {useState} from 'react';
import TextField, {TextFieldProps} from "./TextField";
import cx from "classnames";

const PasswordField = (props: TextFieldProps) => {
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType == "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };
    const eyeStatus = cx({
        mdi: true,
        'active-gray': true,
        'mdi-eye': passwordType == "password",
        'mdi-eye-off': passwordType == "text"
    });
    return (
        <TextField
            errorMsg={props.errorMsg}
            forwardRef={props.forwardRef}
            placeholder={props.placeholder} name={props.name}
            leftIcon={props.leftIcon}
            type={passwordType}
            rightIcon={eyeStatus}
            onChange={props.onChange}
            rightIconClickable={true}
            onRightIconClick={togglePassword}
            label={props.label}
        />
    );
};

export default PasswordField;