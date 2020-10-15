import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {TaskData} from "../../../types";
import MdIcon from "../Icon/MDIcon";
import color from "../../../sass/colors.module.scss"
import NewTask from "../Modal/NewTask";

interface ColumnProps {
    data: string,
    index: number,
    tasks: TaskData[],
    setCurrentTaskId: (id: string) => void,
    goalId: string,
    project: string,
    team: string,
    onAdd: any
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
        textAlign: "center",
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
    const [newTaskVisible, setNewTaskVisible] = useState(false);

    return (
        <div className={classes.root}>

            <div className={classes.header}>
                <span className={classes.inlineItem}>{props.data}</span>

            </div>
            {props.index == 0 &&
            <div onClick={() => setNewTaskVisible(true)} className={classes.taskAdder}>
                <span>Add new task <MdIcon className={classes.taskAdderBtn} value={"mdi-plus mdi-24px"}/></span>
            </div>
            }
            <Droppable droppableId={props.data}>
                {provided =>
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.body}>
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
            <NewTask visible={newTaskVisible} setModalVisible={setNewTaskVisible} onAdd={props.onAdd}
                     goal={props.goalId}
                     project={props.project} team={props.team}/>
        </div>
    );
};

export default Column;
