import React from 'react';
import HeroFullPage from "../Layout/HeroFullPage";

const Loading = () => {
    return (
        <HeroFullPage width={2}>
            <>
                <div className="spaced-box is-loading"/>
            </>
        </HeroFullPage>
    );
};

export default Loading;