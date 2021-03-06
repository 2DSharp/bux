import React, {ReactElement, Suspense} from 'react';
import GlobalNavbar from "../Layout/GlobalNavbar";
import {useRouteMatch, Route, Switch} from "react-router-dom";
import Dashboard from "../WorkspaceContent/Dashboard";
import {motion} from "framer-motion";
import {makeStyles} from "@material-ui/styles";
import classNames from 'classnames';

interface WorkspaceProps {
    children: ReactElement;
    active: string;
    noSpaceTop?: boolean
}

const useStyles = makeStyles({
    spacedTop: {
        paddingTop: "3.25rem"
    }
})
const Workspace = (props: WorkspaceProps) => {
    const transitionVariants = {
        in: {
            opacity: 1
        },
        initial: {
            opacity: 0
        },
        out: {
            opacity: 0
        }
    }
    const pageTransitions = {
        type: "tween",
        ease: "anticipate",
    };
    const styles = useStyles();
    const divStyle = classNames({
        [styles.spacedTop]: !props.noSpaceTop
    })
    return (
        // For the navbar to leave some pace
        <div className={divStyle}>
            <GlobalNavbar active={props.active}/>
            <motion.div initial="initial" animate="in" exit="out" variants={transitionVariants}
                        transition={pageTransitions}>
                {props.children}
            </motion.div>
        </div>
    );
};

export default Workspace;