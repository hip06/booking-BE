'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType' })
            Allcode.hasMany(models.Info_Doctor, { foreignKey: 'priceId', as: 'price' })
            Allcode.hasMany(models.Info_Doctor, { foreignKey: 'provinceId', as: 'province' })
            Allcode.hasMany(models.Info_Doctor, { foreignKey: 'paymentId', as: 'payment' })
            Allcode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'status' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};