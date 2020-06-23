import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import MdIcon from "../Element/Icon/MDIcon";
import {Priority as PriorityType, User} from "../../types";
import Progress, {Pressure} from "../Element/Progress";
import {getRequest} from "../../service/request";
import TaskList from "../Element/Table/TaskList";
import Priority from "../Element/Icon/Priority";

export type Goal = {
    id: number,
    title: string,
    deadline: string,
    description?: string,
    progress: number,
    pressure: Pressure,
    status: string,
    milestone?: string,
    priority: PriorityType
    createdBy: User
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
    progress: {
        height: 10,
        width: 60,
        margin: '0px 3px 0 3px',
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
const GoalOverview = (props: { project: string, id: number }) => {
    const {url} = useRouteMatch();
    const classes = useStyles();
    const [lastUpdate, setLastUpdate] = useState();
    const [data, setData] = useState<Goal>();
    useEffect(() => {
        getRequest(`/projects/${props.project}/goals/${props.id}`, {},
            (result => {
                setData(result);
            }),
            (error => {

            }))
    },);
    return (

        <div className={classes.root}>
            {data &&
            <>
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
                    <div className={classes.description}>{data.description}</div>
                    <div className={`${classes.stats} columns`}>
                        <div className="column">
                            <Priority
                                type={data.priority as PriorityType}/><b>Priority: </b>{data.priority}
                        </div>
                        <div className="column">
                            <b>Deadline: </b> {data.deadline}
                        </div>
                        <div className="column">
                            <b>Progress:</b> <Progress className={classes.progress} progress={data.progress}
                                                       pressure={data.pressure as Pressure}/>
                        </div>
                        <div className="column">
                            <b>Status:</b> {data.status}
                        </div>
                        <div className="column">
                            <b>Milestones:</b> {data.milestone ? data.milestone : "None"}
                        </div>
                    </div>

                    <TaskList onUpdate={setLastUpdate} data={taskData}/>
                </div>
            </>

            }
        </div>
    );
};

export default GoalOverview;
