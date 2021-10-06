import sequelize from '../index';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define(
    'user',
    {
        username: {
            field: 'username',
            primaryKey: true,
            type: DataTypes.STRING,
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: 'nl_user',
        timestamps: false
    });

export default UserModel;
