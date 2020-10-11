import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Draggable} from "react-beautiful-dnd";
import {TaskData} from "../../../types";
import color from "../../../sass/colors.module.scss"
import Priority from "../Icon/Priority";
import moment from 'moment';
import {Link} from "react-router-dom";
import AvatarIcon from "../Icon/AvatarIcon";
interface TaskProps {
    data: TaskData,
    index: number,
    onClick: () => void
}

const useStyles = makeStyles({
    // IMPORTANT: DO NOT ADD ANY TRANSITION PROPERTIES,
    // The task cards will jump around otherwise
    root: {
        marginTop: 10,
        marginBottom: 15,
        boxShadow: `0 7px 15px -10px ${color.primaryLight}`,
        width: "100%",
        padding: 15,
        paddingBottom: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
        minHeight: 100,
        cursor: "move",
        fontSize: 14,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: "all 0.2s ease-in",
        "&:hover, &:focus": {
            boxShadow: "0 4px 6px 0 rgba(0,0,0,0.2)",
            backgroundColor: "rgba(148,190,255, 0.2)",
            cursor: "move"
        }
    },
    footer: {
        marginTop: 5,
        marginBottom: 3
    },
    inlineItems: {
        display: "inline-block",
    },
    left: {},
    right: {
        float: "right"
    },

    dataElem: {
        color: "rgba(0,0,0, 0.6)"
    },
    title: {
        color: color.textPurple,
        fontSize: 15,
        fontWeight: 400,
        fontFamily: "Poppins, Arial, serif"
    },
    deadline: {
        fontSize: "14px"
    }
});
const Task = (props: TaskProps) => {
    const classes = useStyles();
    const {data} = props;

    return (
        <Draggable draggableId={data.id} index={props.index}>
            {provided =>
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                     onClick={props.onClick}
                     className={classes.root}>
                    <p className={classes.title}>{data.title}</p>
                    <span style={{fontSize: 12}} className={classes.dataElem}> {data.id} </span>

                    <div style={{paddingBottom: 10, color: "grey"}}>
                    </div>
                    <div className={classes.footer}>
                        <div className={`${classes.inlineItems} ${classes.left}`}>
                            <Priority type={data.priority}/>
                        </div>
                        <div className={`${classes.inlineItems} ${classes.right}`}>
                            {data.assignee &&
                            <Link style={{verticalAlign: "middle", margin: "0 5px 0 5px"}} to={"/user/" + data.assignee.username}>
                                <AvatarIcon size="small" user={data.assignee}/>
                            </Link>
                            }
                            <span style={{verticalAlign: "middle"}}
                                className={`${classes.dataElem} ${classes.deadline}`}>{data.deadline && moment(data.deadline).format("MMM DD")}</span>
                        </div>
                    </div>
                </div>
            }
        </Draggable>
    );
};

export default Task;