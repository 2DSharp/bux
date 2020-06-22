import React, {CSSProperties} from 'react';
import {withFormData} from "./FormData";
import moment from "moment";
import {DatePicker} from "antd";

interface DatePickerFieldProps {
    disablePast: boolean
    placeholder?: string
    format?: string
    style: CSSProperties
    onChange?: any
    default?: any,
    className: string
}

function disablePastDate(current: moment.Moment | null): boolean {
    if (current)
        return moment().add(-1, 'days') >= current;
    else return false;
}

const DatePickerField = (props: DatePickerFieldProps) => {
    return (
        <DatePicker placeholder={props.placeholder} defaultValue={props.default} showToday
                    disabledDate={current => props.disablePast ? disablePastDate(current) : false}
                    format={props.format}
                    onChange={value => value && props.onChange(value.format(props.format))}
                    className={props.className}
                    style={props.style}
        />
    );
};

export default withFormData(DatePickerField);
