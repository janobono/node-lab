import React, { FunctionComponent } from 'react';
import { Outlet } from 'remix';

import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

const AllInOneLayout: FunctionComponent = () => {
    return (
        <React.Fragment>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default AllInOneLayout;
