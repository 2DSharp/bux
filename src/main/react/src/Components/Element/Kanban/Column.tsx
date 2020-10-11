import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {Priority, TaskData} from "../../../types";
import MdIcon from "../Icon/MDIcon";
import AdderCard from "./AdderCard";
import color from "../../../sass/colors.module.scss"

interface ColumnProps {
    data: string,
    index: number,
    tasks: TaskData[],
    setCurrentTaskId: (id: string) => void
}

const useStyles = makeStyles({
    root: {
        borderRadius: 4,
        width: "30%",
        display: "flex",
        flexDirection: "column",
        padding: 10,
        paddingTop: 3,
        minHeight: 400,
        borderRight: "1px solid #f0f0f0",
    },
    header: {
        padding: 10,
        // boxShadow: "0 4px 4px -6px #222",
        fontWeight: 500,
        fontSize: 17,
        color: color.textDarkColor,
    },
    body: {
        minHeight: 100,
        padding: 5,
        flexGrow: 1,
        maxHeight: 500,
        overflowY: "auto",
        overflowX: "hidden"
    },
    inlineItem: {
        display: "inline-flex",
        verticalAlign: "middle"
    },
    taskAdderBtn: {
        float: "right",
        cursor: "pointer",
        transition: "transform 80ms ease-in",
        textAlign: "center",
        "&:hover": {
            transform: "scale(1.2)"
        }
    },
    taskAdder: {
        margin: 5,
        cursor: "pointer",
        transition: "all 0.2s ease-in",
        borderRadius: 8,
        backgroundColor: color.primaryDark,
        color: "#fff",
        marginTop: 15,
        boxShadow: "0 3px 5px rgba(0, 0, 0, 0.18)",
        padding: 15,
        "&:hover": {
            backgroundColor: color.primaryHover,
            color: color.primaryDark
        }
    }
})
const Column = (props: ColumnProps) => {
    const classes = useStyles();
    const [activateAdder, setActivateAdder] = useState(false);
    const addNewTask = (data: { title: string, priority: Priority, deadline: string }) => {

    }
    return (
        <div className={classes.root}>

            <div className={classes.header}>
                <span className={classes.inlineItem}>{props.data}</span>

            </div>
            {props.index == 0 &&
            <div className={classes.taskAdder}>
                <span>Add new task
                <MdIcon onClick={() => setActivateAdder(!activateAdder)}
                        className={`${classes.inlineItem} ${classes.taskAdderBtn}`}
                        value={activateAdder ? "mdi-minus mdi-24px" : "mdi-plus mdi-24px"}/>
                         </span>
            </div>
            }
            <Droppable droppableId={props.data}>
                {provided =>
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.body}>
                        {
                            activateAdder && <AdderCard onSubmit={addNewTask}/>
                        }
                        {
                            props.tasks.map((task, index) => task &&
                                <Task onClick={() => {
                                    props.setCurrentTaskId(task.id)
                                }} index={index} key={task.id} data={task}/>)
                        }
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>
    );
};

export default Column;
