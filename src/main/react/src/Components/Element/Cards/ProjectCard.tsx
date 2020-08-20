import React from 'react';
import FeatureCard from "./FeatureCard";
import {ReactComponent as ProjectDefaultIcon} from "../../../images/project_icon.svg";

export interface ProjectCardData {
    name: string,
    icon?: string,
    description?: string,
    members: number,
    team: string
}

const ProjectCard = (props: { data: ProjectCardData }) => {
    return (
        <FeatureCard
            title={<div> {props.data.name} <span style={{fontWeight: "normal"}}>- {props.data.team}</span></div>}
            icon={props.data.icon ? "" : <ProjectDefaultIcon style={{width: 48, height: 48}}/>}
            description={props.data.description}
        />
    );
}
;

export default ProjectCard;
