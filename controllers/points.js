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
      response.status(500).end()
    } 
})
// return a single point if found
pointRouter.get('/:id', async (request, response) => {
  const singlePoint = await Point.findByPk(request.params.id)
  if(singlePoint) {
    console.log("point found!");
    response.json(singlePoint)
  } else {
    console.log("point not found");
    response.status(404).end()
  }
})

pointRouter.post('/', async (request, response) => {
  try {
    const newPoint = await Point.create(request.body)
    response.status(201).json({message: "new point created!"}).end()
  } catch (error) {
    console.error("failed to create point: ", error);
    response.status(500).json({message: "failed to create point"}).end()
  }
})

  
module.exports = pointRouter