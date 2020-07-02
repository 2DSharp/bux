import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./Column";
import {DragHandler} from "../../../service/dragHandler";
import {getRequest, postRequest} from "../../../service/request";
import {notifyError} from "../../../service/notification";
import TaskDetails from "../Modal/TaskDetails";

const Board = (props) => {

    const [columns, setColumns] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const [tasks, setTasks] = useState({});
    const setDataFromFetchResult = (result) => {
        setColumnOrder(result.statusList);
        let columnData = {};
        result.statusList.map(status => {
            columnData = {
                ...columnData,
                [status]: {
                    id: status,
                    taskIds: result.columnData[status].taskIds
                }
            };
        });
        setColumns(columnData);
        setTasks(result.tasks);
    }
    const refreshTasks = () => {
        getRequest(`/goals/${props.id}/tasks/all`, {}, setDataFromFetchResult)
    }
    useEffect(() => {
        setDataFromFetchResult(props.data);
    }, []);

    const onDragEnd = result => {
        DragHandler.dragEnd(result, columns, setColumns);
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];
        const baseData = {
            goalId: props.id,
            source: source.index,
            destination: destination.index,
        };
        if (start === finish) {
            postRequest("/goals/tasks/reorder/status", {
                ...baseData,
                status: source.droppableId
            }, (result) => {
                refreshTasks(result);
            })
        } else {
            postRequest("/tasks/update/status/drag", {
                ...baseData,
                sourceStatus: source.droppableId,
                destinationStatus: destination.droppableId,
                taskId: draggableId
            }, (result) => {
                refreshTasks(result);
                if (result.notification.hasErrors) {
                    notifyError({
                        title: "That's not allowed",
                        description: result.notification.errors['global']
                    })
                }
            });
        }
    }

    const [detailsVisible, setDetailsVisible] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState("");

    return (
        <div style={{display: "flex"}}>
            {columns &&
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    columnOrder.map((columnId, index) => {
                        const column = columns[columnId];
                        if (column) {
                            return <Column setCurrentTaskId={id => {
                                setCurrentTaskId(id);
                                setDetailsVisible(true)
                            }} key={columnId} index={index}
                                           data={columnId}
                                           tasks={column.taskIds.map(taskId => tasks[taskId])}/>
                        }
                    })
                }
            </DragDropContext>
            }
            {currentTaskId &&
            <TaskDetails visible={detailsVisible} setModalVisible={setDetailsVisible} data={tasks[currentTaskId]}/>
            }
        </div>
    );
};

export default Board;
