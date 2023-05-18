//dotenv to accees environment variables defined in the .env file.
require('dotenv').config({path: "./.env"})
const {Sequelize} = require('sequelize')

//define database parameters and connect to the database
const sequelize = new Sequelize(
    {database: 'digitalfuksi', 
    username: 'postgres', 
    password: process.env.DATABASE_PASSWORD, 
    dialect: 'postgres',
    port: '3049'
    })

    

module.exports = sequelize