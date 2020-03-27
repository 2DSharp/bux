import React from 'react';
import Card from "../Layout/Card";
import HeroFullPage from "../Layout/HeroFullPageProps";

const Registration = () => {
    return (
        <HeroFullPage width={4} title={"Get started with Bux!"}>
                <Card>
                    <>
                        <div className="spc-10 bottom has-text-centered">
                            <strong className="head">Sign up for Bux</strong>
                        </div>
                        <div className="field vertically-spaced">
                            <p className="control has-icons-left">
                                <input className="input" type="text" placeholder="Enter your Name"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-account"/>
                                </span>
                            </p>
                        </div>
                        <div className="field vertically-spaced">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Enter your Email"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-email"/>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="mdi mdi-check"/>
                                </span>
                            </p>
                        </div>
                        <div className="field vertically-spaced">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="Create a username"/>
                                <span className="icon is-small is-left">
                                    <i className="mdi mdi-face"/>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="mdi mdi-check"/>
                                </span>
                            </p>

                        </div>
                        <div className="field vertically-spaced">
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
                            <button className="button is-fullwidth is-primary">
                                Register
                            </button>
                        </div>
                    </>
                </Card>
        </HeroFullPage>
    );
};

export default Registration;