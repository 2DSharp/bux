import {Card} from 'antd';
import React from "react";
import {ReactComponent as OrgDefaultAvatar} from "../../../images/org.svg";
import {ReactComponent as OrgDefaultCover} from "../../../images/default_org_cover.svg";

const {Meta} = Card;

const OrgCard = () => {
    return (
        <div>
            <Card
                hoverable
                style={{width: 360}}
                //cover={<OrgDefaultCover style={{ width: 360, height: 280}} />}
            >
                <Meta avatar={<OrgDefaultAvatar style={{width: 48, height: 48}}/>} title="Bux" description="Bux helps you manage projects, track bug reports and log decisions"/>
            </Card>
        </div>
    );
};

export default OrgCard;
