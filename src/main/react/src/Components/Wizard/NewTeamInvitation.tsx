import React, {useState} from 'react';
import WizardPage from "../Layout/WizardPage";
import InputContainer from "../Element/Form/InputContainer";
import TextField from "../Element/Form/TextField";
import {ReactComponent as Collaboration} from "../../images/collaboration.svg";
import PrimaryButton from "../Element/Button/PrimaryButton";
import FormData from "../Element/Form/FormData";
import {Link, useParams, useRouteMatch, useLocation} from "react-router-dom";

const NewTeamInvitation = () => {
    const [values, setValues] = useState({
        title: null,
        description: null
    });
    const onChange = (name: string, value: string) => {
        setValues({...values, [name]: value})
    }
    const {teamId} = useParams();

    return (
        <WizardPage animate={true} width={8} title={"Invite members to your team"} align="right">

            <div style={{marginTop: 40}} className="columns">
                <div className="column centered-absolutely">
                    <Collaboration style={{height:300, width: 300}} />
                </div>
                <div className="column">
                    <div>
                        Add members to your team by sending out invites to them via email:
                    </div>
                    <FormData onChange={onChange}>

                        <InputContainer small>
                            <TextField
                                type="email"
                                placeholder="email@example.com" name="email1"
                                hasRightErrorIcon={true}
                                autoFocus
                            />
                        </InputContainer>
                        <InputContainer small>
                            <TextField
                                type="email"
                                placeholder="email@example.com" name="email2"
                                hasRightErrorIcon={true}
                            />
                        </InputContainer>
                        <InputContainer small>
                            <TextField
                                type="email"
                                placeholder="email@example.com" name="email3"
                                hasRightErrorIcon={true}
                            />
                        </InputContainer>
                        <div style={{height: 20}}/>
                        <PrimaryButton>Invite</PrimaryButton>
                        <span style={{fontSize: 14, margin: 10, display: "inline-block", verticalAlign: "baseline"}}><Link to={`/team/${teamId}/projects`}>Skip</Link></span>
                    </FormData>
                </div>
            </div>
        </WizardPage>
    );
};

export default NewTeamInvitation;
