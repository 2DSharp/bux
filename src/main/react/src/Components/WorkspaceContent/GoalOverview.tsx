import React from 'react';
import {Link, useParams, useRouteMatch} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import Priority from "../Element/Icon/Priority";
import MdIcon from "../Element/Icon/MDIcon";
import TaskList from "../Element/Table/TaskList";
import {Priority as PriorityType} from "../../types";

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
const taskData = {
    tasks: {
        'task-1': {id: 'task-1', title: 'Add new header', priority: "LOW"},
        'task-2': {
            id: 'task-2',
            title: 'Update background',
            priority: "HIGH",
            assignee: {name: "Dedipyaman D", username: "twodee"}
        },
        'task-3': {id: 'task-3', title: 'Delete previous font', priority: "MEDIUM"},
        'task-4': {
            id: 'task-4',
            title: 'Optimize CSS',
            priority: "MEDIUM",
            assignee: {name: "John Doe", username: "jdoe"}
        },
        'task-5': {id: 'task-5', title: 'Pre-cache JS', priority: "HIGH"}
    },
    columns: {
        "tasks": {
            id: "tasks",
            title: 'TODO',
            taskIds: ['task-1', "task-2", "task-3"]
        },
        "backlog": {
            id: "backlog",
            title: "In Progress",
            taskIds: ['task-4', 'task-5']
        }
    },
    columnOrder: ['col1', 'col2']

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
const GoalOverview = () => {
    const {id} = useParams();
    const {url} = useRouteMatch();
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
                        <Link to={`${url}/board`}>
                            <button className="button is-light">
                                <MdIcon value={"mdi-grid-large"}/><span>Board</span>
                            </button>
                        </Link>
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
                            type={data.priority as PriorityType}/><b>Priority: </b>{data.priority.toLowerCase()}
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
                <TaskList data={taskData}/>
            </div>

        </div>
    );
};

export default GoalOverview;
