import TodoModel from '../domain/todo-model';
import { nextVal } from './sequence';
import { Model } from 'sequelize';

export interface Todo {
    id: string,
    title: string,
    content: string
}

export interface TodoData {
    title: string,
    content: string
}

export const getTodos = (): Promise<Todo[]> => {
    return TodoModel.findAll()
        .then(
            models => models.map((model) => {
                // @ts-ignore
                return {...model.dataValues};
            })
        );
}

const getModel = (id: string): Promise<Model> => {
    return TodoModel.findOne({where: {id}})
        .then(
            model => {
                if (!model) {
                    throw `Todo with id ${id} not found!`;
                }
                return model;
            });
}

export const getTodo = (id: string): Promise<Todo> => {
    return getModel(id)
        .then(
            model => {
                // @ts-ignore
                return {...model.dataValues};
            });
}

export const addTodo = (data: TodoData): Promise<Todo> => {
    return nextVal('sq_nl_todo')
        .then(
            id => TodoModel.build({...data, id}).save()
        ).then(
            todoModel => {
                // @ts-ignore
                return {...todoModel.dataValues};
            });
}

export const setTodo = (id: string, data: TodoData): Promise<Todo> => {
    return getModel(id)
        .then(
            model => {
                // @ts-ignore
                model.title = data.title;
                // @ts-ignore
                model.content = data.content;
                return model.save();
            })
        .then(
            model => {
                // @ts-ignore
                return {...model.dataValues};
            }
        );
}

export const deleteTodo = (id: string): Promise<Todo> => {
    let saved: Model;
    return getModel(id)
        .then(
            model => {
                saved = model;
                return model.destroy();
            })
        .then(
            () => {
                // @ts-ignore
                return {...saved.dataValues};
            }
        );
}
