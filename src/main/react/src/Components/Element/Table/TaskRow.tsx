import React from 'react';
import {TaskData} from "../../../types";
import {Draggable} from "react-beautiful-dnd";
import {Link} from "react-router-dom";
import AvatarIcon from "../Icon/AvatarIcon";
import Priority from "../Icon/Priority";
import moment from "moment";
import {makeStyles} from "@material-ui/styles";
import variables from "../../../sass/colors.module.scss";
import classNames from "classnames";

const useStyles = makeStyles({
    id: {
        width: 80,
    },
    priority: {
        width: 84,
        textAlign: "center",
    },
    deadline: {
        width: 94,
        textAlign: "center",
        display: "inline-block"
    },
    rowItem: {
        display: "inline-block",
        verticalAlign: "middle"
    },
    title: {
        flexGrow: 1,
    },
    assignedTo: {
        textAlign: "center",
        width: 95,
    },
    row: {
        backgroundColor: "#fff",
        width: "100%",
        display: "flex",
        padding: 7,
        fontSize: 14,
        borderBottom: `1px solid ${variables.borderColor}`,
        "&:hover, &:focus": {
            backgroundColor: "rgba(148,190,255, 0.2)",
        }
    },
    table: {
        border: `1px solid ${variables.borderColor}`,
    },
    editable: {
        height: 30,

        "&:focus": {
            outline: "none",
            boxShadow: "none"
        }
    },
    check: {
        color: variables.blue,
        cursor: "pointer"
    },
    striked: {
        textDecoration: "line-through"
    },
    completed: {
        backgroundColor: "rgba(255,255,0,0.05)"
    },
    text: {
        verticalAlign: "middle"
    }
});
const TaskRow = (props: { data: TaskData, index: number, isCompleted: boolean, onClick: () => void }) => {
    const classes = useStyles();
    const taskIdClass = classNames({
        [classes.striked]: props.isCompleted
    });
    const rowClass = classNames( {
        [classes.completed]: props.isCompleted
    })

    return <Draggable draggableId={props.data.id} index={props.index}>
        {provided =>
            <>
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                     className={`${classes.row} ${rowClass}`} onClick={props.onClick}>
                    <div className={`${classes.rowItem} ${classes.id}`}>
                        <span className={`${classes.text} ${taskIdClass}`}>{props.data.id}</span>
                    </div>
                    <div className={`${classes.rowItem} ${classes.title}`}><span className={classes.text}>{props.data.title}</span></div>
                    <div className={`${classes.rowItem} ${classes.assignedTo}`}>
                        {props.data.assignee &&
                        <Link to={"/user/" + props.data.assignee.username}>
                            <AvatarIcon size="small" user={props.data.assignee}/>
                        </Link>
                        }
                    </div>
                    <div className={classes.rowItem}>
                        {props.data.deadline &&
                        <span className={`${classes.deadline} ${classes.text}`}> {moment(props.data.deadline).format("MMM DD")}</span>}
                    </div>
                    <div className={`${classes.rowItem} ${classes.priority}`} >
                        <Priority type={props.data.priority}/>
                    </div>

                </div>
            </>
        }
    </Draggable>
}

export default TaskRow;
