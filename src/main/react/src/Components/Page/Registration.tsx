import React, {useState} from 'react';
import Card from "../Layout/Card";
import HeroFullPage from "../Layout/HeroFullPage";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import cx from 'classnames';
import "../../sass/card-form.scss"
import Axios from "axios";
import TextField from "../Element/Form/TextField";
import InputContainer from "../Element/Form/InputContainer";
import {getFormErrors, removeFieldFromState} from "../../service/util";
import PasswordField from "../Element/Form/PasswordField";

const Registration = () => {
    type FormData = {
        name: string
        email: string
        username: string
        password: string
    };

    type ServerErrors = {
        name?: string
        email?: string
        username?: string
        password?: string
        global?: string
    }

    const {register, handleSubmit, errors} = useForm<FormData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<ServerErrors>();

    const onSubmit = handleSubmit(({name, email, username, password}) => {
        setLoading(true);
        Axios.post('/accounts/create', {
            name: name,
            email: email,
            username: username,
            password: password
        }).then(response => {
            setSuccess(true);
        }).catch(error => {
            const {data} = error.response;
            if (!data.success) {
                setServerErrors(data.errors);
            }
        }).finally(() => {
            setLoading(false);
        });
    });


    const errorMsgs = {
        required: "This field is required",
        emailInvalid: "Enter a valid email address",
        usernameSize: "Create a username between 3 to 12 characters",
        usernamePattern: "A username has to be alphabets and can contain numbers," +
            " periods (.) and underscores(_) and dashes(-)",
        passwordSize: "Create a unqiue password with at least 8 characters"
    };


    const btnStatus = cx("button", "is-fullwidth", "is-primary", {
        "is-loading": loading
    });
    return (
        <HeroFullPage width={4}>
            <Card>
                <>
                    <div className="spc-10 bottom has-text-centered">
                        <strong className="head">Sign up for Bux</strong>
                    </div>
                    <form onSubmit={onSubmit}>
                        <InputContainer>
                            <TextField name="name" placeholder="Enter your name"
                                       onChange={event => {
                                           removeFieldFromState(setServerErrors, "name")
                                       }}
                                       errorMsg={getFormErrors(errors, serverErrors, "name")}
                                       leftIcon="mdi-account"
                                       hasRightErrorIcon={true}
                                       forwardRef={register({
                                           required: {
                                               value: true,
                                               message: errorMsgs.required
                                           }
                                       })}
                            />
                        </InputContainer>
                        <InputContainer>
                            <TextField name="email" type="email" placeholder="Enter your email"
                                       onChange={event => {
                                           removeFieldFromState(setServerErrors, "email")
                                       }}
                                       forwardRef={register({
                                           required: {value: true, message: errorMsgs.required},
                                           // Keeping it simple: https://stackoverflow.com/a/48800/6109408
                                           pattern: {
                                               value: new RegExp("^\\S+@\\S+$"),
                                               message: errorMsgs.emailInvalid
                                           }
                                       })}
                                       hasRightErrorIcon={true} leftIcon="mdi-email"
                                       errorMsg={getFormErrors(errors, serverErrors, "email")}
                            />
                        </InputContainer>
                        <InputContainer>
                            <TextField name="username" placeholder="Create a username"
                                       onChange={event => {
                                           removeFieldFromState(setServerErrors, "email")
                                       }}
                                       errorMsg={getFormErrors(errors, serverErrors, "username")}
                                       forwardRef={register({
                                           required: {value: true, message: errorMsgs.required},
                                           pattern: {
                                               // Reference: https://stackoverflow.com/a/12019115/6109408
                                               value: new RegExp("^(?=[a-zA-Z0-9._]{1,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
                                               message: errorMsgs.usernamePattern
                                           },
                                           minLength: {value: 3, message: errorMsgs.usernameSize},
                                           maxLength: {value: 12, message: errorMsgs.usernameSize}
                                       })}
                                       hasRightErrorIcon={true} leftIcon="mdi-face"
                            />
                        </InputContainer>
                        <InputContainer>
                            <PasswordField
                                errorMsg={getFormErrors(errors, serverErrors, "password")}
                                forwardRef={register({
                                    required: {value: true, message: errorMsgs.required},
                                })}
                                onChange={event => {
                                    removeFieldFromState(setServerErrors, "password")
                                }}
                                placeholder="Password" name="password"
                                leftIcon="mdi-lock"
                            />
                        </InputContainer>
                        <div className="container has-text-centered">
                            <button className={btnStatus}>
                                Register
                            </button>
                        </div>
                        <div className="field vertically-spaced small">
                            <span className={"formText"}>
                                By registering you are agreeing to the <a href="#">terms and conditions</a>
                            </span>
                        </div>
                    </form>
                    <hr/>
                    <div className="container has-text-centered spc-10">
                        <Link to="/">Already have an account? Log in!</Link>
                    </div>
                </>
            </Card>
        </HeroFullPage>
    );
};

export default Registration;