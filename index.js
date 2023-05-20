// Express library for the backend. Docs -> https://expressjs.com/
// I used the sequelize library to work with my postgres database. Docs -> https://sequelize.org/docs/v6/getting-started/
require('dotenv').config({path: "./.env"})
const express = require('express')
const app = express()
const sequelize = require('./db.js')
const Point = require('./models/point.js')
const User = require('./models/user.js')
const pointRouter = require('./controllers/points.js')
const userRouter = require('./controllers/users.js')

app.use(express.json())

// Function to confirm that we have succesfully connected. Also creates the Point table 
const main = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

//the sync function creates a tablwe in the db if the table is missing. Also updates the table according to the model if there are differences.
const syncTables = async () => {
  await Point.sync()
  await User.sync()
}

//create a point called wappu. the create function builds the point and then saves it to the database
const addPoint = async () => {
  const wappu = await User.create({username: "PV", password: "dgisbest"})
  console.log( wappu.toJSON());
}

main()

syncTables()

app.use('/api/points', pointRouter)
app.use('/api/users', userRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})