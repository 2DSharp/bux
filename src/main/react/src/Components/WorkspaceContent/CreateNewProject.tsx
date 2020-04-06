import React from 'react';
import ReactDOM from 'react-dom';
import HeroFullPage from "../Layout/HeroFullPageProps";
import "../../sass/card-form.scss"
import TextField from "../Element/TextField";
import InputContainer from "../Element/InputContainer";

const modalRoot = document.getElementById("modal-root") as Element;

const CreateNewProject = () => {
    return (
            <HeroFullPage width={4} title={"Create a new project"} alignLeft={true}>
                <>
                    <InputContainer>
                        <TextField error={false} placeholder={"Example: Bux"}
                                   label={"Project name"} required={true}
                        />
                    </InputContainer>

                    <InputContainer>
                        <>
                            <TextField error={false} placeholder={"A short 2-8 character identifier"}
                                       label={"Project key"} required={true}/>

                            <span className="help"><i className="mdi mdi-information-outline"/> The key is a unique identifier for a project. This will be used to track your issues, logs etc.
                    Eg.: Cloud Server can be keyed as CS. </span>
                        </>
                    </InputContainer>
                    <button className="button is-primary">
                        Create
                    </button>
                </>
            </HeroFullPage>
            )};

export default CreateNewProject;