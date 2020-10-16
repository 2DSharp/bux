import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {makeStyles} from "@material-ui/styles";
import {withFormData} from "./FormData";

const useStyles = makeStyles({
    root: {
        minHeight: "3em !important"
    }
});
const ExpandingTextArea = (props) => {
    const classes = useStyles();
    return (
        <TextareaAutosize {...props} id={props.name} maxRows={props.maxRows} placeholder={props.placeholder}
                          className={`textarea has-fixed-size ${classes.root}`}
                          value={props.value}
                          onChange={(event) => props.onChange(event.target.value)}
        >
            {props.children}
        </TextareaAutosize>
    );
};

export default withFormData(ExpandingTextArea);
