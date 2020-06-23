import React, {CSSProperties} from 'react';
import {Avatar, Tooltip} from "antd";
import {User} from "../../../types";

interface AvatarIconProps {
    children: User
    src?: string
    size?: number | "small" | "large" | "default",
    style?: CSSProperties
    className?: string
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
        <Tooltip title={props.children.name}>
            <Avatar size={props.size} style={{
                ...generateColor(props.children.username),
                ...props.style
            }}
                    className={props.className}
                    src={props.src}
            >{props.children.name.charAt(0).toUpperCase()}</Avatar>
        </Tooltip>
    );
};

export default AvatarIcon;
