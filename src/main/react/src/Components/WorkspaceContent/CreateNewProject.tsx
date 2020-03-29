import React from 'react';
import HeroFullPage from "../Layout/HeroFullPageProps";
import "../../sass/card-form.scss"

const CreateNewProject = () => {
    return (
        <HeroFullPage width={4} title={"Create a new project"} alignLeft={true}>
            <>
                <div className="field">
                    <label className="label">Choose a name for your project</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" type="text"
                               placeholder="Choose a unique name, for example: Bux"/>
                        <span className="icon is-small is-left">
                                <i className="mdi mdi-developer-board"/>
                            </span>
                        <span className="icon is-small is-right">
                                <i className="fas fa-check"/>
                            </span>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <label className="label">Project Key</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input is-danger" type="text"
                                   placeholder="Select a short unique project identifier"/>
                            <span className="icon is-small is-left">
                                <i className="mdi mdi-key"/>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="mdi mdi-exclamation-thick"/>
                            </span>
                            <p className="help is-danger">The key has already been taken</p>
                        </div>
                    </div>

                </div>
            </>
        </HeroFullPage>

    );
};

export default CreateNewProject;