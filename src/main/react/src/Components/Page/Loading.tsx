import React from 'react';
import WizardPage from "../Layout/WizardPage";

const Loading = () => {
    return (
        <WizardPage width={2}>
            <>
                <div className="spaced-box is-loading"/>
            </>
        </WizardPage>
    );
};

export default Loading;