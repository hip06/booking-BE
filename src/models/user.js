'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.dsd
     */
    static associate(models) {
      // define association herecc
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
      User.hasOne(models.Info_Doctor, { foreignKey: 'doctorId' })
      User.hasMany(models.Schedule, { foreignKey: 'doctorId' })
      User.hasMany(models.Booking, { foreignKey: 'patientId' })

    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};