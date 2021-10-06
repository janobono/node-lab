import React, { FunctionComponent, useContext } from 'react';
import Card from '../ui/card/Card';
import classes from './Home.module.css';
import Button from '../ui/button/Button';
import AuthContext from '../../context/auth-context';

const Home: FunctionComponent = () => {
    const ctx = useContext(AuthContext);

    return (
        <Card className={classes.home}>
            <h1>Welcome back!</h1>
            <Button onClick={ctx.onLogout}>Logout</Button>
        </Card>
    );
};

export default Home;
