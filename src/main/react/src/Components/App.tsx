import React, {ChangeEvent, FormEvent, useState} from 'react';
import 'bulma/css/bulma.css'
import '../sass/base.scss'
import Axios from "axios";

import Login from "./Page/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./Page/Registration";
import Projects from "./Page/Projects";
import Dashboard from "./WorkspaceContent/Dashboard";
import Workspace from "./Page/Workspace";
import CreateNewProject from "./WorkspaceContent/CreateNewProject";


const App = (props: any) => {

    const [projects, setProjects] = useState('');
    const [projName, setProjName] = useState('');
    const updateProjectName = (event: ChangeEvent<HTMLInputElement>) => {
        setProjName(event.target.value);
    };
    Axios.get('/issues')
        .then(response => {
            //setIssues(response.data.msg);
            setProjects(response.data);
        });

    const addNewIssue = (event: FormEvent) => {
        event.preventDefault();
        Axios.post('/issue', {
            name: projName
        })
            .then(response => {
                console.log(response.data)
            });
    };
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route path="/accounts/create">
                    <Registration />
                </Route>
                <Route path="/projects">
                    <Projects />
                </Route>
                <Route path="/project">
                    <Workspace/>
                </Route>
                <Route path="/new/project">
                    <CreateNewProject/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};


export default App;
