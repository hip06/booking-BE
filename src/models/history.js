'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  History.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    emailPatient: DataTypes.TEXT,
    files: DataTypes.BLOB,
    token: DataTypes.STRING,
    timeType: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};