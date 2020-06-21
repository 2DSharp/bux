import React from 'react';
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import Priority from "../Element/Icon/Priority";
import MdIcon from "../Element/Icon/MDIcon";

const data = {
    id: 42,
    title: "Update with new UI designs",
    deadline: "2020-06-25",
    description: "The UI designs need to be updated according to Material Design guidelines",
    progress: 20,
    pressure: "MEDIUM",
    status: "COMPLETED",
    milestone: "v1 launch",
    priority: "MEDIUM",
    createdBy: {
        name: "John Doe",
        username: "jdoe"
    }
}
const useStyles = makeStyles({
    root: {
        marginLeft: 10,
        marginRight: 20
    },
    heading: {
        fontSize: 20,
        display: "inline-block"
    },
    meta: {
        marginTop: 10,
        fontSize: 14,
    },
    stats: {
        marginTop: 10,
    },
    description: {
        marginTop: 5,
        marginBottom: 5
    },
    panel: {},
    projectActions: {
        display: "inline-block",
        float: "right",
        marginRight: 10
    },
    projectAction: {
        marginLeft: 5,
        marginRight: 5
    },
    head: {},
    taskBlock: {
        marginBottom: 30
    }
});
const Goal = () => {
    const {id} = useParams();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.head}>
                <span className={classes.heading}><span><h1>{data.title}</h1></span></span>
                <div className={classes.projectActions}>
                    <span className={classes.projectAction}>
                        <button className="button is-primary">Start</button>
                    </span>
                    <span className={classes.projectAction}>
                        <button className="button is-light"><MdIcon
                            value={"mdi-cog-outline"}/><span>Settings</span></button>
                    </span>
                </div>
            </div>
            <div className={classes.meta}>
                <div className={classes.description}>This is the description for the project</div>
                <div className={`${classes.stats} columns`}>
                    <div className="column">
                        <Priority
                            type={data.priority as "HIGH" | "LOW" | "MEDIUM"}/><b>Priority: </b>{data.priority.toLowerCase()}
                    </div>
                    <div className="column">
                        <b>Timeline: </b> 22-07-2020 - 29-07-2020
                    </div>
                    <div className="column">
                        <b>Status:</b> Active
                    </div>
                    <div className="column">
                        <b>Milestones:</b> None
                    </div>
                </div>
                <div className={classes.taskBlock}>
                    <div><h2>Tasks</h2></div>
                    <nav className={`panel ${classes.panel}`}>
                        <table className="table container  is-fluid">
                            <thead>
                            <tr>
                                <th style={{width: 80}}>ID</th>
                                <th style={{width: 500}}>Task</th>
                                <th>Assignee</th>
                                <th style={{width: 40}}>Priority</th>
                                <th>Deadline</th>
                            </tr>
                            </thead>

                        </table>
                    </nav>
                </div>
                <div className={classes.taskBlock}>
                    <div><h2>Backlog</h2></div>
                    <nav className={`panel ${classes.panel}`}>
                        <table className="table container  is-fluid">

                        </table>
                    </nav>
                </div>
            </div>

        </div>
    );
};

export default Goal;
