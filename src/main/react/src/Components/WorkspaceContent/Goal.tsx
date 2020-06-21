import React from 'react';
import {Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Board from "../Element/Kanban/Board";
import Backlog from "./Backlog";

const Goal = () => {
    const {id} = useParams();
    const {url} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${url}/board`}>
                <Board/>
            </Route>
            <Route path={`${url}`}>
                <Backlog/>
            </Route>
        </Switch>
    );
};

export default Goal;
