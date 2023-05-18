// Express library for the backend. Docs -> https://expressjs.com/
// I used the sequelize library to work with my postgres database. Docs -> https://sequelize.org/docs/v6/getting-started/
const express = require('express')
require('dotenv').config({path: "./.env"})
const app = express()
const sequelize = require('./db.js')
const Point = require('./models/point.js')
const pointRouter = require('./controllers/points')

// Function to confirm that we have succesfully connected. Also creates the Point table 
const main = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await Point.sync() //if force sync is set to true, the code drops the already existing table after the point created by the addpoint function is inserted. this lead to an empty table. fix this later
}

//create a point called wappu. the create function builds the point and then saves it to the database
const addPoint = async () => {
  const wappu = await Point.create({name: "Wappu", description: "participate in tour de walpuri", type: "mandatory"})
  console.log( wappu.toJSON());
}
main()

addPoint()

app.use('/api/points', pointRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})