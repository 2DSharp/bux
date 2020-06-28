import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./Column";
import {DragHandler} from "../../../service/dragHandler";
import {getRequest, postRequest} from "../../../service/request";
import {notifyError} from "../../../service/notification";

const data = {
    tasks: {
        'task-1': {id: 'task-1', title: 'Add new header'},
        'task-2': {id: 'task-2', title: 'Update background'},
        'task-3': {id: 'task-3', title: 'Delete previous font'},
        'task-4': {id: 'task-4', title: 'Optimize CSS'},
        'task-5': {id: 'task-5', title: 'Pre-cache JS'}
    },
    columns: {
        "col1": {
            id: "col1",
            title: 'TODO',
            taskIds: ['task-1', "task-2", "task-3"]
        },
        "col2": {
            id: "col2",
            title: "In Progress",
            taskIds: ['task-4', 'task-5']
        }
    },
    columnOrder: ['col1', 'col2']

}

const Board = (props) => {

    const [columns, setColumns] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const [tasks, setTasks] = useState({});
    const refreshTasks = () => {
        getRequest(`/goals/${props.id}/tasks/all`, {},
            result => {
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
            })
    }
    useEffect(() => {
        refreshTasks();
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

    return (
        <div style={{display: "flex"}}>
            {columns &&
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    columnOrder.map(columnId => {
                        const column = columns[columnId];
                        if (column) {
                            return <Column key={columnId} data={columnId}
                                           tasks={column.taskIds.map(taskId => tasks[taskId])}/>
                        }
                    })
                }
            </DragDropContext>
            }
        </div>
    );
};

export default Board;
