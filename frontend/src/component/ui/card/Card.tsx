import React, { FunctionComponent } from 'react';

import classes from './Card.module.css';

type Props = {
    className: string
};

const Card: FunctionComponent<Props> = (props) => {
    return (
        <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    );
};

export default Card;
