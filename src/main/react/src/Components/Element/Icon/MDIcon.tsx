import React from 'react';
import Icon, {IconProps} from "./Icon";

interface MDIconProps extends IconProps {

}

const MdIcon = (props: MDIconProps) => {
    return (
        <Icon {...props} className={props.className} onClick={props.onClick} value={`mdi ${props.value}`}
              size={props.size}/>
    );
};

export default MdIcon;