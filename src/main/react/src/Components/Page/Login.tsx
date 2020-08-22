import React, {useState} from 'react';
import '@mdi/font/css/materialdesignicons.min.css'
import {Link, Redirect} from "react-router-dom";
import WizardPage from "../Layout/WizardPage";
import Card from "../Layout/Card";
import {useForm} from "react-hook-form";
import cx from "classnames";
import TextField from "../Element/Form/TextField";
import PasswordField from "../Element/Form/PasswordField";
import InputContainer from "../Element/Form/InputContainer";
import {getFormErrors} from "../../service/util";
import {postRequest} from "../../service/request";
import {motion} from 'framer-motion';
import MotionRedirect from "../Element/Routing/MotionRedirect";

interface LoginResponse {
    success: boolean
    "auth-token": string
}

interface ServerErrors {
    identifier?: string,
    password?: string,
    global?: string
}

const Login = () => {
    type FormData = {
        identifier: string
        password: string
    };

    const {register, handleSubmit, errors} = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<ServerErrors>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const loginUser = async (identifier: string, password: string) => {

        postRequest('/accounts/login', {
                identifier: identifier,
                password: password
            },
            (result => {
                setLoading(false);
                if (!result.success) {
                    setServerErrors(result.errors);
                } else {
                    setLoggedIn(result.success);
                }
            }),
            () => {
                setLoading(false);
            })
    };

    const onSubmit = handleSubmit(({identifier, password}) => {
        setLoading(true);
        loginUser(identifier, password);
    });

    const btnStatus = cx("button", "is-fullwidth", "is-primary", {
        "is-loading": loading
    });
    const errorMsgs = {
        required: "This field is required",
    };

    if (loggedIn)
        return <MotionRedirect to="/home"/>;
    return (
        <WizardPage width={4}>
            <>
                <Card>
                    <>
                        <div className="spc-10 bottom has-text-centered">
                            <strong className="head">Login</strong>
                        </div>
                        <form onSubmit={onSubmit}>
                            <InputContainer>
                                <TextField
                                    errorMsg={getFormErrors(errors, serverErrors, "identifier")}
                                    forwardRef={register({
                                        required: {value: true, message: errorMsgs.required},
                                    })}
                                    placeholder="Email or Username" name="identifier"
                                    leftIcon="mdi-face-profile"
                                    resetServerErrors={setServerErrors}
                                    hasRightErrorIcon={true}
                                />
                            </InputContainer>
                            <InputContainer>
                                <PasswordField
                                    errorMsg={getFormErrors(errors, serverErrors, "password")}
                                    forwardRef={register({
                                        required: {value: true, message: errorMsgs.required},
                                    })}
                                    resetServerErrors={setServerErrors}
                                    placeholder="Password" name="password"
                                    leftIcon="mdi-lock"
                                />
                            </InputContainer>
                            <div className="container has-text-centered">
                                {serverErrors?.global &&
                                <p className="help is-danger">{serverErrors?.global}</p>
                                }
                                <button className={btnStatus}>
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="field vertically-spaced small">
                            <span className="formText"> <a href="#">Forgot password?</a> </span>
                        </div>
                        <hr/>
                        <div className="container has-text-centered spc-10">
                            <Link to="/accounts/create">Don't have an account yet? Create one!</Link>
                        </div>
                    </>
                </Card>
            </>
        </WizardPage>
    );
};

export default Login;