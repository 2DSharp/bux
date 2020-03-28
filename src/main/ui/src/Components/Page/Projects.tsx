import React, {ChangeEvent, useState} from 'react';
import EmptyProjectsPrompt from "../WorkspaceContent/EmptyProjectsPrompt";
import Axios from "axios";
import CreateNewProject from "../WorkspaceContent/CreateNewProject";

const Projects = () => {
    const [projects, setProjects] = useState('');
    const [showNewProjectWizard, setShowNewProjectWizard] = useState(false);
    Axios.get('/projects')
        .then(response => {
            setProjects(response.data);
        });

    const getProjectsContent = () => {
        if (showNewProjectWizard)
            return <CreateNewProject/>;

        else if (projects.length == 0)
            return <EmptyProjectsPrompt onClick={() => setShowNewProjectWizard(true)}/>
    };
    return (
        <>
            {getProjectsContent()}
        </>
    );
};

export default Projects;