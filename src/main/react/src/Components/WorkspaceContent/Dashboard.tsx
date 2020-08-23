import React from 'react';
import "../../sass/project.scss";
import {makeStyles} from "@material-ui/styles";
import Goals from "../Element/Panel/Goals";

const useStyles = makeStyles({
    goalsPane: {
        width: 420
    }
});
const Dashboard = (props: { project: string, team: string }) => {
    const classes = useStyles();

    return (
        <div className={classes.goalsPane}>
            <Goals projectKey={props.project} team={props.team}/>
        </div>
    );
};

export default Dashboard;