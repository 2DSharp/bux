import React, {useState} from 'react';
import WizardPage from "../Layout/WizardPage";
import TextField from "../Element/Form/TextField";
import InputContainer from "../Element/Form/InputContainer";
import FormData from "../Element/Form/FormData";
import PrimaryButton from "../Element/Button/PrimaryButton";
import ExpandingTextArea from "../Element/Form/ExpandingTextArea";
import Label from "../Element/Form/Label";
import {useHistory} from "react-router-dom";
import MdIcon from "../Element/Icon/MDIcon";
import {Tooltip} from "antd";
import {ReactComponent as GoodTeam} from "../../images/good_team.svg";
import validate from "../../service/validator";
import {postRequest} from "../../service/request";
import classNames from "classnames";

const rules = {
    name: {
        required: true,
        length: {min: 3, max: 25},
        pattern: new RegExp("^[A-Za-z0-9][a-zA-Z0-9_.-]*$"),
        message: {
            required: "This field is required",
            length: "The team name has to be between 3 to 25 characters",
            pattern: "The name can contain only letters, numbers, dashes, dots and underscores and has to start with a letter or number"
        }
    },

}
const CreateNewTeam = () => {
    const [values, setValues] = useState({
        name: null,
        description: null
    });
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (name: string, value: string) => {
        setErrors({...errors, [name]: null});
        setValues({...values, [name]: value})
    }
    let history = useHistory();

    const onSubmit = () => {
        const result = (validate(values, rules));
        setLoading(true);
        if (result.success) {
            postRequest('/teams/create', {
                    ...values
                },
                (result => {
                    if (result.hasErrors) {
                        setErrors(result.errors);
                    } else {
                        history.push(`/team/${values.name}/invite`);
                    }
                }), () => {
                    setLoading(false);
                }, () => {
                    // logout?
                });
        } else {
            setErrors(result.error);
            setLoading(false);
        }
    }
    const loadingStyle = classNames({
       'is-loading': loading
    });
    return (
        <WizardPage width={8} animate={true} title={"Create a new team"} goBack={true}>
            <div style={{marginTop: 40}} className="columns">
                <div className="column centered-absolutely">
                    <GoodTeam style={{height: 300, width: 300}}/>
                </div>
                <div className="column">
                    <FormData onChange={onChange} onSubmit={onSubmit}>
                        <InputContainer small>
                            <TextField
                                label="Team name (Ex. MicrosoftCorp, Adobe)"
                                required
                                errorMsg={errors.name}
                                placeholder="Claim a unique one word name for your team" name="name"
                                hasRightErrorIcon={true}
                                autoFocus
                            />
                            <Tooltip
                                placement={"right"}
                                title="The name has to be one worded and unique. Use underscores, dashes or casing for compound names. Example: ABCTech, ABC-Tech, ABC_Tech">
                        <span style={{width: "auto"}} className="help clickable">
                            <MdIcon value="mdi-information-outline"/> What kind of names can I use?
                        </span>
                            </Tooltip>

                        </InputContainer>
                        <InputContainer small>
                            <Label for="description">Description:</Label>
                            <ExpandingTextArea name="description" placeholder="A short description about your team"/>
                        </InputContainer>
                        <div style={{height: 20}}/>
                        <PrimaryButton className={loadingStyle}>Create</PrimaryButton>
                    </FormData>
                </div>
            </div>
        </WizardPage>
    );
};

export default CreateNewTeam;
