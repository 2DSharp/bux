import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {makeStyles} from "@material-ui/styles";

interface ExpandingTextAreaInterface extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {

}

const useStyles = makeStyles({
    root: {
        minHeight: "3em !important"
    }
});
const ExpandingTextArea = (props: ExpandingTextAreaInterface) => {
    const classes = useStyles();
    return (
        <TextareaAutosize placeholder={props.placeholder} className={`textarea has-fixed-size ${classes.root}`}>
            {props.children}
        </TextareaAutosize>
    );
};

export default ExpandingTextArea;
