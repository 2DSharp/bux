import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/styles";
import DnDTable from "./DnDTable";
import {DragHandler} from "../../../service/dragHandler";
import MdIcon from "../Icon/MDIcon";
import variables from "../../../sass/colors.module.scss"

const useStyles = makeStyles({
    taskBlock: {
        marginBottom: 30
    },
    addIcon: {
        cursor: "pointer",
        "&:hover": {
            color: variables['blue']
        }
    }
});
const TaskList = (props) => {
    const classes = useStyles();
    const [columns, setColumns] = useState(props.data.columns);
    const [showTaskAdder, setShowTaskAdder] = useState(false);
    const [showBacklogAdder, setShowBacklogAdder] = useState(false);

    return (
        <div>
            <DragDropContext onDragEnd={result => DragHandler.dragEnd(result, columns, setColumns)}>
                <div className={classes.taskBlock}>
                    <div><h3><span style={{display: "inline-block", margin: 1}}>Tasks</span>
                        <MdIcon onClick={() => setShowTaskAdder(!showTaskAdder)}
                                value={showTaskAdder ? "mdi-minus" : "mdi-plus"}
                                className={classes.addIcon}/>
                    </h3></div>
                    <div className="is-divider"/>
                    <nav className={`panel`}>
                        <DnDTable displayAdded={showTaskAdder} data={columns['tasks']}
                                  tasks={columns['tasks'].taskIds.map(task => props.data.tasks[task])}/>
                    </nav>
                </div>
                <div className={classes.taskBlock}>
                    <div><h3>Backlog<MdIcon onClick={() => setShowBacklogAdder(!showBacklogAdder)}
                                            value={showBacklogAdder ? "mdi-minus" : "mdi-plus"}
                                            className={classes.addIcon}/></h3></div>
                    <nav className={`panel`}>
                        <DnDTable data={columns['backlog']}
                                  displayAdded={showBacklogAdder}
                                  tasks={columns['backlog'].taskIds.map(task => props.data.tasks[task])}/>
                    </nav>
                </div>
            </DragDropContext>

        </div>
    );
};

export default TaskList;
