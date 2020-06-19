import React, {useState} from 'react';
import {Select} from "antd";
import {SelectProps} from "antd/lib/select";

interface ComboBoxProps extends SelectProps<string> {
    values: string[]
}

const ComboBox = (props: ComboBoxProps) => {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const handleSearch = (val: string) => {
        setSearchValue(val);
    };
    const filter = (input: string, option: any): boolean => {
        if (option) {
            if (option.key == -1)
                return true;
            return (option.children as string).toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return false;
    }
    return (
        <Select
            style={props.style}
            placeholder={props.placeholder}
            showSearch
            showArrow={false}
            filterOption={filter}
            onSearch={handleSearch}
            onChange={value => {
                setValue(value as string);
                setSearchValue('');
                console.log(value)
            }}
            notFoundContent={<span>Start typing to add a new milestone</span>}
            allowClear
        >
            {props.values && props.values.map((title) => (
                <Select.Option key={title} value={title}>{title}</Select.Option>
            ))}
            {
                searchValue &&
                <Select.Option key={-1} value={searchValue}>
                    <span className="primary-colored"
                          onClick={() => setValue(searchValue)}>
                        {
                            value !== searchValue
                                ? `Add '${searchValue}'`
                                : value
                        }
                    </span>
                </Select.Option>
            }


        </Select>
    );
};

export default ComboBox;
