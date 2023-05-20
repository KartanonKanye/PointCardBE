const Point = require('./point.js')
const User = require('./user.js')

//create the associations between the tables
const defineAssociations = () => {
    Point.belongsToMany(User, {through: "userPoints"})
    User.belongsToMany(Point, {through: "userPoints"})
}

module.exports = defineAssociations