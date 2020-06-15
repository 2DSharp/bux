import React, {ReactElement} from 'react';
import MdIcon from "../Icon/MDIcon";
import {makeStyles} from "@material-ui/styles";
import classNames from "classnames";
import styles from "../../../sass/std_component.module.scss"

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
    medium: {
        color: "lightgreen"
    },
    root: {
        width: "100%"
    },
    statsContainer: {
        color: "darkgray",
        fontSize: 12
    },
    stat: {
        marginRight: "7px"
    },
    panelContainer: {
        maxHeight: 300,
        overflowY: "auto"
    },
    progress: {
        height: 10,
        width: 60,
        margin: '0px 3px 0 3px',
        display: "inline-block"
    },
    panelItem: {
        width: "100%"
    }
});


interface PriorityProps {
    type: "high" | "low" | "medium"
}

type GoalType = {
    id: string,
    title: string,
    teamSize: number,
    deadline: string,
    progress: number,
    pressure: "high" | "low" | "medium",
    priority: "high" | "low" | "medium"
}
const goals: GoalType[] =
    [
        {
            id: "1",
            title: "UI Design",
            teamSize: 4,
            deadline: "July 2, 2020",
            progress: 72,
            priority: "high",
            pressure: "low"
        },
        {
            id: "2",
            title: "API Gateway",
            teamSize: 6,
            deadline: "June 30, 2020",
            progress: 43,
            priority: "medium",
            pressure: "high"
        },
        {
            id: "3",
            title: "User Service",
            teamSize: 5,
            deadline: "July 15, 2020",
            progress: 20,
            priority: "low",
            pressure: "medium"
        },
    ];


const Goals = () => {
    const classes = useStyles();
    const Priority = (props: PriorityProps): ReactElement => {
        switch (props.type) {
            case "high":
                return <MdIcon value="mdi-arrow-up" className={`${classes.priority} ${classes.high}`}/>;
            case "low":
                return <MdIcon value="mdi-arrow-down" className={`${classes.priority} ${classes.low}`}/>;
            case "medium":
                return <MdIcon value="mdi-circle-medium" className={`${classes.priority} ${classes.medium}`}/>
        }
    }
    const progressPressure = (pressure: "high" | "low" | "medium") =>
        classNames("progress", classes.progress, {
            "is-success": pressure === "low",
            "is-danger": pressure === "high",
            "is-info": pressure === "medium"
        });
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
                <p className={`panel-tabs`}>
                    <a className={styles.panelTabs}>All</a>
                    <a className={`is-active ${styles.panelTabs}`}>Active</a>
                    <a className={styles.panelTabs}>Upcoming</a>
                    <a className={styles.panelTabs}>Completed</a>
                    <a className={styles.panelTabs}>Abandoned</a>
                </p>
                <div className={classes.panelContainer}>

                    {
                        goals.map(goal => (
                            <a className="panel-block">
                                <span className="panel-icon">
                                    <Priority type={goal.priority}/>
                                </span>
                                <div className={classes.panelItem}>
                                    <div>{goal.title}</div>
                                    <div className={classes.statsContainer}>
                                        <span className={classes.stat}><b>Team size: </b>{goal.teamSize}</span>
                                        <span className={classes.stat}><b>Deadline: </b>{goal.deadline}</span>
                                        <span className={classes.stat} style={{float: "right"}}>
                                            <progress
                                                className={progressPressure(goal.pressure)}
                                                value={goal.progress}
                                                max="100">{goal.progress}%</progress>
                                             <> {goal.progress}%</>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))
                    }

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
