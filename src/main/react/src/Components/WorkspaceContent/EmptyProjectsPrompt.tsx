import React from 'react';
import WizardPage from "../Layout/WizardPage";
import {Link} from "react-router-dom";

const EmptyProjectsPrompt = () => {
    return (
        <WizardPage width={5} title={"You don't have any projects yet"}>
            <div className="container has-text-centered">
                <h2 className="subtitle">
                    Get started by creating a new project.
                </h2>
                <Link to="/new/project">
                    <button className="button is-primary">
                        <span className="icon">
                            <i className="mdi mdi-18px mdi-plus" aria-hidden="true"/>
                        </span>
                        <strong>Create</strong>
                    </button>
                </Link>
            </div>
        </WizardPage>

    );
};

export default EmptyProjectsPrompt;