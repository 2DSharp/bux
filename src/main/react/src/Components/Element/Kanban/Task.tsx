import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Draggable} from "react-beautiful-dnd";

export interface TaskData {
    id: string,
    title: string
}

interface TaskProps {
    data: TaskData,
    index: number
}

const useStyles = makeStyles({
    root: {
        marginTop: 5,
        marginBottom: 5,
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)",
        transition: "0.2s",
        width: "100%",
        padding: 10,
        borderRadius: 4,
        backgroundColor: "white",
        minHeight: 80,
        cursor: "move",
        fontSize: 14,
        "&:hover": {
            boxShadow: "0 4px 6px 0 rgba(0,0,0,0.2)"
        }
    }
});
const Task = (props: TaskProps) => {
    const classes = useStyles();
    return (
        <Draggable draggableId={props.data.id} index={props.index}>
            {provided =>
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                     className={classes.root}>
                    <p>{props.data.title}</p>
                </div>
            }
        </Draggable>
    );
};

export default Task;