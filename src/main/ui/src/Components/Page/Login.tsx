import React, {useState} from 'react';
import '@mdi/font/css/materialdesignicons.min.css'
import {Link} from "react-router-dom";
import HeroFullPage from "../Layout/HeroFullPageProps";
import Card from "../Layout/Card";
import {useForm} from "react-hook-form";
import cx from "classnames";

const Login = () => {
    type FormData = {
        identifier: string
        password: string
    };
    const {register, handleSubmit, errors} = useForm<FormData>();

    const onSubmit = handleSubmit(({identifier, password}) => {
        console.log(identifier, password);
    });
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType == "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };
    const inputStatus = (field: string) => cx({
        input: true,
        'is-danger': (errors as any)[field],
    });
    const eyeStatus = cx({
        mdi: true,
        'active-gray': true,
        'mdi-eye': passwordType == "password",
        'mdi-eye-off': passwordType == "text"
    });
    const errorMsgs = {
        required: "This field is required",
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
                                           className={inputStatus('identifier')}
                                           ref={register({
                                               required: {value: true, message: errorMsgs.required},
                                           })}
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="mdi mdi-face-profile"/>
                                </span>
                                    {errors.identifier &&
                                    <>
                                        <span className="icon is-small is-right">
                                            <i className="mdi active-red mdi-exclamation-thick"/>
                                        </span>
                                        <p className="help is-danger">{errors.identifier.message}</p>
                                    </>
                                    }
                                </p>
                            </div>
                            <div className="field vertically-spaced">
                                <p className="control has-icons-left has-icons-right">
                                    <input type={passwordType} placeholder="Password" name="password" className={inputStatus('password')}
                                           ref={register({
                                               required: {value: true, message: errorMsgs.required},
                                           })}/>
                                    <span className="icon is-small is-left">
                                    <i className="mdi mdi-lock"/>
                                    </span>
                                    <span onClick={togglePassword} className="icon clickable is-small is-right">
                                        <i className={eyeStatus}/>
                                    </span>
                                    {errors.password && <p className="help is-danger">{errors.password.message}</p>}
                                </p>
                            </div>

                            <div className="container has-text-centered">
                                <button className="button is-fullwidth is-primary">
                                    Login
                                </button>
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