import React from 'react';
import FeatureCard from "./FeatureCard";
import MdIcon from "../Icon/MDIcon";
import {ReactComponent as OrgDefaultAvatar} from "../../../images/org.svg";

export interface TeamCardData {
    name: string,
    icon?: string,
    description?: string,
    members: number,
}

const TeamCard = (props: { data: TeamCardData }) => {
    return (
        <FeatureCard
            title={props.data.name}
            icon={props.data.icon ? "" : <OrgDefaultAvatar style={{width: 48, height: 48}}/>}
            description={props.data.description}
        >
            <div style={{paddingTop: 10, position: "absolute", bottom: 22}}>
                <MdIcon style={{verticalAlign: "baseline"}} value={"mdi-account-multiple mdi-18px"}/> <span
                style={{fontSize: 14, verticalAlign: "top"}}>{props.data.members}</span>
            </div>
        </FeatureCard>
    );
};

export default TeamCard;
