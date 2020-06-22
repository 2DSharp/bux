import React, {CSSProperties} from 'react';
import Priority from "../Icon/Priority";
import {Priority as PriorityType} from "../../../types"
import {Select} from "antd";
import {withFormData} from "./FormData";
import {SizeType} from "antd/lib/config-provider/SizeContext";

const {Option} = Select;

const PrioritySelector = (props: { default: PriorityType, style?: CSSProperties, onChange?: any, className?: string, size?: SizeType, iconsOnly?: boolean }) => {

    return (
        <Select size={props.size} defaultValue={props.default} style={props.style}
                onChange={props.onChange}
                className={props.className}
        >

            <Option value="LOW"><Priority type="LOW"/>{!props.iconsOnly && "Low"}</Option>
            <Option value="MEDIUM"><Priority type="MEDIUM"/>{!props.iconsOnly && "Medium"}</Option>
            <Option value="HIGH"><Priority type="HIGH"/>{!props.iconsOnly && "High"}</Option>
        </Select>
    );
};

export default withFormData(PrioritySelector);
