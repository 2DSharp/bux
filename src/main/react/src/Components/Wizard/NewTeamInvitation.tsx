import React, {useState} from 'react';
import HeroFullPage from "../Layout/HeroFullPage";
import InputContainer from "../Element/Form/InputContainer";
import TextField from "../Element/Form/TextField";
import {ReactComponent as Collaboration} from "../../images/collaboration.svg";
import PrimaryButton from "../Element/Button/PrimaryButton";
import FormData from "../Element/Form/FormData";

const NewTeamInvitation = () => {
    const [values, setValues] = useState({
        title: null,
        description: null
    });
    const onChange = (name: string, value: string) => {
        setValues({...values, [name]: value})
    }
    return (
        <HeroFullPage width={8} title={"Invite members to your team"} align="right" goBack={true}>

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
                    </FormData>
                </div>
            </div>
        </HeroFullPage>
    );
};

export default NewTeamInvitation;
