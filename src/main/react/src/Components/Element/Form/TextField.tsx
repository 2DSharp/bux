import React, {
    ChangeEvent,
    CSSProperties,
    Dispatch,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState
} from 'react';
import cx from "classnames";
import {removeFieldFromState} from "../../../service/util";
import Label from "./Label";
import {withFormData} from "./FormData";

export interface TextFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type?: string;
    success?: boolean;
    errorMsg?: string | undefined;
    leftIcon?: string
    hasRightErrorIcon?: boolean
    rightIcon?: string
    onChange?: any
    forwardRef?: React.Ref<HTMLInputElement>
    rightIconClickable?: boolean;
    onRightIconClick?: MouseEventHandler<HTMLSpanElement>
    label?: string
    resetServerErrors?: Dispatch<SetStateAction<any>>
    style?: CSSProperties
}

const TextField = (props: TextFieldProps) => {

    const controlClass = cx("control", props.className, {
        "has-icons-left": props.leftIcon,
        "has-icons-right": props.rightIcon || props.hasRightErrorIcon
    });
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    useEffect(() => {
        setError(props.errorMsg);
        setHasError(error != undefined && error != "");
    });

    const inputClass = cx("input", props.className, {
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
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event.target.value);
        }
        removeFieldFromState(props.resetServerErrors, props.name as string)
    }
    const {forwardRef, ...otherProps} = props;
    return (
        <>
            {props.label &&
            <Label required={props.required}>{props.label}</Label>
            }
            <div className={controlClass}>

                <input {...otherProps} style={props.style} type={(props.type) ? props.type : "text"}
                       placeholder={props.placeholder}
                       name={props.name}
                       className={inputClass}
                       onChange={onChange}
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
        </>
    );
};

export default withFormData(TextField);