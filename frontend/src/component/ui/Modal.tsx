import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Modal: FunctionComponent = (props) => {
    return (
        ReactDOM.createPortal(
            <div className={'w3-modal ' + classes.modal}>
                <div className="w3-modal-content">
                    {props.children}
                </div>
            </div>,
            document.getElementById('modal')!
        )
    );
}

export default Modal;
