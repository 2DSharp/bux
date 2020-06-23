import React, {CSSProperties} from 'react';
import classNames from "classnames";

export type Pressure = "HIGH" | "LOW" | "MEDIUM"

interface ProgressProps {
    progress: number,
    pressure?: Pressure,
    className?: string
    style?: CSSProperties
}

const Progress = (props: ProgressProps) => {
    const progressPressure = (pressure: Pressure | undefined) =>
        classNames("progress", props.className, {
            "is-success": pressure === "LOW",
            "is-danger": pressure === "HIGH",
            "is-info": pressure === "MEDIUM"
        });
    return (
        <>
            <progress
                className={progressPressure(props.pressure)}
                value={props.progress}
                style={props.style}
                max="100">{props.progress}%
            </progress>
            <> {props.progress}%</>
        </>
    );
};

export default Progress;
