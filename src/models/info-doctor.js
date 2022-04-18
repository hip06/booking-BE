'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Info_Doctor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Info_Doctor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'price' })
            Info_Doctor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'province' })
            Info_Doctor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'payment' })
            Info_Doctor.belongsTo(models.Markdown, { foreignKey: 'doctorId', targetKey: 'doctorId' })
            Info_Doctor.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id' })
            Info_Doctor.belongsTo(models.Spec, { foreignKey: 'specialtyId', targetKey: 'id' })
        }
    };
    Info_Doctor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.TEXT,
        nameClinic: DataTypes.STRING,
        note: DataTypes.TEXT('long'),
        count: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Info_Doctor',
    });
    return Info_Doctor;
};