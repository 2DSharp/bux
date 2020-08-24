import React, {Suspense} from 'react';
import ContentWithMenu from "../Layout/ContentWithMenu";
import ProjectMenu from "../Layout/ProjectMenu";
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Loading from "../Page/Loading";
import Goal from "./Goal";
import useBreadcrumbs, {BreadcrumbsRoute} from 'use-react-router-breadcrumbs';

const Project = () => {
    const {id, teamId} = useParams();
    let {url} = useRouteMatch();
    const routes : BreadcrumbsRoute[] = [];
    const breadcrumbs = useBreadcrumbs(routes, {excludePaths: ["/"]});
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
                            <Goal team={teamId} project={id}/>
                        </Suspense>
                    </Route>
                    <Route path={`${url}`}>
                        <Dashboard project={id} team={teamId}/>
                    </Route>
                </Switch>
            </div>
        </ContentWithMenu>
    );
};

export default Project;