import React, {ChangeEvent} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {makeStyles} from "@material-ui/styles";
import {withFormData} from "./FormData";

interface ExpandingTextAreaInterface extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    onChange: any
    maxRows: number
}

const useStyles = makeStyles({
    root: {
        minHeight: "3em !important"
    }
});
const ExpandingTextArea = (props: ExpandingTextAreaInterface) => {
    const classes = useStyles();
    return (
        <TextareaAutosize {...props} maxRows={props.maxRows} placeholder={props.placeholder}
                          className={`textarea has-fixed-size ${classes.root}`}
                          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)}
        >
            {props.children}
        </TextareaAutosize>
    );
};

export default withFormData(ExpandingTextArea);
