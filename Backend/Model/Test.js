
const {DataTypes} = require('sequelize')

const sequelize = require("../Database/db");

const Test = sequalize.define('Test',{
    id:{
        type: DataTypes.INTEGER,
        autoInrenment: true,
        primaryKey: true
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}
)

module.exports = Test