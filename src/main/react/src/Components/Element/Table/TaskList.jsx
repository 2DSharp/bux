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
        marginBottom: "10px !important"
    },
    bottomAdder: {
        color: variables['blue'],
        cursor: "pointer",
        fontSize: "15px"
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
                        <div><h3><span style={{display: "inline-block", margin: 1}}>Tasks</span>
                            <ScrollIntoView style={{display: "inline-block"}} selector="#tasks-adder">
                                <MdIcon value={"mdi-plus"} onClick={moveToAdder}
                                        className={classes.addIcon}/>
                            </ScrollIntoView>
                        </h3></div>
                        <div className="is-divider"/>
                        <nav className={`panel ${classes.panel}`}>
                            <DnDTable onAdd={onAdd} goal={props.goalId} project={props.project}
                                      adderId={"tasks-adder"} data={columns['tasks']}
                                      showAdder={moveToTaskAdder}
                                      inputRef={inputRef}
                                      statusList={props.statusList}
                                      onSelect={taskId => {
                                          showDetails(taskId)
                                      }}
                                      tasks={columns['tasks'].taskIds.map(task => tasks[task])}/>
                        </nav>
                        <div onClick={moveToAdder} className={classes.bottomAdder}><MdIcon value={"mdi-plus"}/><span>Create a new task</span>
                        </div>
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
                    </div>
                </DragDropContext>
            }
            {
                currentTaskId &&
                <TaskDetails visible={detailsVisible} setModalVisible={setDetailsVisible} data={tasks[currentTaskId]}/>
            }
        </div>
    );
};

export default TaskList;
