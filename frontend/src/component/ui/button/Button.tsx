import React, { FunctionComponent } from 'react';

import classes from './Button.module.css';

type Props = {
    type?: 'submit' | 'reset' | 'button' | undefined,
    className?: string,
    onClick?: () => void,
    disabled?: boolean
};

const Button: FunctionComponent<Props> = (props) => {
    return (
        <button
            type={props.type || 'button'}
            className={`${classes.button} ${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
