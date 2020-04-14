import React, {useState} from 'react';
import HeroFullPage from "../Layout/HeroFullPageProps";
import "../../sass/card-form.scss"
import TextField from "../Element/Form/TextField";
import InputContainer from "../Element/Form/InputContainer";
import {useForm} from "react-hook-form";
import cx from "classnames";
import {getFormErrors, removeFieldFromState} from "../../Helpers/util";
import Axios, {AxiosError, AxiosResponse} from "axios";
import {Redirect} from "react-router-dom";

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
    const [serverErrors, setServerErrors] = useState();
    const onSubmit = handleSubmit(({name, projectKey}) => {
        setLoading(true);
        Axios.post('/projects/create', {
            name: name,
            projectKey: projectKey
        }).then(response => {
            setSuccess(true);
        }).catch((error: AxiosError) => {
            if (error.response?.status === 403) {
                setHasPermission(false);
                return;
            }

            const response = error.response as AxiosResponse;
            setServerErrors(response.data);

        }).finally(() => setLoading(false));
    });
    const errorMsgs = {
        required: "This field is required",
        keySize: "Create a unqiue key in 2-8 characters"
    };
    if (!hasPermission)
        return <Redirect to="/"/>;
    if (success)
        return <Redirect to="/projects"/>
    return (
        <HeroFullPage width={4} title={"Create a new project"} alignLeft={true}>
            <>
                <form onSubmit={onSubmit}>
                    <InputContainer>
                        <TextField placeholder={"Example: Bux"} name="name"
                                   onChange={event => {
                                       removeFieldFromState(setServerErrors, "name")
                                   }}
                                   errorMsg={getFormErrors(errors, serverErrors, "name")}
                                   forwardRef={register({
                                       required: {
                                           value: true,
                                           message: errorMsgs.required
                                       }
                                   })}
                                   hasRightErrorIcon={true}
                                   label={"Project name"} required={true}
                        />
                    </InputContainer>

                    <InputContainer>
                        <>
                            <TextField placeholder={"A short 2-8 character identifier"}
                                       label={"Project key"} required={true} name="projectKey"
                                       onChange={event => {
                                           removeFieldFromState(setServerErrors, "projectKey")
                                       }}
                                       errorMsg={getFormErrors(errors, serverErrors, "projectKey")}
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
                                       hasRightErrorIcon={true}
                            />

                            <span className="help"><i className="mdi mdi-information-outline"/> The key is a unique
                            identifier for a project. This will be used to track your issues, logs etc. Eg.: Cloud Server
                            can be keyed as CS. </span>
                        </>
                    </InputContainer>
                    <button className={btnStatus}>
                        Create
                    </button>
                </form>
            </>
        </HeroFullPage>
    )
};

export default CreateNewProject;