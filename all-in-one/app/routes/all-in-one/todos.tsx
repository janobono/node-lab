import { FunctionComponent } from 'react';
import { Outlet } from 'remix';

const TodosLayout: FunctionComponent = () => {
    return (
        <Outlet/>
    );
}

export default TodosLayout;
