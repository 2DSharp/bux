import React, {ReactNode, useRef, useState} from 'react';
import {Modal} from "antd";
import {TaskData} from "../../../types";
import {makeStyles} from "@material-ui/styles";
import PrioritySelector from "../Form/PrioritySelector";
import MarkdownIt from 'markdown-it'
import variables from "../../../sass/colors.module.scss"
import UserCardMin from "../Misc/UserCardMin";
import TextField from "../Form/TextField";
import FormData from "../Form/FormData";
import Editor from "rich-markdown-editor";
import base from "rich-markdown-editor/dist/theme";
import {Constants} from "../../../constants";

interface TaskDetailsProps {
    visible: boolean

    setModalVisible(isVisible: boolean): void;

    data: TaskData
}

const useStyles = makeStyles({
    root: {
        width: "80% !important",
        maxWidth: "800px"
    },
    field: {
        display: "flex",
        width: 320,
        margin: "10px 0px",
        fontSize: 14
    },
    fieldName: {
        fontWeight: "bold",
        width: 140,
        fontSize: 13,
        padding: "5px 0"
    },
    fieldValue: {
        flexGrow: 1,
        borderRadius: 4,
        border: "1px solid rgba(0,0,0,0)",
        "&:hover": {
            borderColor: variables.primaryLight,
        },
        transition: "all 0.2s ease-in",
        padding: 5
    },
    fieldCol: {
        //padding: 5
    },
    description: {
        margin: "5px 0",
        paddingTop: 10
    },
    body: {
        padding: "10px 15px"
    },
    detailFields: {
        marginTop: 10,
        marginBottom: 10
    },
    editor: {
        margin: "10px 30px",
    },
    descriptionField: {
        margin: "5px 0",
        maxHeight: 150,
        overflowY: "auto",
        borderRadius: 4,
        border: "1px solid rgba(0,0,0,0)",
        "&:hover": {
            borderColor: variables.primaryLight,
        },
        transition: "all 0.2s ease-in",
    }
})
const Field = (props: { name: string, value: string | ReactNode, edit?: ReactNode }) => {
    const styles = useStyles();
    const [editing, setEditing] = useState(false);
    const ref = useRef();
    const handleFocus = (event: any) => event.target && event.target.select();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    const onChange = (name: string, value: string) => {
        setErrors({...errors, [name]: null});
        setValues({...values, [name]: value})
    }

    const onSubmit = () => {

    }

    return <div className={styles.field}>
        <div className={`${styles.fieldCol} ${styles.fieldName}`}>
            {props.name}
        </div>
        {editing ? <FormData onChange={onChange} onSubmit={onSubmit}>
                <TextField autoFocus onFocus={handleFocus} forwardRef={ref} onBlur={() => setEditing(false)}
                           defaultValue={props.value}/>
            </FormData>
            : <div onClick={() => setEditing(true)} className={`${styles.fieldCol} ${styles.fieldValue}`}>
                {props.value}
            </div>}
    </div>
};
const TaskDetails = (props: TaskDetailsProps) => {
    const {data} = props;
    console.log(data);
    const styles = useStyles();

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    return (
        <Modal
            centered
            className={styles.root}
            bodyStyle={{minHeight: 400}}
            title={data.id}
            visible={props.visible}
            okButtonProps={{style: {display: 'none'}}}
            onCancel={() => props.setModalVisible(false)}
        >
            <div className={styles.body}>
                <h2>{data.title}</h2>
                <div className={styles.description}>
                    <b>Description</b>
                    <div className={styles.descriptionField}>
                        <Editor
                            theme={{...base, zIndex: Constants.zIndex.modal + 100}}
                            defaultValue={data.description && data.description}
                            onChange={(value) => console.log(value)}
                            placeholder={"Add a description..."}
                            className={styles.editor}
                        />
                    </div>
                </div>
                <p>
                    <div className={styles.detailFields}>
                        <Field name={"Created By"} value={<UserCardMin user={data.createdBy}/>}/>
                        {data.assignee && <Field name={"Assignee"} value={<UserCardMin user={data.assignee}/>}/>}
                        <Field name={"Priority"} value={<PrioritySelector default={data.priority}/>}/>
                        <Field name={"Deadline"} value={data.deadline}/>
                    </div>
                </p>
            </div>
        </Modal>
    );
};

export default TaskDetails;
