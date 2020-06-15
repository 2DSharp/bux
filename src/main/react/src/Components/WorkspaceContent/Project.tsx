import React from 'react';
import ContentWithMenu from "../Layout/ContentWithMenu";
import ProjectMenu from "../Layout/ProjectMenu";
import {useParams} from "react-router-dom";
import Dashboard from "./Dashboard";

const Project = () => {
    const {id} = useParams();

    return (
        <ContentWithMenu menu={<ProjectMenu/>}>
            <div className="project-container">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">{id}</a></li>
                        <li className="is-active"><a href="#" aria-current="page">Dashboard</a></li>
                    </ul>
                </nav>
                <Dashboard/>
            </div>
        </ContentWithMenu>
    );
};

export default Project;