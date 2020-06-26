export class DragHandler {
    static dragEnd(result, columns, setColumns) {
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

        if (start === finish) {
            const column = columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds
            }
            setColumns({
                ...columns,
                [newColumn.id]: newColumn
            })
            return;
        }
        const startTaskIds = Array.from(start.tasks);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            tasks: startTaskIds
        }
        const finishTaskIds = Array.from(finish.tasks);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            tasks: finishTaskIds
        }
        setColumns({
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
        })
    }
}