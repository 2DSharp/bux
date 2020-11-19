import React from 'react';
import AvatarIcon from "../Icon/AvatarIcon";
import {User} from "../../../types";

const UserCardMin = (props: { user: User }) => {
    return (
        <>
            <AvatarIcon size={"small"} style={{marginRight: 7}} user={props.user}/>
            <span style={{verticalAlign: "middle"}}>
                {props.user.name}
            </span>
        </>
    );
};

export default UserCardMin;
