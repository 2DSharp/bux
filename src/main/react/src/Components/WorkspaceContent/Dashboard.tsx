import React from 'react';
import ProjectMenu from "../Layout/ProjectMenu";
import "../../sass/project.scss";

const Dashboard = () => {
    return (
        <div className="columns">
            <ProjectMenu/>
            <div className="column project-subpage">
                <div className="container is-fluid">

                </div>
            </div>
        </div>
    );
};

export default Dashboard;