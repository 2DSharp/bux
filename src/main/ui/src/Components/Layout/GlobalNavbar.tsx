import React, {Suspense} from 'react';
import 'bulma/css/bulma.css'
import '@mdi/font/css/materialdesignicons.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const Projects = React.lazy(() => import('../Page/Projects'));

const GlobalNavbar = () => {
    return (
        <Router>
            <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />*/}
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item is-active">
                            <span>Dashboard</span>

                        </a>

                        <Link to="/projects" className="navbar-item">
                            Projects
                        </Link>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider"/>
                                <a className="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="control has-icons-left ">
                                <input className="input is-small is-rounded" type="text" placeholder="Search"/>
                                <span className="icon is-left">
                                <i className="mdi mdi-18px mdi-magnify "/>
                            </span>
                            </div>
                        </div>
                        <a className="navbar-item">
                        <span className="icon">
                            <i className="mdi mdi-24px mdi-comment" aria-hidden="true"/>
                        </span>
                        </a>
                        <a className="navbar-item">
                        <span className="icon">
                            <i className="mdi mdi-24px mdi-bell" aria-hidden="true"/>
                        </span>
                        </a>
                        <div className="navbar-item">

                            <div className="buttons">
                                <a className="button is-small is-dark">
                                <span className="icon">
                                    <i className="mdi mdi-18px mdi-cog-outline" aria-hidden="true"/>
                                </span>
                                    <strong>Settings</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/projects">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Projects/>
                    </Suspense>
                </Route>
            </Switch>
        </Router>
    );
};

export default GlobalNavbar;