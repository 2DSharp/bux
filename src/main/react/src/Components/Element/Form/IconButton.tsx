import React, {ReactNode} from 'react';

const IconButton = (props: { children: ReactNode }) => {
    return (
        <button style={{background: "none", padding: 0, border: "none", boxShadow: "none", outline: "none"}}>
            {props.children}
        </button>
    );
};

export default IconButton;
