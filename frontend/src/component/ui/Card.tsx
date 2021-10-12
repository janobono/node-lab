import React, { FunctionComponent } from 'react';

type Props = {
    className: string
};

const Card: FunctionComponent<Props> = (props) => {
    return (
        <div className={`w3-card ${props.className}`}>{props.children}</div>
    );
};

export default Card;
