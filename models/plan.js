'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plan.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    key: DataTypes.STRING,
    planId: DataTypes.STRING,
    features: DataTypes.ARRAY,
    monthlyFee: DataTypes.FLOAT,
    transactionFee: DataTypes.FLOAT,
    transactionType: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};