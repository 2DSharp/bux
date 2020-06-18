import React from 'react';
import MdIcon from "./MDIcon";
import {makeStyles} from "@material-ui/styles";

interface PriorityProps {
    type: "HIGH" | "LOW" | "MEDIUM"
}

const useStyles = makeStyles({
    priority: {
        height: "inherit",
    },
    high: {
        color: "red"
    },
    low: {
        color: "gray"
    },
    medium: {
        color: "lightgreen"
    }
});
const Priority = (props: PriorityProps) => {
    const classes = useStyles();
    switch (props.type) {
        case "HIGH":
            return <MdIcon value="mdi-arrow-up" className={`${classes.priority} ${classes.high}`}/>;
        case "LOW":
            return <MdIcon value="mdi-arrow-down" className={`${classes.priority} ${classes.low}`}/>;
        case "MEDIUM":
            return <MdIcon value="mdi-circle-medium" className={`${classes.priority} ${classes.medium}`}/>
    }
}

export default Priority;
