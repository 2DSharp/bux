import React, {ReactElement, ReactNode} from 'react';

interface CardProps {
    children: ReactNode
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