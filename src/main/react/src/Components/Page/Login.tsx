import React, {useState} from 'react';
import '@mdi/font/css/materialdesignicons.min.css'
import {Link} from "react-router-dom";
import HeroFullPage from "../Layout/HeroFullPageProps";
import Card from "../Layout/Card";
import {FieldErrors, useForm} from "react-hook-form";
import cx from "classnames";
import Axios, {AxiosResponse} from "axios";
import TextField from "../Element/TextField";
import PasswordField from "../Element/PasswordField";
import InputContainer from "../Element/InputContainer";
import {Redirect} from "react-router-dom";
import {removeFieldFromState, getFormErrors} from "../../Helpers/util";

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
        try {
            const response: AxiosResponse<LoginResponse> = await Axios.post('/accounts/login', {
                identifier: identifier,
                password: password
            });
            setLoading(false);
            setLoggedIn(response.data.success);
        } catch (error) {
            const {data} = error.response;
            if (!data.success) {
                setServerErrors(data.errors);
            }
            setLoading(false);
        }
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
        return <Redirect to="/projects"/>;
    return (
        <HeroFullPage width={4}>
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
                                    onChange={event => {
                                        removeFieldFromState(setServerErrors, "identifier")
                                    }}
                                    placeholder="Email or Username" name="identifier"
                                    leftIcon="mdi-face-profile"
                                    hasRightErrorIcon={true}
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
        </HeroFullPage>
    );
};

export default Login;