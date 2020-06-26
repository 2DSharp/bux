import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {TaskData} from "../../../types";


interface ColumnProps {
    data: string,
    tasks: TaskData[]
}

const useStyles = makeStyles({
    root: {
        margin: 10,
        borderRadius: 4,
        width: 300,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #f0f0f0",
    },
    header: {
        padding: 10
    },
    body: {
        backgroundColor: "#f0f0f0",
        minHeight: 100,
        padding: 5,
        flexGrow: 1,
        maxHeight: 500,
        overflowY: "auto",
        overflowX: "hidden"
    }
})
const Column = (props: ColumnProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <div className={classes.header}>{props.data}</div>
            <Droppable droppableId={props.data}>
                {provided =>
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.body}>
                        {props.tasks.map((task, index) => task &&
                            <Task index={index} key={task.id} data={task}/>)}
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>
    )
        ;
};

export default Column;
