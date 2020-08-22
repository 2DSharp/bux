import React, {Suspense} from 'react';
import 'bulma/css/bulma.css'
import '../sass/base.scss'
import '../less/app.less'

import Login from "./Page/Login";
import {BrowserRouter, Link, Route, Switch, useLocation} from "react-router-dom";
import Registration from "./Page/Registration";
import Projects from "./Page/Projects";
import CreateNewProject from "./Wizard/CreateNewProject";
import Loading from "./Page/Loading";
import Home from "./Page/Home";
import CreateNewTeam from "./Wizard/CreateNewTeam";
import {ReactComponent as NotFoundImage} from "../images/404.svg";
import {AnimatePresence, motion} from "framer-motion";
import NewTeamInvitation from "./Wizard/NewTeamInvitation";

const NotFound = () => {
    return <div style={{textAlign: "center"}}>
        <NotFoundImage style={{width: 400, height: 400}}/>
        <div>Oops, this page doesn't seem to exist anymore. <p><Link to={"/home"}>Take me back home!</Link></p></div>
    </div>
}

const App = () => {
    const location = useLocation();
    const Projects = React.lazy(() => import('./Page/Projects'));

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route path="/accounts/create">
                    <Registration/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route key="/projects" path="/projects">
                    <Suspense fallback={<Loading/>}>
                        <Projects/>
                    </Suspense>
                </Route>
                <Route path="/new/project">
                    <CreateNewProject/>
                </Route>
                <Route path="/new/team">
                    <CreateNewTeam/>
                </Route>
                <Route path="/team/:id/invite">
                    <NewTeamInvitation/>
                </Route>
                <Route>
                    <motion.div exit="undefined">
                        <NotFound/>
                    </motion.div>
                </Route>
            </Switch>
        </AnimatePresence>
    );
};


export default App;
