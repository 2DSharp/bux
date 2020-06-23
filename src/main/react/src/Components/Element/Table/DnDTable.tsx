import React, {useState} from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import {TaskData, User} from "../../../types";
import Priority from "../Icon/Priority";
import variables from "../../../sass/colors.module.scss";
import TextField from "../Form/TextField";
import PrioritySelector from "../Form/PrioritySelector";
import DatePickerField from "../Form/DatePickerField";
import moment from 'moment';
import MdIcon from "../Icon/MDIcon";
import UserSelector from "../Form/UserSelector";
import AvatarIcon from "../Icon/AvatarIcon";
import {Link} from "react-router-dom";
import FormData from "../Form/FormData";

interface DnDTableData {
    id: string,
}

interface DnDTableProps {
    data: DnDTableData
    tasks: TaskData[],
    displayAdded?: boolean
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
        width: 60
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
const TaskRow = (props: { data: TaskData, index: number }) => {
    const classes = useStyles();
    return <Draggable draggableId={props.data.id} index={props.index}>
        {provided =>
            <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                className={classes.row}>
                <td className={classes.id}>{props.data.id}</td>
                <td className={classes.title}>{props.data.title}</td>
                <td className={classes.assignedTo} style={{textAlign: "center"}}>
                    {props.data.assignee &&
                    <Link to={"/user/" + props.data.assignee.username}>
                        <AvatarIcon size="small" user={props.data.assignee}/>
                    </Link>
                    }
                </td>
                <td className={classes.priority} style={{textAlign: "center"}}><Priority type={props.data.priority}/>
                </td>
                <td className={classes.deadline} style={{textAlign: "center"}}>25-07-2020</td>
            </tr>
        }
    </Draggable>
}

const DnDTable = (props: DnDTableProps) => {
    const classes = useStyles();
    const [saveIconHover, setSaveIconHover] = useState(false);
    return (
        <table className={`table container is-fluid is-hoverable ${classes.table}`}>

            <Droppable droppableId={props.data.id}>
                {provided =>
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {props.displayAdded &&
                    <FormData onChange={() => {
                    }}>
                        <tr className={classes.row} style={{backgroundColor: "rgba(135, 206, 235, 0.2)"}}>

                            <td style={{textAlign: "center"}} className={classes.id}>
                                <MdIcon onMouseOver={() => setSaveIconHover(true)}
                                        onMouseOut={() => setSaveIconHover(false)}
                                        className={`${classes.check} ${classes.editable}`}
                                        value={`${saveIconHover ? "mdi-check-circle" : "mdi-check-circle-outline"} mdi-24px`}/>
                            </td>
                            <td className={classes.title}>
                                <TextField autoFocus placeholder="What's the task?" className={classes.editable}/>
                            </td>
                            <td>
                                <UserSelector users={users} style={{width: 140}} placeholder="Assign to..."/>
                            </td>
                            <td className={classes.priority}>
                                <PrioritySelector style={{width: 60}} iconsOnly default="MEDIUM"
                                                  className={"overriden"}/>
                            </td>
                            <td className={classes.deadline}>
                                <DatePickerField style={{width: 120}} disablePast
                                                 format="MMM DD YYYY"
                                                 default={moment()}
                                                 className={classes.editable}/>
                            </td>
                        </tr>
                    </FormData>
                    }

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
