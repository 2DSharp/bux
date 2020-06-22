import React from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";
import {TaskData} from "../Kanban/Task";
import {makeStyles} from "@material-ui/styles";

interface DnDTableData {
    id: string
}

interface DnDTableProps {
    data: DnDTableData
    tasks: TaskData[]
}

const useStyles = makeStyles({
    id: {
        width: 20
    },
    priority: {
        width: 20
    },
    deadline: {
        width: 60
    },
    title: {
        width: "100%"
    },
    row: {
        backgroundColor: "#fff",
        "&:hover": {
            backgroundColor: "rgb(0, 0, 255, 0.1)"
        }
    }
});
const TaskRow = (props: { data: TaskData, index: number }) => {
    const classes = useStyles();
    return <Draggable draggableId={props.data.id} index={props.index}>
        {provided =>
            <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                className={classes.row}>
                <td className={classes.id}>{props.data.id}</td>
                <td className={classes.title}>{props.data.title}</td>
                <td className={classes.priority}>LOW</td>
                <td className={classes.deadline}>25-07-2020</td>
            </tr>
        }
    </Draggable>
}

const DnDTable = (props: DnDTableProps) => {
    return (

        <table className="table container is-fluid is-hoverable">

            <Droppable droppableId={props.data.id}>
                {provided =>
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {props.tasks.map((task, index) =>
                        <TaskRow key={task.id} data={task} index={index}/>
                    )}


                    {provided.placeholder}
                    </tbody>
                }
            </Droppable>
        </table>
    );
};

export default DnDTable;
