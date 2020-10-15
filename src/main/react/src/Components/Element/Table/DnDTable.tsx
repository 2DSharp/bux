import React, {useEffect, useState} from 'react';
import {Droppable} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import {Priority as PriorityType, TaskData} from "../../../types";
import variables from "../../../sass/colors.module.scss";
import TextField from "../Form/TextField";
import PrioritySelector from "../Form/PrioritySelector";
import DatePickerField from "../Form/DatePickerField";
import MdIcon from "../Icon/MDIcon";
import UserSelector from "../Form/UserSelector";
import FormData from "../Form/FormData";
import classNames from "classnames";
import validate, {isEmpty} from "../../../service/validator";
import {Tooltip} from "antd";
import {getRequest, postRequest} from "../../../service/request";
import TaskRow from "./TaskRow";
import {convertDateToLocalDate} from "../../../service/util";
import GeneralSpin from "../Loader/GeneralSpin";
import IconButton from "../Form/IconButton";
import {Link} from "react-router-dom";
import AvatarIcon from "../Icon/AvatarIcon";
import moment from "moment";
import Priority from "../Icon/Priority";

interface DnDTableData {
    id: string,
}

interface DnDTableProps {
    showAdder: boolean;
    data: DnDTableData
    tasks: TaskData[],
    adderId: string,
    project: string,
    team: string,
    goal?: number,
    statusList: string[],
    onSelect: (task: string) => void
}

const useStyles = makeStyles({
    id: {
        width: 80,
    },
    priority: {
        padding: "0 20px 0 20px"
    },
    deadline: {
        padding: "0 20px 0 20px",
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
        padding: "0 20px 0 20px"
    },
    row: {
        //backgroundColor: variables.primaryHover,

        //paddingLeft: 30,
        fontWeight: 500,
        width: "100%",
        display: "flex",
        padding: 10,
        //marginBottom: 5,
        fontSize: 14,
        borderBottom: `1px solid ${variables.borderColor}`,
    },

    text: {
        verticalAlign: "middle"
    },
    table: {
    },
    editable: {
        height: 30,

        "&:focus": {
            outline: "none",
            boxShadow: "none"
        }
    },
    check: {
        color: variables.primary,
        cursor: "pointer"
    },
    body: {},
    root: {
        margin: 10,
        padding: "0 5px"
    }
});

const DnDTable = (props: DnDTableProps) => {
    const classes = useStyles();

    return (
            <div className={`${classes.root}`}>
                <div className={`container is-hoverable ${classes.table}`}>
                    <div className={classes.row}>
                        <div className={`${classes.rowItem} ${classes.id}`}>
                            <span className={`${classes.text}`}>ID</span>
                        </div>
                        <div className={`${classes.rowItem} ${classes.title}`}><span
                            className={classes.text}>Title</span></div>
                        <div className={`${classes.rowItem} ${classes.assignedTo}`} >
                            <span className={`${classes.text}`}>Assignee</span>
                        </div>
                        <div className={`${classes.rowItem} ${classes.deadline}`}>
                            <span className={`${classes.text}`}>Deadline</span>
                        </div>
                        <div className={`${classes.rowItem} ${classes.priority}`}>
                            <span className={`${classes.text}`}>Priority</span>
                        </div>
                    </div>
                    <Droppable droppableId={props.data.id}>
                        {provided =>
                            <div {...provided.droppableProps} ref={provided.innerRef}>

                                {[...props.tasks].map((task, index) =>
                                    <TaskRow onClick={() => props.onSelect(task.id)}
                                             isCompleted={task.status == props.statusList[props.statusList.length - 1]}
                                             key={task.id} data={task} index={index}/>
                                )}
                                {provided.placeholder}
                            </div>
                        }
                    </Droppable>
                </div>
            </div>

    );
};

export default DnDTable;
