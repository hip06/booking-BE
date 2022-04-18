'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Handbook.init({
        descriptionHTML: DataTypes.TEXT,
        descriptionMarkdown: DataTypes.TEXT,
        title: DataTypes.STRING,
        image: DataTypes.BLOB,
        author: DataTypes.STRING,
        createdDay: DataTypes.STRING,
        updatedDay: DataTypes.STRING,
        postId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    return Handbook;
};