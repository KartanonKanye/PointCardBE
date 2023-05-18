const sequelize = require('../db.js')
const { DataTypes } = require('sequelize')

const Point = sequelize.define('Point', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
            isIn: [['mandatory', 'party', 'work' ]]
        }
    }
})

module.exports = Point