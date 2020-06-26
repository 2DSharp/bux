import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./Column";
import {DragHandler} from "../../../service/dragHandler";
import {getRequest} from "../../../service/request";

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

    useEffect(() => {
        getRequest(`/goals/${props.id}/tasks/all`, {},
            result => {
                setColumnOrder(result.statusList);
                let columnData = {};
                result.statusList.map(status => {
                    columnData = {
                        ...columnData,
                        [status]: {
                            id: status,
                            tasks: result.columnData[status].tasks
                        }
                    };
                });
                setColumns(columnData);
                setTasks(result.tasks);
            }, failure => {
                console.log(failure);
            })
    }, []);


    return (
        <div style={{display: "flex"}}>
            {columns &&
            <DragDropContext onDragEnd={result => DragHandler.dragEnd(result, columns, setColumns)}>
                {
                    columnOrder.map(columnId => {
                        const column = columns[columnId];
                        if (column) {
                            return <Column key={columnId} data={columnId}
                                           tasks={column.tasks.map(taskId => tasks[taskId])}/>
                        }
                    })
                }
            </DragDropContext>
            }
        </div>
    );
};

export default Board;
