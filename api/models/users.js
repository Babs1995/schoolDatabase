// followed exercise for REST API auth Express
"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Looks like you're missing a first name..."
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Looks like you're missing a last name..."
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Did you forget your email?"
          },
          isEmail: {
            msg: "Oh, no! Please enter a valid email."
          }
        },
        unique: {
          msg: "The email you entered is already in our database. Try another one!"
        },
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty"
          },
        },
        set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          if(val){
            this.setDataValue('password', hashedPassword);
          };
        },
      },
    }, { sequelize });
//   userId (created in the model associations with the foreignKey property, and equals the id from the Courses table)
  User.associate = (models) => {
    User.hasMany(models.Course, {
        // creating alias
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return User;
};
