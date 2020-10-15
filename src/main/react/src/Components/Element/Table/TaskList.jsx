import React, {createRef, useEffect, useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import DnDTable from "./DnDTable";
import {DragHandler} from "../../../service/dragHandler";
import MdIcon from "../Icon/MDIcon";
import variables from "../../../sass/colors.module.scss"
import {postRequest} from "../../../service/request";
import ScrollIntoView from "react-scroll-into-view";
import TaskDetails from "../Modal/TaskDetails";
import {Button, Input} from "antd";
import NewTask from "../Modal/NewTask";

const useStyles = makeStyles({
    taskBlock: {
        marginBottom: 30
    },

    panel: {
        marginBottom: "10px !important",
        borderRadius: 12,
        padding: 15,
        minWidth: 560,
        backgroundColor: "#fff",
        margin: 10
    },
    bottomAdder: {
        color: variables['blue'],
        cursor: "pointer",
        fontSize: "15px"
    },
    panelHeader: {
        fontSize: 20,
        display: "flex",
        margin: "5px 10px",
        padding: "0 10px 0 10px"
    },
    headerBtn: {
        margin: "0 5px 0 5px",
        height: "inherit"
    }
});
const TaskList = (props) => {
    const classes = useStyles();
    const [columns, setColumns] = useState(props.data.columns);
    const [tasks, setTasks] = useState(props.data.tasks);
    const [showBacklogAdder, setShowBacklogAdder] = useState(false);

    const handleDrag = (result) => {
        DragHandler.dragEnd(result, columns, setColumns);
        const {destination, source} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        postRequest("/goals/tasks/reorder", {
            goalId: props.goalId,
            source: source.index,
            destination: destination.index
        }, (result) => {
            refreshTasks(result);
        })
    }
    const [refreshOnAdd, setRefreshOnAdd] = useState(0);
    const refreshTasks = (refreshedTasks) => {
        setTasks(refreshedTasks.tasks)
        setColumns({
            ...columns,
            tasks: {
                ...columns.tasks,
                taskIds: refreshedTasks.taskIds
            }
        });
    }
    const bottomRef = createRef();

    const onAdd = (tasks) => {
        refreshTasks(tasks);
        setRefreshOnAdd(refreshOnAdd + 1);
    }
    useEffect(() => {
        // Don't scroll unless it's the second refresh (happens only when added)
        if (refreshOnAdd > 0) {
            scroll()
        }
    }, [refreshOnAdd]);

    const [detailsVisible, setDetailsVisible] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState("");
    const [newTaskVisible, setNewTaskVisible] = useState(false);
    const showDetails = taskId => {
        setDetailsVisible(true);
        setCurrentTaskId(taskId);
    }
    const scroll = () => {
        bottomRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
    return (
        <div>
            {
                props.data &&
                <DragDropContext onDragEnd={handleDrag}>
                    <div className={classes.taskBlock}>
                        <nav className={`panel ${classes.panel}`}>
                            <div className={classes.panelHeader}>
                                <span style={{flexGrow: 1, marginRight: 5}}>Tasks</span>

                                <Input style={{width: 180, minWidth: 60}} placeholder="Search tasks"
                                       prefix={<MdIcon value="mdi-magnify mdi-18px"/>}/>
                                <Button className={classes.headerBtn}>Assigned to Me</Button>

                                <ScrollIntoView style={{display: "inline-block"}} selector="#bottom">
                                    <Button onClick={() => setNewTaskVisible(true)} type="primary"
                                            className={classes.headerBtn}>
                                        <MdIcon value={"mdi-plus"}/>
                                        New Task
                                    </Button>
                                </ScrollIntoView>

                            </div>
                            <div className="is-divider"/>
                            <DnDTable bottomRef={bottomRef} onAdd={onAdd} team={props.team} goal={props.goalId}
                                      project={props.project}
                                      adderId={"tasks-adder"} data={columns['tasks']}
                                      statusList={props.statusList}
                                      onSelect={taskId => {
                                          showDetails(taskId)
                                      }}
                                      tasks={columns['tasks'].taskIds.map(task => tasks[task])}/>
                        </nav>

                    </div>
                    <div className={classes.taskBlock}>
                        <div><h3>Backlog<MdIcon onClick={() => setShowBacklogAdder(!showBacklogAdder)}
                                                value={showBacklogAdder ? "mdi-minus" : "mdi-plus"}
                                                className={classes.addIcon}/></h3></div>
                        <nav className={`panel`}>
                            {/*<DnDTable data={columns['backlog']}*/}
                            {/*          displayAdded={showBacklogAdder}*/}
                            {/*          tasks={columns['backlog'].taskIds.map(task => props.data.tasks[task])}/>*/}
                        </nav>
                        <div className={classes.bottomAdder}>
                            <MdIcon value={"mdi-plus"}/><span>Create a new task</span>
                        </div>
                    </div>
                </DragDropContext>
            }
            {
                currentTaskId &&
                <TaskDetails visible={detailsVisible} setModalVisible={setDetailsVisible} data={tasks[currentTaskId]}/>
            }
            <NewTask visible={newTaskVisible} setModalVisible={setNewTaskVisible} onAdd={onAdd} goal={props.goalId}
                     project={props.project} team={props.team}/>
        </div>
    );
};

export default TaskList;
