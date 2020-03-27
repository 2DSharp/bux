import React from 'react';
import '@mdi/font/css/materialdesignicons.min.css'
import {Link} from "react-router-dom";
import HeroFullPage from "../Layout/HeroFullPageProps";
import Card from "../Layout/Card";
import '../../sass/card-form.scss';

const Login = () => {
    return (
        <HeroFullPage width={4} title={"Bux"}>
            <>
                <Card>
                    <>
                        <div className="field">
                            <label className="label">Username or email address</label>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-face-profile"/>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"/>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="password" placeholder="Password"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-lock"/>
                                </span>
                                <span className="icon clickable is-small is-right">
                                    <i className="mdi mdi-eye"/>
                                </span>
                            </p>
                        </div>
                        <div className="container has-text-centered">
                            <button className="button is-primary">
                                Login
                            </button>
                        </div>
                    </>
                </Card>
                <div className="container has-text-centered spc-10">
                    <Link to="/accounts/create">Don't have an account yet? Create one!</Link>
                </div>
            </>
        </HeroFullPage>
    );
};

export default Login;