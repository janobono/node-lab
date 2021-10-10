import React, { FunctionComponent, useEffect, useState } from 'react';

const Footer: FunctionComponent = () => {
    const [health, setHealth] = useState(false);

    const healthHandler = () => {
        fetch('/api/node-lab-backend/health')
            .then(
                result => {
                    setHealth(result.status === 200);
                }
            );
    }

    useEffect(() => {
        healthHandler();
    }, []);

    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    <strong>Node Lab</strong> by <a href="https://www.janobono.com/">janobono</a>. The source code is
                    free.
                </p>
                {health ? <span className="tag is-success is-light" onClick={healthHandler}>Backend healthy</span> :
                    <span className="tag is-danger is-light" onClick={healthHandler}>Backend Error</span>}
            </div>
        </footer>
    );
};

export default Footer;
