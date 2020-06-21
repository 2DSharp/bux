import React from 'react';
import {useParams} from "react-router-dom";

const Goal = () => {
    const {id} = useParams();

    return (
        <div>
            Goals be here with {id}
        </div>
    );
};

export default Goal;
