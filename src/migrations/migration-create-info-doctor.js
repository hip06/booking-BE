'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Info_Doctors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            clinicId: {
                type: Sequelize.INTEGER
            },
            specialtyId: {
                type: Sequelize.INTEGER
            },
            priceId: {
                type: Sequelize.STRING
            },
            provinceId: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.STRING
            },
            addressClinic: {
                type: Sequelize.TEXT
            },
            nameClinic: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT('long')
            },
            count: {
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
        await queryInterface.dropTable('Info_Doctors');
    }
};