import React, {useState} from 'react';
import MdIcon from "../MDIcon";
import classNames from "classnames";

const AnimatedSubscribe = (props: { className: string }) => {
    const [hover, setHover] = useState(false);

    const hoverClass = classNames(props.className, {
        "mdi-bell-ring-outline": hover,
        "mdi-bell-outline": !hover
    })
    return (
        <MdIcon onMouseOut={() => setHover(false)} onMouseOver={() => setHover(true)} value={hoverClass}
                className={props.className}/>
    );
};

export default AnimatedSubscribe;
