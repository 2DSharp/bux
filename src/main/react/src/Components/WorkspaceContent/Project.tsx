import React, {Suspense} from 'react';
import ContentWithMenu from "../Layout/ContentWithMenu";
import ProjectMenu from "../Layout/ProjectMenu";
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Loading from "../Page/Loading";
import Goal from "./Goal";
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Project = () => {
    const {id} = useParams();
    let {url} = useRouteMatch();
    const routes = [{path: '/', breadcrumb: null}];
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <ContentWithMenu menu={<ProjectMenu/>}>
            <div className="centerpiece">

                <nav className="breadcrumb" style={{marginBottom: '1em'}} aria-label="breadcrumbs">
                    <ul>
                        {breadcrumbs.map(({match, breadcrumb}) => (
                            <li key={match.url}><Link to={match.url}>{breadcrumb}</Link></li>
                        ))}
                    </ul>
                </nav>
                <Switch>

                    <Route path={`${url}/goals/:id`}>
                        <Suspense fallback={<Loading/>}>
                            <Goal project={id}/>
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