import React, {useState} from 'react';
import {Droppable} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import {Priority as PriorityType, TaskData, User} from "../../../types";
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
import {postRequest} from "../../../service/request";
import TaskRow from "./TaskRow";
import {convertDateToLocalDate} from "../../../service/util";
import GeneralSpin from "../Loader/GeneralSpin";

interface DnDTableData {
    id: string,
}

interface DnDTableProps {
    data: DnDTableData
    tasks: TaskData[],
    inputRef?: any,
    adderId: string,
    project: string,
    goal?: number,
    onAdd: any
}

const users: User[] = [
    {
        name: "Dedipyaman",
        username: "twodee"
    },
    {
        name: "John Doe",
        username: "jdoe"
    }
]

const useStyles = makeStyles({
    id: {
        width: 20,
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
        width: "100%"
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
    }
});

const rules = {
    title: {
        required: true,
        message: {
            required: "Enter a task name for a small task. Example: Fix the launch pad"
        }
    }
}
const DnDTable = (props: DnDTableProps) => {
    const classes = useStyles();
    const [actionIconHover, setActionIconHover] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [showLoader, setShowLoader] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        priority: 'MEDIUM' as PriorityType,
        deadline: ""
    });
    const onFormChange = (name: string, value: string) => {
        setErrors({...errors, [name]: null});
        setNewTaskData({...newTaskData, [name]: value})
    }

    const onSubmit = () => {
        setShowLoader(true);
        const result = (validate(newTaskData, rules));
        if (result.success) {
            postRequest('/tasks/create', {
                    ...newTaskData,
                    deadline: newTaskData["deadline"] ? convertDateToLocalDate(newTaskData["deadline"]) : null,
                    projectKey: props.project,
                    goalId: props.goal
                },
                (result: TaskData) => {
                    setShowLoader(false);
                    props.onAdd(result);
                    setNewTaskData({...newTaskData, title: ""});
                }, (failure) => {
                    console.log(failure);
                    setShowLoader(false)
                })
        } else {
            setErrors(result.error);
        }
    }
    const actionValue = classNames("mdi-24px", {
        "mdi-check-circle-outline": !actionIconHover,
        "mdi-check-circle": actionIconHover
    });
    return (
        <FormData onChange={onFormChange} onSubmit={onSubmit}>
            <table className={`table container is-fluid is-hoverable ${classes.table}`}>

                <Droppable droppableId={props.data.id}>
                    {provided =>
                        <tbody {...provided.droppableProps} ref={provided.innerRef}>

                        {[...props.tasks].map((task, index) =>
                            <TaskRow key={task.id} data={task} index={index}/>
                        )}
                        {provided.placeholder}
                        <tr id={props.adderId}/>
                        <tr className={classes.row} style={{backgroundColor: "rgba(135, 206, 235, 0.2)"}}>

                            <td style={{textAlign: "center"}} className={classes.id}>
                                {
                                    showLoader && <GeneralSpin size={24}/>
                                }

                                {(!showLoader && !isEmpty(newTaskData['title'])) &&
                                <MdIcon onMouseOver={() => setActionIconHover(true)}
                                        onMouseOut={() => setActionIconHover(false)}
                                        onClick={onSubmit}
                                        className={`${classes.check} ${classes.editable}`}
                                        value={actionValue}/>

                                }
                            </td>
                            <td className={classes.title}>
                                <Tooltip color={"volcano"} visible={errors.title} title={errors['title']}>
                                    <TextField value={newTaskData['title']} name="title"
                                               forwardRef={props.inputRef}
                                               placeholder="What's the task?"
                                               className={classes.editable}/>
                                </Tooltip>

                            </td>
                            <td>
                                <UserSelector name="assignee" users={users} style={{width: 140}}
                                              placeholder="Assign to..."/>
                            </td>
                            <td className={classes.priority}>
                                <PrioritySelector name="priority" style={{width: 60}} iconsOnly default="MEDIUM"
                                                  className={"overriden"}/>
                            </td>
                            <td>
                                <DatePickerField name="deadline" style={{width: 120}} disablePast
                                                 format="MMM DD YYYY"
                                                 className={classes.editable}/>
                            </td>
                        </tr>
                        </tbody>
                    }
                </Droppable>
            </table>
        </FormData>

    );
};

export default DnDTable;
