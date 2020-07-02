import React from 'react';
import {Modal} from "antd";
import {TaskData} from "../../../types";

interface TaskDetailsProps {
    visible: boolean

    setModalVisible(isVisible: boolean): void;

    data: TaskData
}

const TaskDetails = (props: TaskDetailsProps) => {
    const {data} = props;
    return (
        <Modal
            centered
            title={`Task: ${data.id}`}
            visible={props.visible}
            okButtonProps={{style: {display: 'none'}}}
            onCancel={() => props.setModalVisible(false)}
        >
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </Modal>
    );
};

export default TaskDetails;
