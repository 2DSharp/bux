import React, {ReactNode} from 'react';
import Workspace from "./Workspace";
import Container from "../Layout/Container";
import {makeStyles} from "@material-ui/styles";
import {ReactComponent as DefaultProjectCover} from "../../images/default_project_cover.svg";
import {ReactComponent as DefaultOrgCover} from "../../images/default_org_cover.svg";
import {ReactComponent as DefaultTasksCover} from "../../images/default_tasks_cover.svg";
import ProjectCard, {ProjectCardData} from "../Element/Cards/ProjectCard";
import TeamCard, {TeamCardData} from "../Element/Cards/TeamCard";
import PrimaryButton from "../Element/Button/PrimaryButton";
import {Link} from "react-router-dom";

export type CardType = "teams" | "projects" | "tasks";


const useStyles = makeStyles({
    header: {
        fontSize: 26,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
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
        name: "Bux - OSS Org",
        description: "Bux is an open source project manager, issue tracker and decision logger bundle",
        members: 4,
        team: "OSS Org"
    },
    {
        name: "Skletter - OSS Org",
        description: "Where magic happens",
        members: 3,
        team: "OSS Org"
    }
];


const Section = (props: { name: string, children: ReactNode }) => {
    const classes = useStyles();
    return <div className={classes.section}>
        <div className={classes.header}>{props.name}</div>
        {props.children}
    </div>

}
const CardSection = (props: { name: string, data?: any[], type: CardType }) => {
    const buildCard = (data: any) => {
        switch (props.type) {
            case "projects":
                return <ProjectCard data={data}/>;
            case "teams":
                return <TeamCard data={data}/>;
        }
    }
    return (
        <Section name={props.name}>
            {
                props.data ? <div className="columns">
                        <div className="column">
                            {props.data.map((team, index) => (
                                index % 2 == 0 && buildCard(team)
                            ))
                            }
                        </div>
                        <div className="column">
                            {props.data.map((team, index) => (
                                index % 2 != 0 && buildCard(team)
                            ))
                            }
                        </div>
                    </div>
                    : <Fallback type={props.type}/>
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
                    <Link to="/new/team"><PrimaryButton style={{margin: 10}}>Create a team</PrimaryButton></Link>
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
const Home = () => {

    return (
        <Workspace active="Home">
            <Container>
                <div className="columns">
                    <div className="column">
                        <CardSection name="Teams" type={"teams"}/>
                        <CardSection name="Projects" type="projects" />
                        <CardSection name="Interesting Tasks" type="tasks"/>
                    </div>
                    <div className="column" style={{maxWidth: 420}}>
                        - Mentions/Notifications
                        - Metrics - Issues opened/Closed
                        - Activity Graph?
                    </div>
                </div>
            </Container>
        </Workspace>
    );
};

export default Home;
