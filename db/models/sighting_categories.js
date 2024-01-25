"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sighting_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sighting_categories.init(
    {
      sightingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sighting",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "sighting_categories",
      underscored: true,
    }
  );
  return sighting_categories;
};
