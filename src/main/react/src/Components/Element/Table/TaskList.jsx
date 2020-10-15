import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import DnDTable from "./DnDTable";
import {DragHandler} from "../../../service/dragHandler";
import MdIcon from "../Icon/MDIcon";
import variables from "../../../sass/colors.module.scss"
import {postRequest} from "../../../service/request";
import ScrollIntoView from "react-scroll-into-view";
import {useFocus} from "../../../hooks/useFocus";
import TaskDetails from "../Modal/TaskDetails";
import {Button, Input} from "antd";
import NewTask from "../Modal/NewTask";

const useStyles = makeStyles({
    taskBlock: {
        marginBottom: 30
    },
    addIcon: {
        cursor: "pointer",
        "&:hover": {
            color: variables['blue']
        }
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
    const [moveToTaskAdder, setMoveToTaskAdder] = useState(false);

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
    const [inputRef, setInputFocus] = useFocus();

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

    const moveToAdder = () => {
        setInputFocus();
        setMoveToTaskAdder(true);
    }
    const onAdd = (tasks) => {
        refreshTasks(tasks);
        moveToAdder();
    }
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState("");
    const [newTaskVisible, setNewTaskVisible] = useState(false);
    const showDetails = taskId => {
        setDetailsVisible(true);
        setCurrentTaskId(taskId);
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
                                {/*<ScrollIntoView style={{display: "inline-block"}} selector="#tasks-adder">*/}
                                {/*    */}
                                {/*</ScrollIntoView>*/}
                                <Input style={{width: 180, minWidth: 60}} placeholder="Search tasks" prefix={<MdIcon value="mdi-magnify mdi-18px" />}/>
                                <Button className={classes.headerBtn}>Assigned to Me</Button>
                                <Button onClick={() => setNewTaskVisible(true)} type="primary" className={classes.headerBtn}>
                                    <MdIcon value={"mdi-plus"} onClick={moveToAdder} className={classes.addIcon}/>
                                    New Task
                                </Button>

                            </div>
                            <div className="is-divider"/>
                            <DnDTable onAdd={onAdd} team={props.team} goal={props.goalId} project={props.project}
                                      adderId={"tasks-adder"} data={columns['tasks']}
                                      showAdder={moveToTaskAdder}
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
                        <div onClick={moveToAdder} className={classes.bottomAdder}>
                            <MdIcon value={"mdi-plus"}/><span>Create a new task</span>
                        </div>
                    </div>
                </DragDropContext>
            }
            {
                currentTaskId &&
                <TaskDetails visible={detailsVisible} setModalVisible={setDetailsVisible} data={tasks[currentTaskId]}/>
            }
            <NewTask visible={newTaskVisible} setModalVisible={setNewTaskVisible} onAdd={onAdd}  goal={props.goalId} project={props.project} team={props.team}/>
        </div>
    );
};

export default TaskList;
