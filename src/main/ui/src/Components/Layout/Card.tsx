import React, {ReactElement} from 'react';

interface CardProps {
    children: ReactElement
}
const Card = (props: CardProps) => {
    return (
        <div className="card">
            <div className="card-content">
                {props.children}
            </div>
        </div>
    );
};

export default Card;