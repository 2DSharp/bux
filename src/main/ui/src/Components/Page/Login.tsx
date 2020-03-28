import React, {useReducer, useState} from 'react';
import '@mdi/font/css/materialdesignicons.min.css'
import {Link} from "react-router-dom";
import HeroFullPage from "../Layout/HeroFullPageProps";
import Card from "../Layout/Card";
import {useForm} from "react-hook-form";
import cx from "classnames";
import Axios, {AxiosError, AxiosResponse} from "axios";

interface LoginResponse {
    success: boolean
    "auth-token": string
}

interface ServerErrors {
    identifier?: string,
    password?: string,
    global?: string
}

interface Action {
    value: string,
    field: string
}

function reducer(state: ServerErrors, action: Action) {
    return {...state, [action.field]: action.value};
}

const Login = () => {
    type FormData = {
        identifier: string
        password: string
    };
    const {register, handleSubmit, errors} = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<ServerErrors>();

    const onSubmit = handleSubmit(({identifier, password}) => {
        setLoading(true);
        Axios.post('/accounts/login', {
            identifier: identifier,
            password: password
        }).then((response: AxiosResponse<LoginResponse>) => {
            setLoading(false);

        }).catch((error) => {
            const {data} = error.response;
            if (!data.success) {
                setServerErrors(data.errors);
            }
            setLoading(false);

        });

    });
    const [passwordType, setPasswordType] = useState("password");


    const togglePassword = () => {
        if (passwordType == "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };
    const inputStatus = (field: string, status?: string) => cx({
        input: true,
        'is-danger': (errors as any)[field] || status,
    });
    const eyeStatus = cx({
        mdi: true,
        'active-gray': true,
        'mdi-eye': passwordType == "password",
        'mdi-eye-off': passwordType == "text"
    });
    const btnStatus = cx("button", "is-fullwidth", "is-primary", {
        "is-loading": loading
    });
    const errorMsgs = {
        required: "This field is required",
    };

    const removeServerError = (field: string) => {
        setServerErrors(
            prevState => {
                return {...prevState, [field]: undefined}
            });
    };
    return (
        <HeroFullPage width={4} title={"Bux"}>
            <>
                <Card>
                    <>
                        <div className="spc-10 bottom has-text-centered">
                            <strong className="head">Login</strong>
                        </div>
                        <form onSubmit={onSubmit}>

                            <div className="field vertically-spaced">
                                <p className="control has-icons-left has-icons-right">
                                    <input type="text" placeholder="Email or Username" name="identifier"
                                           onChange={(event) => removeServerError('identifier')}
                                           className={inputStatus('identifier', serverErrors?.identifier)}
                                           ref={register({
                                               required: {value: true, message: errorMsgs.required},
                                           })}
                                           autoComplete={"off"}
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="mdi mdi-face-profile"/>
                                </span>
                                    {(errors.identifier || serverErrors?.identifier) &&
                                    <>
                                        <span className="icon is-small is-right">
                                            <i className="mdi active-red mdi-exclamation-thick"/>
                                        </span>
                                        <p className="help is-danger">{(errors.identifier) ? errors.identifier.message : serverErrors?.identifier}</p>
                                    </>
                                    }
                                </p>
                            </div>
                            <div className="field vertically-spaced">
                                <div className="control has-icons-left has-icons-right">
                                    <input type={passwordType} placeholder="Password" name="password"
                                           className={inputStatus('password', serverErrors?.password)}
                                           ref={register({
                                               required: {value: true, message: errorMsgs.required},
                                           })}
                                           onChange={(event) => removeServerError('password')}
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="mdi mdi-lock"/>
                                    </span>
                                    <span onClick={togglePassword} className="icon clickable is-small is-right">
                                        <i className={eyeStatus}/>
                                    </span>
                                    {(errors.password || serverErrors?.password) &&
                                    <p className="help is-danger">{(errors.password) ? errors.password.message : serverErrors?.password}</p>
                                    }
                                </div>
                            </div>

                            <div className="container has-text-centered">
                                <button className={btnStatus}>
                                    Login
                                </button>
                                {serverErrors?.global &&
                                <p className="help is-danger">{serverErrors?.global}</p>
                                }
                            </div>
                            <div className="field vertically-spaced small">
                                <span className="formText"> <a href="#">Forgot password?</a> </span>
                            </div>
                        </form>

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