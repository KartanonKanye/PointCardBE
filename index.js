//dotenv to accees environment variables defined in the .env file. 
// Express library for the backend. Docs -> https://expressjs.com/
// I used the sequelize library to work with my postgres database. Docs -> https://sequelize.org/docs/v6/getting-started/
require('dotenv').config({path: "./.env"})
const express = require('express')
const app = express()
const {Sequelize} = require('sequelize')

// Set up the database parameters
const sequelize = new Sequelize({database: 'digitalfuksi', 
                              username: 'postgres', 
                              password: process.env.DATABASE_PASSWORD, 
                              dialect: 'postgres',
                              port: '3049'
                            })

// Function to connect to the database. 
const main = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// when our site receives a request, we return hello world
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

main()

const PORT = 5048
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})