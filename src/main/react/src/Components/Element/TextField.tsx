import React, {ChangeEventHandler, MouseEventHandler, useEffect, useState} from 'react';
import cx from "classnames";

export interface TextFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type?: string;
    success?: boolean;
    errorMsg?: string;
    leftIcon?: string
    hasRightErrorIcon?: boolean
    rightIcon?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    forwardRef?: React.Ref<HTMLInputElement>
    rightIconClickable?: boolean;
    onRightIconClick?: MouseEventHandler<HTMLSpanElement>
    label?: string
}

const TextField = (props: TextFieldProps) => {

    const controlClass = cx("control", {
        "has-icons-left": props.leftIcon,
        "has-icons-right": props.rightIcon || props.hasRightErrorIcon
    });
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    useEffect(() => {
        setError(props.errorMsg);
        setHasError(error != undefined && error != "");
    });

    const inputClass = cx("input", {
        'is-danger': hasError,
        'is-success': props.success && !hasError
    });

    const rightIconClass = cx("mdi", {
        "active-red": !props.rightIconClickable,
        "active-gray": props.rightIconClickable
    });

    const rightIconContainerClass = cx("icon", "is-small", "is-right", {
        "clickable": props.rightIconClickable
    });
    return (
        <div className={controlClass}>
            {props.label &&
            <label className="label">{props.label} {props.required && <span style={{color: "red"}}>*</span>}</label>
            }
            <input type={(props.type) ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                   className={inputClass}
                   onChange={props.onChange}
                   autoComplete={props.autoComplete}
                   ref={props.forwardRef}
            />
            {props.leftIcon &&
            <span className="icon is-small is-left">
                <i className={`mdi ${props.leftIcon}`}/>
            </span>
            }
            {((hasError && props.hasRightErrorIcon) || props.rightIcon) &&

            <span onClick={props.onRightIconClick} className={rightIconContainerClass}>
                <i className={`${rightIconClass} ${(props.rightIconClickable) ? props.rightIcon : "mdi-exclamation-thick"}`}/>
            </span>
            }
            {hasError &&
            <p className="help is-danger">{props.errorMsg}</p>
            }

        </div>
    );
};

export default (TextField);