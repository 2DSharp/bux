import React, {useEffect, useState} from 'react';
import {Modal} from "antd";
import TextField from "../Form/TextField";
import moment from 'moment';
import InputContainer from "../Form/InputContainer";
import Label from "../Form/Label";
import ExpandingTextArea from "../Form/ExpandingTextArea";
import ComboBox from "../Form/ComboBox";
import {getRequest, postRequest} from "../../../service/request";
import FormData from "../Form/FormData";
import PrioritySelector from "../Form/PrioritySelector";
import DatePickerField from "../Form/DatePickerField";
import validate from "../../../service/validator";


interface NewGoal {
    visible: boolean,

    setModalVisible(isVisible: boolean): void;

    project: string
}

const errorMsgs = {
    required: "This field is required",
};

function convertDateToLocalDate(value: string) {
    return moment(value).format("YYYY-MM-DD")
}

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

const NewGoal = (props: NewGoal) => {

    const [milestones, setMilestones] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [values, setValues] = useState({
        title: null,
        priority: 'LOW',
        deadline: moment().format('MM/DD/YYYY'),
        milestone: null,
        description: null
    });
    const [errs, setErrs] = useState<any>({});
    const onSubmit = () => {
        setLoading(true);
        const result = (validate(values, rules));

        if (result.success) {
            postRequest('/projects/goals/create', {
                    projectKey: "props.project",
                    ...values,
                    deadline: convertDateToLocalDate(values["deadline"])
                },
                (result => {
                    setLoading(false);
                    if (result.hasErrors) {
                        setErrs(result.errors);
                    }
                }),
                (failure => {
                    setErrs({global: "Something went wrong"})
                    setLoading(false);
                }))
        } else {
            setErrs(result.error);
            setLoading(false);
        }

    };


    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRequest('/projects/' + props.project + '/milestones', {},
                (result => {
                    setMilestones(result);
                }),
                () => {

                })
        }
        return () => {
            mounted = false
        };
    }, [])
    const onChange = (name: string, value: string) => {
        setErrs({...errs, [name]: null});
        setValues({...values, [name]: value})
    }

    return (
        <Modal
            centered
            title="Add a new goal"
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
                                errorMsg={errs.title}
                                label="Title"
                                required
                                placeholder="A short name for the goal" name="title"
                                hasRightErrorIcon={true}
                            />
                        </InputContainer>
                        <InputContainer small inline>
                            <Label required>Deadline:</Label>
                            <DatePickerField format="MM/DD/YYYY"
                                             default={moment()}
                                             disablePast placeholder="MM/DD/YYYY"
                                             style={{width: 140}} name="deadline"/>
                        </InputContainer>

                        <InputContainer small inline>
                            <Label required>Priority:</Label>
                            <PrioritySelector default="LOW" name="priority" style={{width: 120}}/>
                        </InputContainer>
                        <InputContainer small inline>
                            <Label>Milestone:</Label>
                            <ComboBox values={milestones}
                                      placeholder="Set a milestone"
                                      style={{width: 150}}
                                      name="milestone"
                            />
                        </InputContainer>
                        <InputContainer small>
                            <Label>Description:</Label>
                            <ExpandingTextArea style={{fontSize: 14}} maxRows={5}
                                               placeholder="What is this goal about?"
                                               name="description"
                            />
                        </InputContainer>
                        {errs.global &&
                        <InputContainer>
                            <p className="help is-danger">{errs.global}</p>
                        </InputContainer>
                        }
                    </div>
                </FormData>
            </div>
        </Modal>
    );
};

export default NewGoal;
