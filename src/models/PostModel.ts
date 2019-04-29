import * as Sequelize from "sequelize";

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import sequelize = require("sequelize");
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes>{}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes>{}

export default (Sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {
    const Post: PostModel = Sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        }
    }, {
        tableName: 'posts'
    });

    Post.associate = (models: ModelsInterface): void => {
        Post.belongsTo(models.User, {
            foreignKey:{
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    };

    return Post;

};