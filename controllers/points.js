const pointRouter = require('express').Router()
const Point = require('../models/point')

//respond to a get request with all of the points in the database. respond with status 500 if there is an error
pointRouter.get('/', async (request, response) => {
    try {
      const allPoints = await Point.findAll()
      console.log("all points fetched!");
      response.json(allPoints)
    } catch (error) {
      console.error("Error executing the query: ", error)
      response.status(500)
    } 
  })

  
module.exports = pointRouter