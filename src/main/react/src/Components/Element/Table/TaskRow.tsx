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
        textAlign: "center"
    },
    priority: {
        width: 80
    },
    deadline: {
        width: 90,
        display: "inline-block"
    },
    title: {
    },
    assignedTo: {
        width: 20
    },
    row: {
        backgroundColor: "#fff",
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
        backgroundColor: "#deebff",
        "&:hover": {
            backgroundColor: "#94BEFF"
        }
    }
});
const TaskRow = (props: { data: TaskData, index: number, isCompleted: boolean, onClick: () => void }) => {
    const classes = useStyles();
    const taskIdClass = classNames({
        [classes.striked]: props.isCompleted
    });
    const rowClass = classNames({
        [classes.completed]: props.isCompleted
    })

    return <Draggable draggableId={props.data.id} index={props.index}>
        {provided =>
            <>
                <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                    className={`${classes.row} ${rowClass}`} onClick={props.onClick}>
                    <td className={classes.id}>
                        <span className={taskIdClass}>{props.data.id}</span>
                    </td>
                    <td className={classes.title}>{props.data.title}</td>
                    <td className={classes.assignedTo} style={{textAlign: "center"}}>
                        {props.data.assignee &&
                        <Link to={"/user/" + props.data.assignee.username}>
                            <AvatarIcon size="small" user={props.data.assignee}/>
                        </Link>
                        }
                    </td>
                    <td className={classes.priority} style={{textAlign: "center"}}>
                        <Priority type={props.data.priority}/>
                    </td>
                    <td style={{textAlign: "center"}}>
                        {props.data.deadline &&
                        <span className={classes.deadline}> {moment(props.data.deadline).format("MMM DD YYYY")}</span>}
                    </td>
                </tr>
            </>
        }
    </Draggable>
}

export default TaskRow;
