import React, {useEffect, useState} from 'react';
import {Modal} from "antd";
import TextField from "../Form/TextField";
import {getFormErrors} from "../../../service/util";
import {useForm} from "react-hook-form";
import moment from 'moment';
import InputContainer from "../Form/InputContainer";
import Label from "../Form/Label";
import ExpandingTextArea from "../Form/ExpandingTextArea";
import ComboBox from "../Form/ComboBox";
import {getRequest} from "../../../service/request";
import FormData from "../Form/FormData";
import PrioritySelector from "../Form/PrioritySelector";
import DatePickerField from "../Form/DatePickerField";


interface NewGoal {
    visible: boolean,

    setModalVisible(isVisible: boolean): void;

    project: string
}

interface ServerErrors {
    title?: string
}

const errorMsgs = {
    required: "This field is required",
};

const NewGoal = (props: NewGoal) => {
    type FormStruct = {
        title: string,

    };
    const {register, handleSubmit, errors, setError} = useForm<FormStruct>();
    const [serverErrors, setServerErrors] = useState<ServerErrors>();
    const [milestones, setMilestones] = useState<string[]>([]);
    const [values, setValues] = useState({
        title: null,
        priority: 'LOW',
        deadline: moment().format('MM/DD/YYYY'),
        milestone: null,
        description: null
    });
    const onSubmit = handleSubmit(({title}) => {
        console.log(values);
    });


    useEffect(() => {
        getRequest('/projects/' + props.project + '/milestones', {},
            (result => {
                setMilestones(result);
            }),
            () => {

            })
    }, [])

    return (
        <Modal
            centered
            title="Add a new goal"
            visible={props.visible}
            okText="Submit"
            onOk={onSubmit}
            onCancel={() => props.setModalVisible(false)}
        >
            <div>
                <FormData onChange={(name: string, value: string) => setValues({...values, [name]: value})}>
                    <div>
                        <InputContainer small>
                            <TextField
                                errorMsg={getFormErrors(errors, serverErrors, "title")}
                                forwardRef={register({
                                    required: {value: true, message: errorMsgs.required},
                                })}
                                label="Title"
                                required
                                resetServerErrors={setServerErrors}
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
                    </div>
                </FormData>
            </div>
        </Modal>
    );
};

export default NewGoal;
