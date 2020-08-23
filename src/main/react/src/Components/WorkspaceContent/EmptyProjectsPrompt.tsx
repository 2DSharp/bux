import React from 'react';
import WizardPage from "../Layout/WizardPage";
import {Link} from "react-router-dom";
import PrimaryButton from "../Element/Button/PrimaryButton";

const EmptyProjectsPrompt = (props: {teamId: any, url: string}) => {

    return (
        <WizardPage width={5} title={"You don't have any projects yet"}>
            <div className="container has-text-centered">
                <h2 className="subtitle">
                    Get started by creating a new project.
                </h2>
                <Link to={`${props.url}/new`}>
                    <PrimaryButton>
                        <span className="icon">
                            <i className="mdi mdi-18px mdi-plus" aria-hidden="true"/>
                        </span>
                        <strong>Create</strong>
                    </PrimaryButton>
                </Link>
            </div>
        </WizardPage>

    );
};

export default EmptyProjectsPrompt;