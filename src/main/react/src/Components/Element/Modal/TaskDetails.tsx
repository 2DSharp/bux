import React, {ReactNode, useRef, useState} from 'react';
import {Button as AntButton, Modal} from "antd";
import {TaskData} from "../../../types";
import {makeStyles} from "@material-ui/styles";
import PrioritySelector from "../Form/PrioritySelector";
import variables from "../../../sass/colors.module.scss"
import UserCardMin from "../Misc/UserCardMin";
import TextField from "../Form/TextField";
import FormData from "../Form/FormData";
import Editor from "rich-markdown-editor";
import base from "rich-markdown-editor/dist/theme";
import {Constants} from "../../../constants";
import PrimaryButton from "../Button/PrimaryButton";
import MdIcon from "../Icon/MDIcon";
import AnimatedSubscribe from "../Icon/AnimatedIcon/AnimatedSubscribe";
import Button from "../Button/Button";
import {LinkOutlined} from '@ant-design/icons';

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
        width: 280,
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
    taskActions: {
        display: "flex",
        margin: "5px 0",
    },
    description: {
        margin: "5px 0",
        paddingTop: 10,
    },
    descriptionBody: {
        "&:after": {
            content: "''",
            marginTop: 5,
            display: "block",
            borderBottom: `1px solid ${variables.primary}`,
            transform: "scaleX(0)",
            transition: "transform 250ms ease-in-out",
            transformOrigin: "0% 50%"
        },
        "&:hover:after": {
            transform: "scaleX(1)"
        }
    },
    body: {
        padding: "10px 15px"
    },
    detailFields: {
        marginTop: 5,
        marginBottom: 5,
        display: "flex"
    },
    editor: {
        margin: "10px 0",
    },
    commentEditor: {
        border: `1px solid ${variables.borderColor}`,
        margin: "5px 0",
        padding: 5
    },
    descriptionField: {
        margin: "5px 0 5px 0",
        maxHeight: 150,
        overflowY: "auto",
    },
    descriptionEditor: {
        padding: "0 25px",
        borderBottom: `1px solid ${variables.primary}`,
        marginBottom: 10
    },
    descriptionActions: {
        textAlign: "right",
        "& > button": {
            fontSize: 14,
            borderRadius: 4,
            margin: "0 5px"
        }
    },
    commentActions: {
        "& > button": {
            fontSize: 12,
            borderRadius: 4,
            margin: 3,
            padding: 5
        }
    },
    taskActionIcon: {
        margin: "0 7px",
        cursor: "pointer",
        "&:hover": {
            color: variables.primary
        }
    },
    commentArea: {
        margin: "10px 0"
    }
})
const Field = (props: { name: string, value: string | ReactNode, edit?: ReactNode, editable?: boolean }) => {
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
                <TextField style={{width: 140}} autoFocus onFocus={handleFocus} forwardRef={ref}
                           onBlur={() => setEditing(false)}
                           defaultValue={props.value}/>
            </FormData>
            : <div onClick={() => props.editable && setEditing(true)}
                   className={`${styles.fieldCol} ${props.editable && styles.fieldValue}`}>
                {props.value}
            </div>}
    </div>
};
const TaskDetails = (props: TaskDetailsProps) => {
    const {data} = props;
    const styles = useStyles();

    const [descriptionEditorOn, setDescriptionEditorOn] = useState(false);

    const showDescriptionEditor = () => {
        setDescriptionEditorOn(true);
    }
    const submitNewDescription = () => {
        setDescriptionEditorOn(false);
    }
    return (
        <Modal
            centered
            className={styles.root}
            bodyStyle={{minHeight: 400}}
            title={data.id}
            visible={props.visible}
            okButtonProps={{style: {display: 'none'}}}
            onCancel={() => props.setModalVisible(false)}
            destroyOnClose
            afterClose={() => setDescriptionEditorOn(false)}
        >
            <div className={styles.body}>
                <h2 style={{
                    fontWeight: 500,
                    color: "rgba(0, 0, 0, 0.65)",
                    fontFamily: "Poppins, Arial, serif"
                }}>{data.title}</h2>
                <div className={styles.description}>
                    <b>Description</b>
                    <div className={styles.descriptionField}>
                        {descriptionEditorOn ?
                            <div className={styles.descriptionEditor}>
                                <Editor
                                    ref={input => input && input.focusAtEnd()}
                                    key={data.id}
                                    theme={{...base, zIndex: Constants.zIndex.modal + 100}}
                                    defaultValue={data.description}
                                    onChange={(value) => console.log(value().trim())}
                                    placeholder={"Add a description..."}
                                    className={styles.editor}
                                />
                            </div>
                            :
                            <div className={styles.descriptionBody}
                                 onClick={showDescriptionEditor}>{data.description ? data.description :
                                "Add a description..."}</div>
                        }
                    </div>
                    {descriptionEditorOn &&
                    <div className={styles.descriptionActions}>
                        <Button onClick={() => setDescriptionEditorOn(false)}
                                className={`${styles.descriptionActions} is-light`}>Cancel</Button>
                        <PrimaryButton className={styles.descriptionActions}>Save</PrimaryButton>
                    </div>
                    }

                </div>
                <div className={styles.detailFields}>
                    <div style={{flexGrow: 1, marginRight: 10}}>
                        <div className={styles.taskActions}>
                            <div style={{padding: "5px 0"}}>
                                <MdIcon value={"mdi-thumb-up-outline mdi-24px"} className={styles.taskActionIcon}/>
                                <AnimatedSubscribe className={`mdi-24px ${styles.taskActionIcon}`}/>
                                <MdIcon value={"mdi-share-variant mdi-24px"} className={styles.taskActionIcon}/>
                            </div>
                            <div style={{textAlign: "right", flexGrow: 1}}>
                                <AntButton icon={<LinkOutlined/>}><span>Link work</span></AntButton>
                            </div>
                        </div>
                        <div className={styles.commentArea}>
                            <b>Comments</b>
                            <Editor
                                key={data.id}
                                theme={{...base, zIndex: Constants.zIndex.modal + 100}}
                                defaultValue={data.description}
                                onChange={(value) => console.log(value().trim())}
                                placeholder={"Add a description..."}
                                className={styles.commentEditor}
                            />
                            <div className={styles.commentActions}>
                                <PrimaryButton className={styles.commentActions}>Comment</PrimaryButton>
                                <Button style={{marginLeft: 5}}
                                        className={`${styles.commentActions} is-light`}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft: 10}}>
                        <Field editable name={"Created By"} value={<UserCardMin user={data.createdBy}/>}/>
                        {data.assignee &&
                        <Field editable name={"Assignee"} value={<UserCardMin user={data.assignee}/>}/>}
                        <Field name={"Priority"}
                               value={<PrioritySelector style={{padding: 5, flexGrow: 1,}} default={data.priority}/>}/>
                        <Field editable name={"Deadline"} value={data.deadline}/>
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default TaskDetails;
