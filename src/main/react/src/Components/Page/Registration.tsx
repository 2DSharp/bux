import React, {useEffect, useState} from 'react';
import Card from "../Layout/Card";
import HeroFullPage from "../Layout/HeroFullPageProps";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import cx from 'classnames';
import "../../sass/card-form.scss"

const Registration = () => {
    type FormData = {
        name: string
        email: string
        username: string
        password: string
    };
    const {register, handleSubmit, errors} = useForm<FormData>();

    const onSubmit = handleSubmit(({name, email}) => {
        console.log(name, email);
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
        emailInvalid: "Enter a valid email address",
        usernameSize: "Create a username between 3 to 12 characters",
        usernamePattern: "A username has to be alphabets and can contain numbers, periods (.) and underscores(_) and dashes(-)",
        passwordSize: "Create a unqiue password with at least 8 characters"
    };


    return (
        <HeroFullPage width={4} title={"Get started with Bux!"}>
            <Card>
                <>
                    <div className="spc-10 bottom has-text-centered">
                        <strong className="head">Sign up for Bux</strong>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="field vertically-spaced">
                            <div className="control has-icons-left has-icons-right">
                                <input className={inputStatus('name')} name="name" type="text"
                                       ref={register({
                                           required: {value: true, message: errorMsgs.required},
                                       })}
                                       placeholder="Enter your Name"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-account"/>
                                </span>
                                {errors.name &&
                                <>
                                <span className="icon is-small is-right">
                                    <i className="mdi active-red mdi-exclamation-thick"/>
                                </span>
                                    <p className="help is-danger">{errors.name.message}</p>
                                </>
                                }
                            </div>
                        </div>
                        <div className="field vertically-spaced">
                            <div className="control has-icons-left has-icons-right">
                                <input className={inputStatus("email")} name="email" type="email"
                                       ref={register({
                                           required: {value: true, message: errorMsgs.required},
                                           // Keeping it simple: https://stackoverflow.com/a/48800/6109408
                                           pattern: {value: new RegExp("^\\S+@\\S+$"), message: errorMsgs.emailInvalid}
                                       })}
                                       placeholder="Enter your Email"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-email"/>
                                </span>
                                {errors.email &&
                                <>
                                <span className="icon is-small is-right">
                                    <i className="mdi active-red mdi-exclamation-thick"/>
                                </span>
                                    <p className="help is-danger">{errors.email.message}</p>
                                </>}

                            </div>
                        </div>
                        <div className="field vertically-spaced">
                            <div className="control has-icons-left has-icons-right">
                                <input className={inputStatus("username")}
                                       name="username" type="text"
                                       ref={register({
                                           required: {value: true, message: errorMsgs.required},
                                           pattern: {
                                               // Reference: https://stackoverflow.com/a/12019115/6109408
                                               value: new RegExp("^(?=[a-zA-Z0-9._]{1,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
                                               message: errorMsgs.usernamePattern
                                           },
                                           minLength: {value: 3, message: errorMsgs.usernameSize},
                                           maxLength: {value: 12, message: errorMsgs.usernameSize}
                                       })}
                                       placeholder="Create a username"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-face"/>
                                    </span>
                                {errors.username &&
                                <>
                                    <span className="icon is-small is-right">
                                        <i className="mdi active-red mdi-exclamation-thick"/>
                                    </span> <p className="help is-danger">{errors.username.message}</p>
                                </>}

                            </div>
                        </div>
                        <div className="field vertically-spaced">
                            <div className="control has-icons-left has-icons-right">
                                <input className={inputStatus("password")} name="password" type={passwordType}
                                       ref={register({
                                           required: {value: true, message: errorMsgs.required},
                                           minLength: {value: 8, message: errorMsgs.passwordSize},
                                       })}
                                       placeholder="Password"/>
                                    <span className="icon is-small is-left">
                                        <i className="mdi mdi-lock"/>
                                    </span>
                                    <span onClick={togglePassword} className="icon clickable is-small is-right">
                                        <i className={eyeStatus}/>
                                    </span>
                                {errors.password && <p className="help is-danger">{errors.password.message}</p>}
                            </div>
                        </div>
                        <div className="container has-text-centered">
                            <button className="button is-fullwidth is-primary">
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