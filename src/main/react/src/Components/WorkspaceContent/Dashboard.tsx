import React from 'react';
import "../../sass/project.scss";
import {makeStyles} from "@material-ui/styles";
import Goals from "../Element/Panel/Goals";

const useStyles = makeStyles({
    goalsPane: {
        width: 420
    }
});
const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.goalsPane}>
            <Goals/>
        </div>
    );
};

export default Dashboard;