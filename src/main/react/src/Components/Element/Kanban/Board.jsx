import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./Column";

const data = {
    tasks: {
        'task-1': {id: 'task-1', title: 'Add new header'},
        'task-2': {id: 'task-2', title: 'Update background'},
        'task-3': {id: 'task-3', title: 'Delete previous font'},
        'task-4': {id: 'task-4', title: 'Optimize CSS'},
        'task-5': {id: 'task-5', title: 'Pre-cache JS'}
    },
    columns: [
        {
            title: 'TODO',
            tasks: ['task-1', "task-2", "task-3"]
        },
        {
            title: "In Progress",
            tasks: ['task-4', 'task-5']
        }
    ]

}
const Board = () => {
    const onDragEnd = (result, provided) => {

    }
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    data.columns.map(column => (
                        <Column key={column.title} data={column} tasks={column.tasks.map(task => data.tasks[task])}/>

                    ))
                }
            </DragDropContext>
        </div>
    );
};

export default Board;
