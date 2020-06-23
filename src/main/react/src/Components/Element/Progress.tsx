import React, {CSSProperties} from 'react';
import classNames from "classnames";

interface ProgressProps {
    progress: number,
    pressure?: "HIGH" | "LOW" | "MEDIUM",
    className?: string
    style?: CSSProperties
}

const Progress = (props: ProgressProps) => {
    const progressPressure = (pressure: "HIGH" | "LOW" | "MEDIUM" | undefined) =>
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
