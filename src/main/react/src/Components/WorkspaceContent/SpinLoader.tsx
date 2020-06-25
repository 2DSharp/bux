import React from 'react';
import GeneralSpin from "../Element/Loader/GeneralSpin";

const SpinLoader = () => {
    return (
        <div className="centered-absolutely" style={{height: 400}}>
            <GeneralSpin size={60}/>
        </div>
    );
};

export default SpinLoader;
