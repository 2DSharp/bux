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
import {ellipsize} from "../../service/util";
import PrimaryButton from "../Element/Button/PrimaryButton";
import Button from '../Element/Button/Button';
import variables from "../../sass/colors.module.scss"

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
        marginRight: 20,
    },
    heading: {
        fontSize: 20,
        flexGrow: 1
    },

    progress: {
        height: 10,
        width: 60,
        margin: '0px 3px 0 3px',
        display: "inline-block"
    },
    meta: {
        fontWeight: 500,
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        border: `1px solid ${variables.borderColor}`,
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.7)",
        margin: 5
    },
    middle: {
        flexGrow: 1
    },
    metaElem: {
        margin: "0 10px 0 10px"
    },
    stats: {},
    description: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14
    },
    panel: {},
    projectActions: {
        display: "flex",
        padding: 5
    },
    projectAction: {
        marginLeft: 5,
        marginRight: 5
    },
    head: {
        marginLeft: 10
    },
    taskBlock: {
        marginBottom: 30
    },
    content: {
        marginTop: 7,
        marginBottom: 15
    },
    details: {
        display: "flex",
        margin: "15px 5px 0 5px"
    },
    deadline: {}
});

export type GoalTaskData = {
    tasks: any,
    columns: any,
}

const Goal = (props: { team: string, project: string, onLoadUpdateName(name: string): void }) => {
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
        const style = classNames({
            "is-loading": showChangeLoader,
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
        return <PrimaryButton onClick={showConfirmationDialog}
                              className={style}>{nextAction(props.status)}</PrimaryButton>;
    };
    useEffect(() => {
        getRequest(`/team/${props.team}/projects/${props.project}/goals/${id}`, {},
            (result => {
                props.onLoadUpdateName(result.title);
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
                        <span className={classes.heading}><span><h1>{ellipsize(data.title, 60, true)}</h1></span></span>
                        <div className={classes.description}>{data.description}</div>

                    </div>

                    <div className={classes.details}>
                        <div className={classes.meta}>
                            <div className={classes.stats}>
                                <MdIcon style={{color: variables.blue}} value={"mdi-finance mdi-24px"}/>
                                <span className={classes.metaElem}>
                                    <Priority
                                        type={data.priority as PriorityType}/>
                                </span>
                                <span className={classes.metaElem}>
                                    <Progress className={`${classes.progress}`} progress={data.progress}
                                              pressure={data.pressure as Pressure}/>
                                </span>
                                <span className={`${classes.deadline} ${classes.metaElem}`}><MdIcon
                                    value="mdi-timer-outline"/> {moment(data.deadline).format("MMM DD, YYYY")}</span>
                                <span className={classes.metaElem}>{data.status}</span>
                                {data.milestone &&
                                <>
                                    <MdIcon value="mdi-flag-checkered"/>{data.milestone}
                                </>
                                }
                            </div>
                        </div>
                        <div className={classes.middle}/>
                        <div className={classes.projectActions}>
                            <span className={classes.projectAction}>
                                <StatusUpdater status={data.status}/>
                            </span>
                            <span className={classes.projectAction}>
                                <Switch>
                                    <Route path={`${url}/board`}>
                                        <Link to={`${url}`}>
                                            <Button className="is-light">
                                                <MdIcon value={"mdi-menu"}/><span>Task list</span>
                                            </Button>
                                        </Link>
                                    </Route>
                                    <Route path={`${url}`}>
                                        <Link to={`${url}/board`}>
                                            <Button className="button is-light">
                                                <MdIcon value={"mdi-view-parallel"}/><span>Board</span>
                                            </Button>
                                        </Link>
                                    </Route>
                                </Switch>
                            </span>
                            <span className={classes.projectAction}>
                                <Button className=" is-light"><MdIcon
                                    value={"mdi-cog-outline"}/><span>Settings</span></Button>
                            </span>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <Switch>
                            <Route path={`${url}/board`}>
                                <Board id={id} data={data}/>
                            </Route>
                            <Route path={`${url}`}>
                                <GoalOverview team={props.team} data={data} id={id} project={props.project}/>
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
