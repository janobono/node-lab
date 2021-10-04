import sequelize from '../index';
import { DataTypes } from 'sequelize';

const TodoModel = sequelize.define(
    'todo',
    {
        id: {
            field: 'id',
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        username: {
            field: 'title',
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            field: 'content',
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'nl_todo',
        timestamps: false
    });

export default TodoModel;
