import React from 'react';
interface EmptyProjectsPrompt {
    onClick: () => void
}
const EmptyProjectsPrompt = (props : EmptyProjectsPrompt) => {
    return (
        <section className="hero is-light is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">
                       You don't have any projects yet
                    </h1>
                    <h2 className="subtitle">
                        Get started by creating a new project.
                    </h2>
                    <a onClick={props.onClick} className="button is-primary">
                        <span className="icon">
                            <i className="mdi mdi-18px mdi-plus" aria-hidden="true"/>
                        </span>
                        <strong>Create</strong>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default EmptyProjectsPrompt;