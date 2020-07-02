import React, {ReactNode, useEffect, useState} from 'react';
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Board from "../Element/Kanban/Board";
import GoalOverview from "./GoalOverview";
import MdIcon from "../Element/Icon/MDIcon";
import Priority from "../Element/Icon/Priority";
import {Priority as PriorityType, TaskData, User} from "../../types";
import moment from "moment";
import Progress, {Pressure} from "../Element/Progress";
import {getRequest} from "../../service/request";
import classNames from "classnames";
import {makeStyles} from "@material-ui/styles";
import SpinLoader from "./SpinLoader";
import GoalStatusChanger from "../Element/Modal/GoalStatusChanger";

export type GoalStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

export type GoalData = {
    id: number,
    title: string,
    deadline: string,
    description?: string,
    progress: number,
    pressure: Pressure,
    status: GoalStatus,
    milestone?: string,
    priority: PriorityType
    createdBy: User,
    tasks?: TaskData[],
    statusList: string[],
    taskIds: string[],
    columnData: any
}

const useStyles = makeStyles({
    root: {
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
        marginTop: 15,
        marginBottom: 15,
        fontSize: 14,
    },
    stats: {
        marginTop: 10,
    },
    description: {
        marginTop: 5,
        marginBottom: 5,
        maxWidth: 600
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
    },
    content: {
        marginTop: 15,
        marginBottom: 15
    }
});

export type GoalTaskData = {
    tasks: any,
    columns: any
}

const Goal = (props: { project: string }) => {
    const {id} = useParams();
    const {url} = useRouteMatch();
    const classes = useStyles();
    const [lastUpdate, setLastUpdate] = useState();
    const [taskData, setTaskData] = useState<GoalTaskData>();
    const [data, setData] = useState<GoalData>();
    const [showChangeLoader, setShowChangeLoader] = useState(false);

    const [dialogVisibility, setDialogVisibility] = useState(false);
    const showConfirmationDialog = () => {
        setDialogVisibility(true);
    }
    const StatusUpdater = (props: { status: GoalStatus }) => {
        const style = classNames("button", {
            "is-loading": showChangeLoader,
            "is-primary": props.status === "PLANNING",
            "is-success": props.status === "ACTIVE",
            "is-light": props.status === "COMPLETED"
        });
        const nextAction = (status: GoalStatus): ReactNode => {
            switch (status) {
                case "PLANNING":
                    return <><span>Start</span></>;
                case "ACTIVE":
                    return <><MdIcon value={"mdi-check"}/><span>Complete</span></>;
                case "COMPLETED":
                    return <><MdIcon value={"mdi-check-all"}/><span>Completed</span></>;
            }
        }
        return <button onClick={showConfirmationDialog} className={style}>{nextAction(props.status)}</button>;
    };
    useEffect(() => {
        getRequest(`/projects/${props.project}/goals/${id}`, {},
            (result => {
                setData(result);
                setTaskData({
                    tasks: result.tasks,
                    columns: {
                        "tasks": {
                            id: "tasks",
                            taskIds: result.taskIds
                        },
                    }
                })
            }));
    }, [lastUpdate]);

    return (
        <div className={classes.root}>
            {data ?
                <>
                    <div className={classes.head}>
                        <span className={classes.heading}><span><h1>{data.title}</h1></span></span>

                        <div className={classes.projectActions}>
                            <span className={classes.projectAction}>
                                <StatusUpdater status={data.status}/>
                            </span>
                            <span className={classes.projectAction}>
                                <Switch>
                                    <Route path={`${url}/board`}>
                                        <Link to={`${url}`}>
                                            <button className="button is-light">
                                                <MdIcon value={"mdi-menu"}/><span>Task list</span>
                                            </button>
                                        </Link>
                                    </Route>
                                    <Route path={`${url}`}>
                                        <Link to={`${url}/board`}>
                                            <button className="button is-light">
                                                <MdIcon value={"mdi-view-parallel"}/><span>Board</span>
                                            </button>
                                        </Link>
                                    </Route>
                                </Switch>
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
                                <b>Deadline: </b> {moment(data.deadline).format("MMM DD, YYYY")}
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
                    </div>
                    <div className={classes.content}>
                        <Switch>
                            <Route path={`${url}/board`}>
                                <Board id={id} data={data}/>
                            </Route>
                            <Route path={`${url}`}>
                                <GoalOverview data={data} id={id} project={props.project}/>
                            </Route>
                        </Switch>
                    </div>
                    <GoalStatusChanger visible={dialogVisibility} data={data}
                                       setModalVisible={setDialogVisibility}
                                       goalId={id} setLastUpdate={setLastUpdate}/>
                </>
                : <SpinLoader/>
            }
        </div>
    );
};

export default Goal;
