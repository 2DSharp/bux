import React, {Suspense} from 'react';
import ContentWithMenu from "../Layout/ContentWithMenu";
import ProjectMenu from "../Layout/ProjectMenu";
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Loading from "../Page/Loading";
import Goal from "./Goal";

const Project = () => {
    const {id} = useParams();
    let {url} = useRouteMatch();

    return (
        <ContentWithMenu menu={<ProjectMenu/>}>
            <div className="project-container">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to={`/projects/${id}`}>{id}</Link></li>
                        <li className="is-active"><a href="#" aria-current="page">Dashboard</a></li>
                    </ul>
                </nav>
                <Switch>

                    <Route path={`${url}/goals/:id`}>
                        <Suspense fallback={<Loading/>}>
                            <Goal/>
                        </Suspense>
                    </Route>
                    <Route path={`${url}`}>
                        <Dashboard project={id}/>
                    </Route>
                </Switch>
            </div>
        </ContentWithMenu>
    );
};

export default Project;