import { nextVal } from './sequence';
import TodoModel from '../domain/todo-model';

interface User {
    id: string,
    username: string,
    password: string
}

type InsertUserData = {
    username: string,
    password: string
}

export const addUser = (data: InsertUserData): Promise<User> => {
    return nextVal('sq_prj_user')
        .then(
            id => TodoModel.build({...data, id}).save()
        ).then(
            userModel => {
                // @ts-ignore
                return {...userModel.dataValues};
            });
}

export default User;
