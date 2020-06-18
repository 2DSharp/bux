import React, {useState} from 'react';
import {Select} from "antd";
import {SelectProps} from "antd/lib/select";

interface ComboBoxProps extends SelectProps {
    values: string[]
}

const ComboBox = (props: ComboBoxProps) => {
    const [value, setValue] = useState<string>();
    const [notFoundTip, setNotFoundTip] = useState(true);
    const handleSearch = (val: string) => {
        setValue(val);
        setNotFoundTip(true)
    };
    return (
        <Select
            style={props.style}
            placeholder={props.placeholder}
            showSearch
            showArrow={false}
            filterOption={true}
            onSearch={handleSearch}
            notFoundContent={notFoundTip
                ? <div style={{cursor: "pointer", width: "100%"}} className="primary-colored"
                       onClick={() => setNotFoundTip(false)}>Add '{value}'</div>
                : null
            }
        >
            {props.values.map((title) => (
                <Select.Option key={title}>{title}</Select.Option>
            ))}
        </Select>
    );
};

export default ComboBox;
