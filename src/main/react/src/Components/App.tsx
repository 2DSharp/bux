import React, {Suspense} from 'react';
import 'bulma/css/bulma.css'
import '../sass/base.scss'
import '../less/app.less'

import Login from "./Page/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./Page/Registration";
import Projects from "./Page/Projects";
import CreateNewProject from "./WorkspaceContent/CreateNewProject";
import Loading from "./Page/Loading";


const App = () => {

    const Projects = React.lazy(() => import('./Page/Projects'));

    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route path="/accounts/create">
                    <Registration/>
                </Route>
                <Route path="/projects">
                    <Suspense fallback={<Loading/>}>
                        <Projects/>
                    </Suspense>
                </Route>

                <Route path="/new/project">
                    <CreateNewProject/>
                </Route>

            </Switch>
        </BrowserRouter>
    );
};


export default App;
