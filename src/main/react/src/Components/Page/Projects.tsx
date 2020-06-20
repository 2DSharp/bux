import React, {Suspense, useEffect, useState} from 'react';

import EmptyProjectsPrompt from "../WorkspaceContent/EmptyProjectsPrompt";
import Axios, {AxiosError} from "axios";
import Workspace from "./Workspace";
import '../../sass/project.scss'
import styles from '../../sass/workspace.module.scss'
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import MdIcon from "../Element/Icon/MDIcon";
import SmallTextField from "../Element/Form/SmallTextField";
import Project from "../WorkspaceContent/Project";
import Loading from "./Loading";

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
const Projects = () => {
    const [projects, setProjects] = useState<Project[]>();
    const [loaded, setLoaded] = useState(false);
    const [forbidden, setForbidden] = useState(false);
    let {url} = useRouteMatch();
    const Project = React.lazy(() => import('./../WorkspaceContent/Project'));

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
        Axios.get('/projects')
            .then(response => {
                setProjects(response.data);
                setLoaded(true);
            }).catch((error: AxiosError) => {
            if (error.response?.status == 403) {
                setForbidden(true);
            }
        });
    }, []);

    if (forbidden)
        return <Redirect to="/"/>;
    if (projects?.length === 0 && loaded)
        return <EmptyProjectsPrompt/>

    return (
        <Workspace active="Projects">
            <>
                <Switch>
                    <Route path="/projects/:id">
                        <Suspense fallback={<Loading/>}>
                            <Project/>
                        </Suspense>
                    </Route>
                    <Route path="/projects/">
                        <div className="columns">
                            <div className="column project-container">
                                <div className="container">
                                    <div className="container">
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
                                                                <Link to={"/new/project"}>
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
                                                        <Link to={"/new/project"}>
                                                            <button className="button is-primary">
                                                                <MdIcon value="mdi-plus-circle"/>
                                                                <span>Create</span>
                                                            </button>
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
                        </div>
                    </Route>
                </Switch>
            </>
        </Workspace>
    );
};

export default Projects;