'use strict';
const moment = require("moment");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models.Loan, {
        as: "loan",
        foreignKey: "UserId",
      });
    }
  }
  Member.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    banedDate:DataTypes.DATE,
    isPunishment:DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("createdAt") != null
          ? moment(this.getDataValue("createdAt")).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : null;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("updatedAt") != null
          ? moment(this.getDataValue("updatedAt")).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : null;
      },
    },
  }, {
    sequelize,
    modelName: 'Member',
    tableName: "members",
    underscored: true,
    timestamps: false,
  });
  return Member;
};