import React, {ReactElement} from 'react';

interface ContentWithMenuProps {
    children: ReactElement
    menu: ReactElement
}

const ContentWithMenu = (props: ContentWithMenuProps) => {
    return (
        <div className="columns">
            {props.menu}
            <div style={{backgroundColor: "#f5f7f9", height: "100vh"}} className="column content-with-menu">
                {props.children}
            </div>
        </div>
    );
};

export default ContentWithMenu;