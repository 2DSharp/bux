import React, {useRef, useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import DnDTable from "./DnDTable";
import {DragHandler} from "../../../service/dragHandler";
import MdIcon from "../Icon/MDIcon";
import variables from "../../../sass/colors.module.scss"
import {postRequest} from "../../../service/request";
import ScrollIntoView from "react-scroll-into-view";

const useStyles = makeStyles({
    taskBlock: {
        marginBottom: 30
    },
    addIcon: {
        cursor: "pointer",
        "&:hover": {
            color: variables['blue']
        }
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
        const {destination, source, draggableId} = result;
        postRequest("/updateTaskList", {
                goalId: props.goalId,
                source: source.index,
                destination: destination.index
            }, (result) => {
                console.log(result);
            },
            (failure) => {
                console.log(failure);
            })
    }
    const onAdd = (task) => {
        setTasks({
            ...tasks,
            [task.id]: task
        })
        setColumns({
            ...columns,
            tasks: {
                ...columns.tasks,
                taskIds: [...columns.tasks.taskIds, task.id]
            }
        });

    }
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {
            htmlElRef.current && htmlElRef.current.focus()
        }

        return [htmlElRef, setFocus]
    }
    const [inputRef, setInputFocus] = useFocus();
    return (
        <div> {props.data &&
        <DragDropContext onDragEnd={handleDrag}>
            <div className={classes.taskBlock}>
                <div><h3><span style={{display: "inline-block", margin: 1}}>Tasks</span>
                    <ScrollIntoView style={{display: "inline-block"}} selector="#tasks-adder">
                        <MdIcon value={"mdi-plus"} onClick={setInputFocus}
                                className={classes.addIcon}/>
                    </ScrollIntoView>
                </h3></div>
                <div className="is-divider"/>
                <nav className={`panel`}>
                    <DnDTable onAdd={onAdd} goal={props.goalId} project={props.project}
                              adderId={"tasks-adder"} data={columns['tasks']}
                              moveToAdder={moveToTaskAdder}
                              inputRef={inputRef}
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
            </div>
        </DragDropContext>
        }
        </div>
    );
};

export default TaskList;
