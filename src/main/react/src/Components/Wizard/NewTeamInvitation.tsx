import React, {useState} from 'react';
import WizardPage from "../Layout/WizardPage";
import InputContainer from "../Element/Form/InputContainer";
import TextField from "../Element/Form/TextField";
import {ReactComponent as Collaboration} from "../../images/collaboration.svg";
import PrimaryButton from "../Element/Button/PrimaryButton";
import FormData from "../Element/Form/FormData";
import {Link, useParams, useRouteMatch, useLocation} from "react-router-dom";
import {postRequest} from "../../service/request";
import MdIcon from "../Element/Icon/MDIcon";
import Error from "../Element/Form/Error";

const Done = (props: { location: string }) => {
    return (
        <div>
            <div style={{textAlign: "center"}}>

                <div style={{margin: 20}}>
                    <MdIcon value={"mdi-check-circle-outline"}
                            style={{color: "green", margin: 20, fontSize: 72}}/>
                </div>
                <h1 style={{margin: 20, fontSize: 48}}>
                    You are all set!
                </h1>
                <div  style={{margin: 20}}>
                    <Link to={props.location}><PrimaryButton>Go to my projects</PrimaryButton></Link>
                </div>
            </div>
        </div>
    );
}
const NewTeamInvitation = () => {
    const [values, setValues] = useState({
        email1: null,
        email2: null,
        email3: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>();
    const [done, setDone] = useState(false);

    const onChange = (name: string, value: string) => {
        setValues({...values, [name]: value})
    }
    const {teamId} = useParams();

    const onSubmit = () => {
        setLoading(true);
        postRequest(`/teams/${teamId}/members/invite`, {
            emails: [values['email1'], values['email2'], values['email3']]
        }, (result => {
            if (result.hasErrors) {
                setErrors(result.errors);
            } else {
                setDone(true);
            }
        }), () => {
            setLoading(false);
        }, () => {
            // logout?
        });
    }

    return (
        <WizardPage animate={true} width={8} title={"Invite members to your team"} align="right">

            <div style={{marginTop: 40}} className="columns">
                <div className="column centered-absolutely">
                    <Collaboration style={{height: 300, width: 300}}/>
                </div>
                <div className="column">
                    {done ? <Done location={`/team/${teamId}/projects`}/> :
                        <>
                            <div>
                                Add members to your team by sending out invites to them via email:
                            </div>
                            <FormData onChange={onChange} onSubmit={onSubmit}>

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
                                <Error>{errors && errors.permission}</Error>
                                <PrimaryButton loading={loading}>Invite</PrimaryButton>
                                <span style={{
                                    fontSize: 14,
                                    margin: 10,
                                    display: "inline-block",
                                    verticalAlign: "baseline"
                                }}><Link to={`/team/${teamId}/projects`}>Skip</Link></span>
                            </FormData>
                        </>
                    }
                </div>
            </div>
        </WizardPage>
    );
};

export default NewTeamInvitation;
