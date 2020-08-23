import React, {ReactNode, useEffect, useState} from 'react';
import Container from "../Layout/Container";
import {makeStyles} from "@material-ui/styles";
import {ReactComponent as DefaultProjectCover} from "../../images/default_project_cover.svg";
import {ReactComponent as DefaultOrgCover} from "../../images/default_org_cover.svg";
import {ReactComponent as DefaultTasksCover} from "../../images/default_tasks_cover.svg";
import {ReactComponent as Comment} from "../../images/comment.svg";
import {ReactComponent as Assignment} from "../../images/assignment.svg";

import ProjectCard, {ProjectCardData} from "../Element/Cards/ProjectCard";
import TeamCard, {TeamCardData} from "../Element/Cards/TeamCard";
import PrimaryButton from "../Element/Button/PrimaryButton";
import {Link} from "react-router-dom";
import AvatarIcon from "../Element/Icon/AvatarIcon";
import NotificationCard from "../Element/Cards/NotificationCard";
import Workspace from "../Layout/Workspace";
import {getRequest} from "../../service/request";
import SpinLoader from "../WorkspaceContent/SpinLoader";

export type CardType = "teams" | "projects" | "tasks";


const useStyles = makeStyles({
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,

    },
    big: {
        fontSize: 26
    },
    small: {
        fontWeight: "bold",
        fontSize: 16
    },
    section: {
        margin: 10,
        paddingBottom: 10,
        marginBottom: 20
    }
});

const teams: TeamCardData[] = [
    {
        name: "OSS Org",
        description: "We make open source come to life",
        members: 5
    },
    {
        name: "Helium Nitrate Inc.",
        members: 53
    }
];

const projects: ProjectCardData[] = [
    {
        name: "Bux",
        description: "Bux is an open source project manager, issue tracker and decision logger bundle",
        members: 4,
        team: "OSS Org"
    },
    {
        name: "Skletter",
        description: "Where magic happens",
        members: 3,
        team: "OSS Org"
    },
    {
        name: "Friendly Neighbor",
        description: "Find essentials near you, make requests and give things away",
        members: 5,
        team: "OSS Org"
    }
];


const Section = (props: { name: string, headerType: "small" | "large", children: ReactNode }) => {
    const classes = useStyles();

    return <div className={classes.section}>
        <div
            className={`${classes.header}  ${props.headerType == "large" ? classes.big : classes.small}`}>{props.name}</div>
        {props.children}
    </div>

}
const CardSection = (props: { name: string, loaded: boolean, data?: any[], type: CardType, singleCol?: boolean }) => {
    const buildCard = (data: any) => {
        switch (props.type) {
            case "projects":
                return <ProjectCard data={data}/>;
            case "teams":
                return <TeamCard data={data}/>;
        }
    }

    const buildColumns = (data: any[]) => {
        return <div className="columns">
            <div className="column">
                {data.map((team, index) => (
                    index % 2 == 0 && buildCard(team)
                ))
                }
            </div>
            <div className="column">
                {data.map((team, index) => (
                    index % 2 != 0 && buildCard(team)
                ))
                }
            </div>
        </div>
    }

    const showData = (data: any[], singleCol: boolean | undefined) => {
        if (singleCol)
            return data.map(buildCard);
        return buildColumns(data);
    }

    return (
        <Section headerType="large" name={props.name}>
            {
                props.loaded ? (
                    (props.data && props.data.length > 0) ? showData(props.data, props.singleCol)
                        : <Fallback type={props.type}/>
                ) : <SpinLoader bodySize={200}/>
            }
        </Section>
    );
}
const Fallback = (props: { type: CardType }) => {
    const image = () => {
        switch (props.type) {
            case "teams":
                return <DefaultOrgCover style={{width: 300, height: 180}}/>;
            case "projects":
                return <DefaultProjectCover style={{width: 300, height: 180}}/>;
            case "tasks":
                return <DefaultTasksCover style={{width: 300, height: 180}}/>;
        }
    };
    const text = () => {
        switch (props.type) {
            case "projects":
                return <> Seems like you're not part of any projects yet. Create an organization to add projects. </>
            case "teams":
                return <>
                    <div>You are not part of any organizations.</div>
                    <Link to="/teams/new"><PrimaryButton style={{margin: 10}}>Create a team</PrimaryButton></Link>
                </>
            case "tasks":
                return <> Any tasks assigned to you or you're watching will appear here. </>

        }
    }
    return <div style={{width: "100%", margin: "0 auto", textAlign: "center"}}>
        {
            image()
        }
        <div style={{margin: 10}}>
            {
                text()
            }
        </div>
    </div>
}

const NotificationSection = () => {
    return (
        <Section headerType="small" name={"Notifications"}>
            <NotificationCard icon={<AvatarIcon size="large" user={{name: "John", username: "john"}}/>}
                              title={"John followed you"} description={"Follow them back?"}/>
            <NotificationCard icon={<Comment style={{height: 36, width: 36}}/>}
                              title={"You were mentioned in a comment"}
                              description={"How about we fix bug TEST-92 with this approach?..."}
                              reference={{project: "Bux", team: "OSSOrg"}}
            />
            <NotificationCard icon={<Assignment style={{height: 36, width: 36}}/>}
                              title={"You are assigned a task"}
                              description={"James assigned task TEST-100 to you."}
                              reference={{project: "Bux", team: "OSSOrg"}}
            />
        </Section>);
}
const Home = () => {
    const [teams, setTeams] = useState([]);
    const [teamsLoaded, setTeamsLoaded] = useState(false);
    useEffect(() => {
        getRequest(`/teams`, {},
            (result) => {
                setTeams(result);
                setTeamsLoaded(true);
            })
    }, []);
    return (
        <Workspace active="Home">
            <Container>
                <div className="columns">
                    <div className="column">
                        <CardSection name="Teams" loaded={teamsLoaded} data={teams} type={"teams"}/>
                        <CardSection loaded={true} name="Projects" type="projects"/>
                        <CardSection loaded={true} singleCol name="Interesting Tasks" type="tasks"/>
                    </div>
                    <div className="column" style={{maxWidth: 420}}>
                        <NotificationSection/>
                    </div>
                </div>
            </Container>
        </Workspace>
    );
};

export default Home;
