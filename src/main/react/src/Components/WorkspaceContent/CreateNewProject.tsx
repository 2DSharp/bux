import React from 'react';
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("modal-root") as Element;

const CreateNewProject = () => {
    return ReactDOM.createPortal(
        <div className="modal is-active">
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <strong className="modal-card-title">Create a new project</strong>
                    <button className="delete" aria-label="close"/>
                </header>
                <section className="modal-card-body">

                    <div className="field">
                        <label className="label">Project Name</label>
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
                        <p className="help is-success">This project name is available</p>
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
                        <div className="control">
                            <label className="label">Team</label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <select>
                                        <option>Select a team</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea className="textarea has-fixed-size"
                                      placeholder="Add a short description for your new project"/>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary">Save changes</button>
                    <button className="button">Cancel</button>
                </footer>
            </div>
        </div>,
        portalRoot
    );
};

export default CreateNewProject;