import React, { FunctionComponent } from 'react';

type Props = {
    className: string
};

const Card: FunctionComponent<Props> = (props) => {
    return (
        <div className={`card ${props.className}`}>{props.children}</div>
    );
};

export default Card;
