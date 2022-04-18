'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Handbooks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT('long')
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            author: {
                type: Sequelize.STRING
            },
            createdDay: {
                allowNull: false,
                type: Sequelize.STRING
            },
            updatedDay: {
                allowNull: false,
                type: Sequelize.STRING
            },
            postId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Handbooks');
    }
};