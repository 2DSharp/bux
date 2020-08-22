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

const CreateNewTeam = () => {
    const [values, setValues] = useState({
        title: null,
        description: null
    });
    const onChange = (name: string, value: string) => {
        setValues({...values, [name]: value})
    }
    let history = useHistory();

    const onSubmit = () => {
        history.push(`/team/${values.title}/invite`);
    }
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
                                placeholder="Claim a unique one word name for your team" name="title"
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
                        <PrimaryButton>Create</PrimaryButton>
                    </FormData>
                </div>
            </div>
        </WizardPage>
    );
};

export default CreateNewTeam;
