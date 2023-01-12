'use strict';
const moment = require("moment");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.Book, {
        as: "Book",
        foreignKey: "BookId",
      });
      Loan.belongsTo(models.Member, {
        as: "loan",
        foreignKey: "UserId",
      });
    }
  }
  Loan.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    BookId: DataTypes.UUID,
    UserId: DataTypes.UUID,
    deadline: DataTypes.DATE,
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
    modelName: 'Loan',
    tableName: "loans",
    underscored: true,
    timestamps: false,
  });
  return Loan;
};