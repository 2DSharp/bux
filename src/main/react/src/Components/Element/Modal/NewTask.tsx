import React, {useEffect, useState} from 'react';
import {Modal, Tooltip} from "antd";
import FormData from "../Form/FormData";
import InputContainer from "../Form/InputContainer";
import TextField from "../Form/TextField";
import Label from "../Form/Label";
import DatePickerField from "../Form/DatePickerField";
import moment from "moment";
import Error from "../Form/Error";
import PrioritySelector from "../Form/PrioritySelector";
import ComboBox from "../Form/ComboBox";
import ExpandingTextArea from "../Form/ExpandingTextArea";
import {Priority as PriorityType, TaskData} from "../../../types";
import UserSelector from "../Form/UserSelector";
import {getRequest, postRequest} from "../../../service/request";
import validate from "../../../service/validator";
import {convertDateToLocalDate} from "../../../service/util";

interface NewTaskProps {
    visible: boolean
    setModalVisible(isVisible: boolean): void;
    project: string,
    goal: string,
    team: string,
    onAdd: any,
}
const errorMsgs = {
    required: "This field is required",
};

const NewTask = (props: NewTaskProps) => {

    const rules = {
        title: {
            required: true,
            message: {
                required: errorMsgs.required
            }
        },
        deadline: {
            required: true,
            message: {
                required: errorMsgs.required,
            }
        },
        priority: {
            required: true,
            message: {
                required: errorMsgs.required,
            }
        }
    }

    const onChange = (name: string, value: string) => {
        setErrors({...errors, [name]: null});
        setValues({...values, [name]: value})
    }
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState<any>({
        title: '',
        priority: 'MEDIUM' as PriorityType,
    });
    const onSubmit = () => {
        setLoading(true);
        const result = (validate(values, rules));
        if (result.success) {
            postRequest('/tasks/create', {
                    ...values,
                    deadline: values["deadline"] ? convertDateToLocalDate(values["deadline"]) : null,
                    projectKey: props.project,
                    goalId: props.goal,
                    team: props.team
                },
                (result: TaskData) => {
                    props.onAdd(result);
                    setValues({...values, title: ""});
                    props.setModalVisible(false);
                }, () => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
            setErrors(result.error);
        }
    };
    const [errors, setErrors] = useState<any>({});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getRequest('/users', {}, (result => {
            setUsers(result);
        }))
    }, []);
    return (
        <Modal
            centered
            title="Create new task"
            visible={props.visible}
            okText="Submit"
            onOk={onSubmit}
            onCancel={() => props.setModalVisible(false)}
            confirmLoading={loading}
        >
            <div>
                <FormData onChange={onChange} onSubmit={onSubmit}>
                    <div>
                        <InputContainer small>
                            <TextField
                                errorMsg={errors.title}
                                label="Title"
                                required
                                autoFocus
                                placeholder="What's the task?" name="title"
                                hasRightErrorIcon={true}
                                value={values.title}
                            />
                        </InputContainer>
                        <InputContainer small inline>
                            <Label>Deadline:</Label>
                            <DatePickerField format="MM/DD/YYYY"
                                             default={moment()}
                                             disablePast placeholder="MM/DD/YYYY"
                                             style={{width: 140}} name="deadline"/>
                            {
                                errors.deadline && <Error>{errors.deadline}</Error>
                            }
                        </InputContainer>

                        <InputContainer small inline>
                            <Label required>Priority:</Label>
                            <PrioritySelector default="LOW" name="priority" style={{width: 120}}/>
                            {
                                errors.priority && <Error>{errors.priority}</Error>
                            }
                        </InputContainer>
                        <InputContainer small inline>
                            <Label>Assignee:</Label>

                            <UserSelector name="assignee" users={users} style={{width: 140}}
                                          placeholder="Assign to..."/>
                        </InputContainer>

                        <InputContainer small>
                            <Label>Description:</Label>
                            <ExpandingTextArea style={{fontSize: 14}} maxRows={5}
                                               placeholder="Details about the task"
                                               name="description"
                            />
                        </InputContainer>
                        {errors.global &&
                        <InputContainer>
                            <Error>{errors.global}</Error>
                        </InputContainer>
                        }
                    </div>
                </FormData>
            </div>
        </Modal>
    );
};

export default NewTask;
