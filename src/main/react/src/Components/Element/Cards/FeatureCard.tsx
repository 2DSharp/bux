import {Card} from 'antd';
import React, {ReactNode} from "react";
const {Meta} = Card;


const FeatureCard = (props: { children?: ReactNode, icon: ReactNode, title: ReactNode, description: ReactNode }) => {
    return (
        <div>
            <Card
                hoverable
                style={{width: 440, height: 120, marginBottom: 10, marginTop: 10}}
                bodyStyle={{paddingBottom: 0}}
            >
                <Meta avatar={props.icon}
                      title={props.title}

                      description={props.description}>
                </Meta>
                {props.children}
            </Card>
        </div>
    );
};

export default FeatureCard;
