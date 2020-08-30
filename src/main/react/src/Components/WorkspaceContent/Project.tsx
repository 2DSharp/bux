import React, {Suspense, useState} from 'react';
import ContentWithMenu from "../Layout/ContentWithMenu";
import ProjectMenu from "../Layout/ProjectMenu";
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Loading from "../Page/Loading";
import Goal from "./Goal";
import useBreadcrumbs, {BreadcrumbsRoute} from 'use-react-router-breadcrumbs';
import {ellipsize} from "../../service/util";

const Project = () => {

    const [breadcrumbName, setBreadcrumbName] = useState<string>();
    const {projectKey, teamId} = useParams();
    let {url} = useRouteMatch();
    const DynamicGoalBreadCrumb = () => {
        return <span>{breadcrumbName && ellipsize(breadcrumbName, 45, true)}</span>;
    };
    const DynamicTeamBreadCrumb = (match: React.PropsWithChildren<any>) => {
        return <Link to={`${match.match.url}/projects`}>{match.match.params.teamId}</Link>
    }
    const routes: BreadcrumbsRoute[] = [
        {path: `${url}/goals/:id`, breadcrumb: DynamicGoalBreadCrumb},
        {path: `/team/:teamId`, breadcrumb: DynamicTeamBreadCrumb}
    ];
    const breadcrumbs = useBreadcrumbs(routes, {excludePaths: ["/", "/team", "/team/:teamId/projects", `${url}/goals`]});
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
                            <Goal onLoadUpdateName={setBreadcrumbName} team={teamId} project={projectKey}/>
                        </Suspense>
                    </Route>
                    <Route path={`${url}`}>
                        <Dashboard project={projectKey} team={teamId}/>
                    </Route>
                </Switch>
            </div>
        </ContentWithMenu>
    );
};

export default Project;