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
        <footer className="w3-container w3-gray w3-center w3-padding">
            <div>
                <p>
                    <strong>Node Lab</strong> by <a href="https://www.janobono.com/">janobono</a>. The source code is
                    free.
                </p>
                {health ? <span onClick={healthHandler} className="w3-tag w3-green">Backend healthy</span> :
                    <span onClick={healthHandler} className="w3-tag w3-red">Backend Error</span>}
            </div>
        </footer>
    );
};

export default Footer;
