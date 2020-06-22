import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import DnDTable from "./DnDTable";
import {DragHandler} from "../../../service/dragHandler";

const useStyles = makeStyles({
    taskBlock: {
        marginBottom: 30
    }
});
const TaskList = (props) => {
    const classes = useStyles();
    const [columns, setColumns] = useState(props.data.columns);

    return (
        <div>
            <DragDropContext onDragEnd={result => DragHandler.dragEnd(result, columns, setColumns)}>
                <div className={classes.taskBlock}>
                    <div><h2>Tasks</h2></div>
                    <div className="is-divider"/>
                    <nav className={`panel`}>
                        <DnDTable data={columns['tasks']}
                                  tasks={columns['tasks'].taskIds.map(task => props.data.tasks[task])}/>
                    </nav>
                </div>
                <div className={classes.taskBlock}>
                    <div><h2>Backlog</h2></div>
                    <nav className={`panel`}>
                        <DnDTable data={columns['backlog']}
                                  tasks={columns['backlog'].taskIds.map(task => props.data.tasks[task])}/>
                    </nav>
                </div>
            </DragDropContext>

        </div>
    );
};

export default TaskList;
