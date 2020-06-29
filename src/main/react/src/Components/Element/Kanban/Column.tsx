import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {TaskData} from "../../../types";
import MdIcon from "../Icon/MDIcon";
import AdderCard from "./AdderCard";


interface ColumnProps {
    data: string,
    index: number,
    tasks: TaskData[]
}

const useStyles = makeStyles({
    root: {
        marginRight: 10,
        borderRadius: 4,
        width: 320,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f0f0"
        // border: "1px solid #f0f0f0",
    },
    header: {
        padding: 10,
        // boxShadow: "0 4px 4px -6px #222",
        zIndex: 100
    },
    body: {
        backgroundColor: "#f0f0f0",
        minHeight: 100,
        padding: 5,
        flexGrow: 1,
        maxHeight: 500,
        overflowY: "auto",
        overflowX: "hidden"
    },
    inlineItem: {
        display: "inline-block"
    },
    taskAdder: {
        float: "right",
        cursor: "pointer",
        transition: "transform 80ms ease-in",
        textAlign: "center",
        "&:hover": {
            transform: "scale(1.2)"
        }
    }
})
const Column = (props: ColumnProps) => {
    const classes = useStyles();
    const [activateAdder, setActivateAdder] = useState(false);
    return (
        <div className={classes.root}>

            <div className={classes.header}>
                <span className={classes.inlineItem}>{props.data}</span>
                {props.index == 0 &&
                <MdIcon onClick={() => setActivateAdder(!activateAdder)}
                        className={`${classes.inlineItem} ${classes.taskAdder}`}
                        value={activateAdder ? "mdi-minus" : "mdi-plus"}/>
                }
            </div>
            <Droppable droppableId={props.data}>
                {provided =>
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.body}>
                        {
                            activateAdder && <AdderCard onSubmit={() => {
                            }}/>
                        }
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
