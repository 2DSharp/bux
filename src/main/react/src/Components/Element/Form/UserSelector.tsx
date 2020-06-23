import React, {CSSProperties} from 'react';
import {Select} from "antd";
import {User} from "../../../types";
import AvatarIcon from "../Icon/AvatarIcon";

interface UserSelectorProps {
    onSearch?: (value: string) => void
    className?: string,
    style?: CSSProperties,
    placeholder?: string,
    users: User[]
}

const {Option} = Select;

const UserSelector = (props: UserSelectorProps) => {
    return (
        <Select
            showSearch
            style={props.style}
            placeholder={props.placeholder}
            optionFilterProp="children"
            className={props.className}
            onSearch={props.onSearch}
            filterOption={true}
        >
            {
                props.users.map(user => (
                    <Option key={user.username} style={{fontSize: "12px"}} value={user.username}>
                        <AvatarIcon style={{fontSize: "12px"}} user={user} size={18}/> {user.name}
                    </Option>
                ))
            }
        </Select>
    );
};

export default UserSelector;
