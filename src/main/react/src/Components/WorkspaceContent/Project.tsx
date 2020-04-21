import React from 'react';
import ContentWithMenu from "../Layout/ContentWithMenu";
import ProjectMenu from "../Layout/ProjectMenu";
import {useParams} from "react-router-dom";

const Project = () => {
    const {id} = useParams();

    return (
        <ContentWithMenu menu={<ProjectMenu/>}>
            <div className="project-container">
                {id}
            </div>
        </ContentWithMenu>
    );
};

export default Project;