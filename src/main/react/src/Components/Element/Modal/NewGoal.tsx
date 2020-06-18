import React, {useState} from 'react';
import {DatePicker, Modal, Select} from "antd";
import TextField from "../Form/TextField";
import {getFormErrors} from "../../../service/util";
import {useForm} from "react-hook-form";
import moment from 'moment';
import InputContainer from "../Form/InputContainer";
import Label from "../Form/Label";
import Priority from "../Icon/Priority";
import ExpandingTextArea from "../Form/ExpandingTextArea";
import ComboBox from "../Form/ComboBox";

const {Option} = Select;

interface NewGoal {
    visible: boolean,

    setModalVisible(isVisible: boolean): void;
}

interface ServerErrors {
    title?: string
}

const errorMsgs = {
    required: "This field is required",
};

const NewGoal = (props: NewGoal) => {
    type FormData = {
        title: string
    };
    const {register, handleSubmit, errors, setError} = useForm<FormData>();
    const [serverErrors, setServerErrors] = useState<ServerErrors>();
    const onSubmit = handleSubmit(({title}) => {
        setServerErrors({title: "Some server error"});
    });
    const [priority, setPriority] = useState("LOW");

    function disabledDate(current: moment.Moment | null): boolean {
        if (current)
            return moment().add(-1, 'days') >= current;
        else return false;
    }

    return (
        <Modal
            centered
            title="Add a new goal"
            visible={props.visible}
            okText="Submit"
            onOk={onSubmit}
            onCancel={() => props.setModalVisible(false)}
            confirmLoading={true}
        >
            <div>
                <form onSubmit={onSubmit}>
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
                            <DatePicker placeholder="MM/DD/YYYY" defaultValue={moment()} showToday
                                        disabledDate={disabledDate}
                                        format={'MM/DD/YYYY'}
                                        style={{width: 140}}
                            />
                        </InputContainer>

                        <InputContainer small inline>
                            <Label required>Priority:</Label>
                            <Select defaultValue="LOW" style={{width: 120}}
                                    onChange={(value: string) => setPriority(value)}>
                                <Option value="LOW"><Priority type="LOW"/> Low</Option>
                                <Option value="MEDIUM"><Priority type="MEDIUM"/> Medium</Option>
                                <Option value="HIGH"><Priority type="HIGH"/> High</Option>
                            </Select>
                        </InputContainer>
                        <InputContainer small inline>
                            <Label>Milestone:</Label>
                            <ComboBox style={{width: 130}} placeholder="Set a milestone" values={[]}/>
                        </InputContainer>
                        <InputContainer small>
                            <Label>Description:</Label>
                            <ExpandingTextArea maxLength={5} placeholder="What is this goal about?"/>
                        </InputContainer>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default NewGoal;
