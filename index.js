// Express library for the backend. Docs -> https://expressjs.com/
// I used the sequelize library to work with my postgres database. Docs -> https://sequelize.org/docs/v6/getting-started/
const express = require('express')
const app = express()
const sequelize = require('./db.js')

// Function to confirm that we have succesfully connected. 
const main = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// respond to a get request with hello world
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

main()

const PORT = 5048
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})