import { Model, QueryTypes } from 'sequelize';
import UserModel from '../domain/user-model';
import sequelize from '../index';

export interface User {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
}

const getModel = (username: string): Promise<Model> => {
    return UserModel.findOne({where: {username}})
        .then(
            model => {
                if (!model) {
                    throw `User with id ${username} not found!`;
                }
                return model;
            });
}

export const countUsers = (username: string): Promise<string> => {
    return sequelize.query(
        'SELECT count(username) FROM nl_user WHERE username = ($1)',
        {
            bind: [username],
            type: QueryTypes.SELECT,
            plain: true
        }
    ).then(
        result => {
            // @ts-ignore
            return result.count;
        }
    );
}

export const getUser = (username: string): Promise<User> => {
    return getModel(username)
        .then(
            model => {
                // @ts-ignore
                return {...model.dataValues};
            });
}

export const addUser = (user: User): Promise<User> => {
    return UserModel.build({...user}).save()
        .then(
            todoModel => {
                // @ts-ignore
                return {...todoModel.dataValues};
            });
}
