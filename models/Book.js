'use strict';
const moment = require("moment");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Loan, {
        as: "Book",
        foreignKey: "id",
      });
    }
  }
  Book.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    isExist:DataTypes.BOOLEAN,
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
    modelName: 'Book',
    tableName: "books",
    underscored: true,
    timestamps: false,
  });
  return Book;
};