import React, {ReactNode} from 'react';
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import MdIcon from "../Icon/MDIcon";

export type NotificationReference = {
    project?: string
    team?: string
}
const NotificationCard = (props: { children?: ReactNode, icon: ReactNode, title: ReactNode, description: ReactNode, reference? : NotificationReference }) => {
    return (
        <Card
            hoverable
            style={{marginTop: 10, marginBottom: 10}}
            bodyStyle={{paddingBottom: 15}}
        >
            <Meta avatar={props.icon}
                  title={props.title}
                  description={props.description}>
            </Meta>
            {props.children}
            {props.reference &&
               <div style={{margin: "20px 10px 0 10px"}}><MdIcon value="mdi-rocket" /> <b>{props.reference.team} </b> - {props.reference.project}</div>
            }
        </Card>
    );
};

export default NotificationCard;
