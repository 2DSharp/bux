import React, {useState} from 'react';
import HeroFullPage from "../Layout/HeroFullPage";
import InputContainer from "../Element/Form/InputContainer";
import TextField from "../Element/Form/TextField";
import {Tooltip} from "antd";
import MdIcon from "../Element/Icon/MDIcon";
import Label from "../Element/Form/Label";
import ExpandingTextArea from "../Element/Form/ExpandingTextArea";
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
        <HeroFullPage width={8} title={"Invite members to your team"} goBack={true}>

            <div className="columns">
                <div className="column">
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
                                autoFocus
                            />
                        </InputContainer>
                        <InputContainer small>
                            <TextField
                                type="email"
                                placeholder="email@example.com" name="email2"
                                hasRightErrorIcon={true}
                                autoFocus
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
