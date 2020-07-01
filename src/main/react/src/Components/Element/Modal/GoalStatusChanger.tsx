import React, {useState} from 'react';
import {Modal} from "antd";
import {postRequest} from "../../../service/request";
import {GoalData} from "../../WorkspaceContent/Goal";

interface GoalStatusChangerProps {
    visible: boolean,

    setModalVisible(isVisible: boolean): void,

    setLastUpdate(status: any): void,

    goalId: number,
    data: GoalData
}

const GoalStatusChanger = (props: GoalStatusChangerProps) => {
    const [showChangeLoader, setShowChangeLoader] = useState(false);
    const {data} = props;
    console.log(data);
    const createMessage = () => {
        switch (data.status) {
            case "PLANNING":
                return `There are ${data.taskIds.length} tasks in this goal. You will be able to start working on the
                 goals and track your progress as you start. Continue?`;
            case "ACTIVE":
                const remainingTasks = data.taskIds.length - data.columnData[data.statusList[data.statusList.length - 1]].taskIds.length
                if (remainingTasks > 0)
                    return `You have ${remainingTasks} tasks remaining out of ${data.taskIds.length}. Are you sure you want to complete this project?`;
                return `All the tasks have been completed in this goal. Do you want to complete this goal?`;
        }
    }
    const updateStatus = () => {
        setShowChangeLoader(true);
        postRequest("/goals/status/update", {goalId: props.goalId},
            (result) => {
                props.setLastUpdate(result.status);
                props.setModalVisible(false);
            }, () => {
                setShowChangeLoader(false);
            })
    }
    return (
        <Modal
            centered
            title="Change goal status"
            visible={props.visible}
            okText="Proceed"
            onOk={updateStatus}
            onCancel={() => props.setModalVisible(false)}
            confirmLoading={showChangeLoader}
        >
            {createMessage()}
        </Modal>
    );
};

export default GoalStatusChanger;
