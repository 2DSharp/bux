import React, {Suspense} from 'react';
import GlobalNavbar from "../Layout/GlobalNavbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "../WorkspaceContent/Dashboard";

const Projects = React.lazy(() => import('./Projects'));


const Workspace = () => {
    return (
        // For the navbar to leave some pace
        <Router>
            <div style={{paddingTop: "3.25rem"}}>
                <GlobalNavbar/>
                    <Switch>
                        <Route path="/dashboard">
                            <Dashboard/>
                        </Route>
                        <Route path="/projects">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Projects/>
                            </Suspense>
                        </Route>
                    </Switch>
            </div>

        </Router>
    );
};

export default Workspace;