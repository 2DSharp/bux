import React, {CSSProperties} from 'react';
import Priority from "../Icon/Priority";
import {Select} from "antd";
import {withFormData} from "./FormData";

const {Option} = Select;

const PrioritySelector = (props: {default: string, style?: CSSProperties, onChange?: any}) => {

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
