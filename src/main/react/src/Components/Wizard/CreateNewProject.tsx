import React, {useState} from 'react';
import WizardPage from "../Layout/WizardPage";
import "../../sass/card-form.scss"
import TextField from "../Element/Form/TextField";
import InputContainer from "../Element/Form/InputContainer";
import {useForm} from "react-hook-form";
import cx from "classnames";
import {getFormErrors} from "../../service/util";
import {Redirect, useParams} from "react-router-dom";
import {postRequest} from "../../service/request";
import PrimaryButton from "../Element/Button/PrimaryButton";
import MdIcon from "../Element/Icon/MDIcon";
import MotionRedirect from "../Element/Routing/MotionRedirect";

const CreateNewProject = () => {
    type FormData = {
        name: string
        projectKey: string

    };
    const {register, handleSubmit, errors} = useForm<FormData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(true);
    const btnStatus = cx("button", "is-primary", {
        "is-loading": loading
    });
    const {teamId} = useParams();

    const [serverErrors, setServerErrors] = useState();
    const onSubmit = handleSubmit(({name, projectKey}) => {
        setLoading(true);

        postRequest(`/team/${teamId}/projects/create`, {
                name: name,
                projectKey: projectKey
            }, (response) => {
                if (response.hasErrors) {
                    setServerErrors(response.errors);
                    return;
                }
                setSuccess(true);
            },
            () => setLoading(false),
            (error) => {
                if (error?.response && error.response?.status === 403) {
                    setHasPermission(false);
                    return;
                }
            }
        )
    });
    const errorMsgs = {
        required: "This field is required",
        keySize: "Create a unique key in 2-8 characters"
    };
    if (!hasPermission)
        return <MotionRedirect to="/"/>;
    if (success)
        return <MotionRedirect to={`/team/${teamId}/projects`}/>
    return (
        <WizardPage animate width={4} title={"Create a new project"} alignLeft={true} goBack={true}>
            <>
                <form onSubmit={onSubmit}>
                    <InputContainer>
                        <TextField placeholder={"Example: Bux"} name="name"
                                   errorMsg={getFormErrors(errors, serverErrors, "name")}
                                   forwardRef={register({
                                       required: {
                                           value: true,
                                           message: errorMsgs.required
                                       }
                                   })}
                                   autoComplete="off"
                                   resetServerErrors={setServerErrors}
                                   hasRightErrorIcon={true}
                                   label={"Project name"} required={true}
                        />
                    </InputContainer>

                    <InputContainer>
                        <>
                            <TextField placeholder={"A short 2-8 character identifier"}
                                       label={"Project key"} required={true} name="projectKey"
                                       errorMsg={getFormErrors(errors, serverErrors, "projectKey")}
                                       autoComplete="off"
                                       style={{
                                           textTransform: "uppercase"
                                       }}
                                       forwardRef={register({
                                           required: {
                                               value: true,
                                               message: errorMsgs.required
                                           },
                                           maxLength: {
                                               value: 8,
                                               message: errorMsgs.keySize
                                           },
                                           minLength: {
                                               value: 2,
                                               message: errorMsgs.keySize
                                           }
                                       })}
                                       resetServerErrors={setServerErrors}
                                       hasRightErrorIcon={true}
                            />

                            <span className="help"><MdIcon value="mdi-information-outline"/> The key is a unique
                            identifier for a project. This will be used to track your issues, logs etc. Eg.: Cloud Server
                            can be keyed as CS. </span>
                        </>
                    </InputContainer>
                    <PrimaryButton className={btnStatus}>
                        Create
                    </PrimaryButton>
                </form>
            </>
        </WizardPage>
    )
};

export default CreateNewProject;