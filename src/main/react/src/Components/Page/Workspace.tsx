import React, {ReactElement, Suspense} from 'react';
import GlobalNavbar from "../Layout/GlobalNavbar";
import {  useRouteMatch, Route, Switch} from "react-router-dom";
import Dashboard from "../WorkspaceContent/Dashboard";

interface WorkspaceProps {
    children: ReactElement;
    active: string;
}
const Workspace = (props: WorkspaceProps) => {
    return (
        // For the navbar to leave some pace
            <div style={{paddingTop: "3.25rem"}}>
                <GlobalNavbar active={props.active}/>
                { props.children }
            </div>

    );
};

export default Workspace;