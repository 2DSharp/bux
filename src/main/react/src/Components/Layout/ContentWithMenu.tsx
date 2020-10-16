import React, {ReactElement} from 'react';

interface ContentWithMenuProps {
    children: ReactElement
    menu: ReactElement
}

const ContentWithMenu = (props: ContentWithMenuProps) => {
    return (
        <div style={{display: "flex"}}>
            {props.menu}
            <div style={{backgroundColor: "#f5f7f9", minHeight: "100vh"}} className="content-with-menu">
                {props.children}
            </div>
        </div>
    );
};

export default ContentWithMenu;