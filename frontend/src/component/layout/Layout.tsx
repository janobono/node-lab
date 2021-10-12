import React, { FunctionComponent } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: FunctionComponent = (props) => {
    return (
        <React.Fragment>
            <Header/>
            <main className="w3-container">{props.children}</main>
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;
