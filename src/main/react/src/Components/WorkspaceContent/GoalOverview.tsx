import React, {useEffect, useState} from 'react';
import TaskList from "../Element/Table/TaskList";
import {GoalData, GoalTaskData} from "./Goal";
import {getRequest} from "../../service/request";

const GoalOverview = (props: { project: string, id: number, data: GoalData }) => {

    const {data} = props;
    const [taskData, setTaskData] = useState<GoalTaskData>();
    const setDataFromFetchResult = (result: any) => {
        setTaskData({
            tasks: result.tasks,
            columns: {
                "tasks": {
                    id: "tasks",
                    taskIds: result.taskIds
                },
            }
        })
    }
    const refreshTasks = () => {
        getRequest(`/goals/${props.id}/tasks/all`, {}, setDataFromFetchResult)
    }
    useEffect(() => {
        setDataFromFetchResult(props.data);
    }, [])
    return (
        <div>{
            taskData &&
            <TaskList statusList={data.statusList} goalId={data.id} project={props.project}
                      onUpdate={() => refreshTasks()}
                      data={taskData}/>
        } </div>
    );
};

export default GoalOverview;
