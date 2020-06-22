import React, {useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./Column";
import {DragHandler} from "../../../service/dragHandler";

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
const Board = () => {
    const [columns, setColumns] = useState(data.columns);
    const [columnOrder, setColumnOrder] = useState(data.columnOrder);

    return (
        <div style={{display: "flex"}}>
            <DragDropContext onDragEnd={result => DragHandler.dragEnd(result, columns, setColumns)}>
                {
                    columnOrder.map(columnId => {
                        const column = columns[columnId];
                        return <Column key={column.id} data={column}
                                       tasks={column.taskIds.map(task => data.tasks[task])}/>

                    })
                }
            </DragDropContext>
        </div>
    );
};

export default Board;
