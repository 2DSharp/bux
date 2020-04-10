import React, {ChangeEvent, useEffect, useState} from 'react';

import EmptyProjectsPrompt from "../WorkspaceContent/EmptyProjectsPrompt";
import Axios from "axios";
import CreateNewProject from "../WorkspaceContent/CreateNewProject";
import ProjectMenu from "../Layout/ProjectMenu";
import Workspace from "./Workspace";
import '../../sass/project.scss'
import styles from '../../sass/workspace.module.scss'

const Projects = () => {
    const [projects, setProjects] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [showNewProjectWizard, setShowNewProjectWizard] = useState(false);
    useEffect(() => {
        Axios.get('/projects')
            .then(response => {
                setProjects(response.data);
                setLoaded(true);
            });
    }, []);


    if (projects.length === 0 && loaded)
        return <EmptyProjectsPrompt/>

    return (
        <Workspace active="Projects">
            <div className="columns">
                <div className="column project-container">
                    <div className="container">
                        <p className={styles.heading}>Projects</p>
                        <div className="container">
                            <table className="table container is-fluid">
                                <thead>
                                <tr>
                                    <th style={{width: 400}} >Name</th>
                                    <th>Key</th>
                                    <th>Created at</th>
                                    <th>Project Lead</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>Test</td>
                                    <td>TEST</td>
                                    <td>10 AM</td>
                                    <td>John Doe</td>

                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Workspace>
    );
};

export default Projects;