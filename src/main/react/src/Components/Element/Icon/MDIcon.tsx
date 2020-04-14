import React from 'react';
import Icon, {IconProps} from "./Icon";

interface MDIconProps extends IconProps {

}

const MdIcon = (props: MDIconProps) => {
    return (
        <Icon value={`mdi ${props.value}`} color={props.color} size={props.size}/>
    );
};

export default MdIcon;