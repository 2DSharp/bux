import React, {CSSProperties} from 'react';
import {Avatar, Tooltip} from "antd";
import {User} from "../../../types";

interface AvatarIconProps {
    user: User
    size?: number | "small" | "large" | "default",
    style?: CSSProperties
    className?: string,
}

function generateColor(name: string) {
    switch (name.length % 3) {
        case 0:
            return {
                color: '#fff',
                backgroundColor: '#f56a00',
            };
        case 1:
            return {
                color: '#fff',
                backgroundColor: 'rgb(101, 84, 192)'
            };
        case 2:
            return {
                color: '#fff',
                backgroundColor: '#BC1A6F'
            };
    }
}

const AvatarIcon = (props: AvatarIconProps) => {
    return (
        <Tooltip title={props.user.name}>
            <Avatar size={props.size} style={{
                ...generateColor(props.user.username),
                ...props.style,
                verticalAlign: 'middle'
            }}
                    className={props.className}
                    src={props.user.profilePicture}
            >{props.user.name.charAt(0).toUpperCase()}</Avatar>
        </Tooltip>
    );
};

export default AvatarIcon;
