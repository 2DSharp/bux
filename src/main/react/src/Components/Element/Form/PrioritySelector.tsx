import React, {CSSProperties} from 'react';
import Priority from "../Icon/Priority";
import {Priority as PriorityType} from "../../../types"
import {Select} from "antd";
import {withFormData} from "./FormData";

const {Option} = Select;

const PrioritySelector = (props: { default: PriorityType, style?: CSSProperties, onChange?: any }) => {

    return (
        <Select defaultValue={props.default} style={props.style}
                onChange={props.onChange}
        >

            <Option value="LOW"><Priority type="LOW"/> Low</Option>
            <Option value="MEDIUM"><Priority type="MEDIUM"/> Medium</Option>
            <Option value="HIGH"><Priority type="HIGH"/> High</Option>
        </Select>
    );
};

export default withFormData(PrioritySelector);
