const sequelize = require('../db.js')
const { DataTypes } = require('sequelize')
const Point = require('./point.js')
const User = require('./user.js')

const userPoints = sequelize.define('userPoints', {
    UserId: {
        type : DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    PointId: {
        type: DataTypes.INTEGER,
        references: {
            model: Point,
            key: 'id'
        }
    }
})

module.exports = userPoints