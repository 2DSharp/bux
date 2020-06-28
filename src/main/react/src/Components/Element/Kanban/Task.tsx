import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Draggable} from "react-beautiful-dnd";
import {TaskData} from "../../../types";
import color from "../../../sass/colors.module.scss"
import Priority from "../Icon/Priority";
import moment from 'moment';

interface TaskProps {
    data: TaskData,
    index: number
}

const useStyles = makeStyles({
    // IMPORTANT: DO NOT ADD ANY TRANSITION PROPERTIES,
    // The task cards will jump around otherwise
    root: {
        marginTop: 5,
        marginBottom: 5,
        boxShadow: "0 2px 3px 1px rgba(0,0,0,0.2)",
        width: "100%",
        padding: 10,
        paddingBottom: 8,
        borderRadius: 4,
        backgroundColor: "white",
        minHeight: 100,
        cursor: "move",
        fontSize: 14,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        "&:hover, &:focus": {
            boxShadow: "0 4px 6px 0 rgba(0,0,0,0.2)",
            backgroundColor: "rgba(148,190,255, 0.2)"
        }
    },
    footer: {
        marginTop: 5
    },
    inlineItems: {
        display: "inline-block",
    },
    left: {},
    right: {
        float: "right"
    },

    dataElem: {
        margin: 3,
        color: "rgba(0,0,0, 0.6)"
    },
    title: {
        color: color.textDarkColor,
        marginBottom: 10
    },
    deadline: {
        fontSize: "12px"
    }
});
const Task = (props: TaskProps) => {
    const classes = useStyles();
    const {data} = props;
    return (
        <Draggable draggableId={data.id} index={props.index}>
            {provided =>
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                     className={classes.root}>
                    <p className={classes.title}>{data.title}</p>
                    <div className={classes.footer}>
                        <div className={`${classes.inlineItems} ${classes.left}`}>
                            <span className={classes.dataElem}> {data.id} </span>
                            <Priority type={data.priority}/>
                        </div>
                        <div className={`${classes.inlineItems} ${classes.right}`}>
                            <span
                                className={`${classes.dataElem} ${classes.deadline}`}>{moment(data.deadline).format("MMM DD")}</span>
                        </div>
                    </div>
                </div>
            }
        </Draggable>
    );
};

export default Task;