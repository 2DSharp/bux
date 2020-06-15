import React from 'react';
import MdIcon from "../Icon/MDIcon";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    priority: {
        height: "inherit",
    },
    high: {
        color: "red"
    },
    low: {
        color: "gray"
    },
    root: {
        width: "100%"
    },
    statsContainer: {
        color: "darkgray",
        fontSize: 12
    },
    stat: {
        margin: "0 3px 0 3px"
    },
    panelContainer: {
        maxHeight: 300,
        overflowY: "auto"
    }
});
const Goals = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <nav className="panel">
                <p className="panel-heading">
                    Goals
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <MdIcon value="mdi-magnify mdi-24px"/>
                        <input className="input" type="text" placeholder="Search"/>
                    </p>
                </div>
                <p className="panel-tabs">
                    <a>All</a>
                    <a className="is-active">Active</a>
                    <a>Completed</a>
                    <a>Abandoned</a>
                </p>
                <div className={classes.panelContainer}>
                    <a className="panel-block is-active">
                        <span className="panel-icon">
                            <MdIcon value="mdi-arrow-up" className={`${classes.priority} ${classes.high}`}/>
                        </span>
                        <div>
                            UI Design
                        </div>
                    </a>
                    <a className="panel-block">
                        <span className="panel-icon">
                            <MdIcon value="mdi-arrow-down" className={`${classes.priority} ${classes.low}`}/>
                        </span>
                        <div>
                            <div>API Gateway</div>
                            <div className={classes.statsContainer}>
                                <span className={classes.stat}><b>Progress: </b>72%</span>
                                <span className={classes.stat}><b>Team size: </b>4</span>
                                <span className={classes.stat}><b>Last active: </b>2 hrs ago</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="panel-block">
                    <button className="button is-link is-primary is-fullwidth">
                        Create a new goal
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Goals;
