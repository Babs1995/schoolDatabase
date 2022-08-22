"use strict";
const { Model , DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description cannot be empty"
          }
        }
      },
      estimatedTime: {
        type: DataTypes.STRING
      },
      materialsNeeded: {
        type: DataTypes.STRING
      },
    },
    { sequelize }
  );
//   userId (created in the model associations with the foreignKey property, and equals the id from the Users table)
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
        // alias
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return Course;
};
