import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

const TodoDetailPage: FunctionComponent = () => {
    const params = useParams<any>();
    const {todoId} = params;

    return (
        <div>Todo {todoId} detail page</div>
    );
};

export default TodoDetailPage;
