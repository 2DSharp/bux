import React, {ReactNode} from 'react';
import "../../sass/project.scss";

const Container = (props : {children : ReactNode}) => {
    return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div className="centerpiece">
                    <div className="container">
                            {props.children}
                    </div>
                </div>
            </div>
    );
};

export default Container;
