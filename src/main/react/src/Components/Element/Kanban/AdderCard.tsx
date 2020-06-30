import React, {FormEvent, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import color from "../../../sass/colors.module.scss";
import TextField from "../Form/TextField";
import FormData from "../Form/FormData";
import PrioritySelector from "../Form/PrioritySelector";
import DatePickerField from "../Form/DatePickerField";
import IconButton from "../Form/IconButton";
import MdIcon from "../Icon/MDIcon";
import {Priority as PriorityType} from "../../../types";
import validate from "../../../service/validator";
import {Tooltip} from "antd";

const useStyles = makeStyles({
    // IMPORTANT: DO NOT ADD ANY TRANSITION PROPERTIES,
    // The task cards will jump around otherwise
    root: {
        marginTop: 5,
        marginBottom: 5,
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)",
        width: "100%",
        padding: 10,
        paddingBottom: 8,
        borderRadius: 4,
        backgroundColor: "white",
        minHeight: 100,
        fontSize: 14,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: color.textDarkColor,
        "&:hover": {
            boxShadow: "0 4px 6px 0 rgba(0,0,0,0.2)",
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
        marginBottom: 20
    },
    deadline: {
        fontSize: "12px",
        marginRight: 10
    },
    titleAdder: {
        border: "none",
        borderRadius: 0,
        outline: "none",
        boxShadow: "none",
        margin: 0,
        "&:focus": {
            outline: "none",
            boxShadow: "none",
            borderColor: "inherit"
        }
    },
    datePicker: {
        width: 100
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
const AdderCard = (props: { onSubmit: any }) => {
    const classes = useStyles();
    const [newTaskData, setNewTaskData] = useState({
        title: '',
        priority: 'MEDIUM' as PriorityType,
        deadline: ""
    });
    const [errors, setErrors] = useState<any>({});
    const handleSubmit = (event: FormEvent) => {
        const result = (validate(newTaskData, rules));
        if (result.success) {
            props.onSubmit(newTaskData);
        } else {
            setErrors(result.error);
        }
    }

    const onFormChange = (name: string, value: string) => {
        setNewTaskData({...newTaskData, [name]: value})
    }

    return (
        <div className={classes.root}>
            <FormData onChange={onFormChange} onSubmit={handleSubmit}>
                <Tooltip color={"volcano"} placement="right" visible={errors.title} title={errors.title}>

                    <div className={classes.title}>
                        <TextField autoFocus className={classes.titleAdder}/>
                    </div>
                </Tooltip>
                <div className={classes.footer}>
                    <div className={`${classes.inlineItems} ${classes.left}`}>
                        <PrioritySelector iconsOnly default="MEDIUM"/>
                    </div>
                    <div className={`${classes.inlineItems} ${classes.right}`}>
                            <span className={`${classes.dataElem} ${classes.deadline}`}>
                                <DatePickerField className={classes.datePicker} placeholder="Deadline"/>
                            </span>
                        <IconButton><MdIcon value={"mdi-18px mdi-check"}/></IconButton>

                    </div>
                </div>
            </FormData>
        </div>
    );
};

export default AdderCard;
