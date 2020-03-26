import React, {ChangeEvent, FormEvent, FormEventHandler, useState} from 'react';
import 'bulma/css/bulma.css'
import '../sass/base.scss'
import Axios from "axios";

import GlobalNavbar from "./Layout/GlobalNavbar";
import EmptyProjectsPrompt from "./WorkspaceContent/EmptyProjectsPrompt";


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
        <>
            <GlobalNavbar/>

        </>
    );
};


export default App;
