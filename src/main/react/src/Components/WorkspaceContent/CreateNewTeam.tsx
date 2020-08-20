import React from 'react';
import HeroFullPage from "../Layout/HeroFullPage";
import TextField from "../Element/Form/TextField";
import InputContainer from "../Element/Form/InputContainer";
import FormData from "../Element/Form/FormData";
import PrimaryButton from "../Element/Button/PrimaryButton";

const CreateNewTeam = () => {
    return (
        <HeroFullPage width={4} title={"Create a new project"} alignLeft={true} goBack={true}>
            <FormData>

                <InputContainer small>
                    <TextField
                        label="Team name"
                        required
                        placeholder="What's your organization called?" name="name"
                        hasRightErrorIcon={true}
                    />
                </InputContainer>
                <div style={{height: 20}} />
                <PrimaryButton >Create</PrimaryButton>
            </FormData>
        </HeroFullPage>
    );
};

export default CreateNewTeam;
