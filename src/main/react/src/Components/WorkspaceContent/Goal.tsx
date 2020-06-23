import React from 'react';
import {Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Board from "../Element/Kanban/Board";
import GoalOverview from "./GoalOverview";

const Goal = (props: { project: string }) => {
    const {id} = useParams();
    const {url} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${url}/board`}>
                <Board/>
            </Route>
            <Route path={`${url}`}>
                <GoalOverview id={id} project={props.project}/>
            </Route>
        </Switch>
    );
};

export default Goal;
