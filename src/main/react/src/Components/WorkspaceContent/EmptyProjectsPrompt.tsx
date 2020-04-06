import React from 'react';
import HeroFullPage from "../Layout/HeroFullPageProps";
import {Link} from "react-router-dom";

interface EmptyProjectsPrompt {
    onClick: () => void
}

const EmptyProjectsPrompt = (props: EmptyProjectsPrompt) => {
    return (
        <HeroFullPage width={5} title={"You don't have any projects yet"}>
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
        </HeroFullPage>

    );
};

export default EmptyProjectsPrompt;