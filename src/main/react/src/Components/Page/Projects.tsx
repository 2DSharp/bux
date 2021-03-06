import React, {Suspense, useEffect, useState} from 'react';

import EmptyProjectsPrompt from "../WorkspaceContent/EmptyProjectsPrompt";
import Axios, {AxiosError} from "axios";
import '../../sass/project.scss'
import styles from '../../sass/workspace.module.scss'
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import MdIcon from "../Element/Icon/MDIcon";
import SmallTextField from "../Element/Form/SmallTextField";
import Project from "../WorkspaceContent/Project";
import Loading from "./Loading";
import Container from "../Layout/Container";
import PrimaryButton from "../Element/Button/PrimaryButton";
import MotionRedirect from "../Element/Routing/MotionRedirect";
import Workspace from "../Layout/Workspace";
import {getRequest} from "../../service/request";

type Leader = {
    name: string
    username: string
}
type Project = {
    name: string;
    projectKey: string;
    leader: Leader;
    creationTime: string
};

const AllProjects = () => {
    let {url} = useRouteMatch();
    const {teamId} = useParams();

    const [projects, setProjects] = useState<Project[]>();
    const [loaded, setLoaded] = useState(false);
    const [forbidden, setForbidden] = useState(false);

    const pushProject = (project: Project) => {
        return (
            <tbody key={project.projectKey}>
            <tr className={styles.tableRow} style={{border: "none !important"}}>
                <td className="padded-card">
                    <Link to={`${url}/${project.projectKey}`}>
                        <MdIcon value="mdi-rocket"/>
                        {project.name}
                    </Link>
                </td>
                <td className="padded-card">{project.projectKey}</td>
                <td className="padded-card">{(new Date(project.creationTime)).toLocaleDateString()}</td>
                <td className="padded-card">Active</td>
                <td className="padded-card">{project.leader.name} (@{project.leader.username})</td>
                <td className="padded-card">
                    <MdIcon value="mdi-dots-horizontal"/>

                </td>
            </tr>
            </tbody>
        );
    }
    useEffect(() => {
        getRequest(`/team/${teamId}/projects`, {}, response => {
            setProjects(response.list);
            setLoaded(true);
        });

    }, []);


    if (forbidden)
        return <MotionRedirect to="/"/>;
    if (projects?.length === 0 && loaded)
        return <Workspace noSpaceTop active="Projects"><EmptyProjectsPrompt teamId={teamId} url={url}/></Workspace>

    return (
        <Container>
            <div style={{minWidth: 1024}}>
                <div className="columns">
                    <div className="column">
                        <p className={styles.heading}>Projects</p>

                        <div className="card">
                            <div className="card-content small-pad">
                                <div className="columns">
                                    <div className="column">
                                        <div className="field is-grouped is-grouped-multiline">
                                            <div className="control">
                                                <SmallTextField placeholder="Search"
                                                                className="small-action-group"
                                                                leftIcon="mdi-magnify mdi-24px"/>
                                            </div>
                                            <div className="control">
                                                <Link to={`/team/projects/new`}>
                                                    <button
                                                        className="button is-light-btn small-action-group">
                                                        <MdIcon value="mdi-filter-variant-plus"/>
                                                        <strong>Filter</strong>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="column has-text-right">
                                        <Link to={`/team/${teamId}/projects/new`}>
                                            <PrimaryButton>
                                                <MdIcon value="mdi-plus-circle"/>
                                                <span>Create</span>
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                                <table className="table container is-fluid">
                                    <thead>
                                    <tr>
                                        <th style={{width: 400}}>Name</th>
                                        <th>Key</th>
                                        <th>Created at</th>
                                        <th>Status</th>
                                        <th>Project Lead</th>
                                        <th style={{width: 40}}/>
                                    </tr>
                                    </thead>
                                    {
                                        projects?.map(pushProject)
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
const Projects = () => {

    const Project = React.lazy(() => import('./../WorkspaceContent/Project'));

    return (
        <Workspace active="Projects">
            <>
                <Switch>
                    <Route path={`/team/:teamId/projects/:projectKey`}>
                        <Suspense fallback={<Loading/>}>
                            <Project/>
                        </Suspense>
                    </Route>
                    <Route path="/team/:teamId/projects/">
                        <AllProjects/>
                    </Route>
                </Switch>
            </>
        </Workspace>
    );
};

export default Projects;