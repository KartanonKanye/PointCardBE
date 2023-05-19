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
// if the function finds a point then return it
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
// create a new point using the data from the request and save it to the db. the create function from sequelize builds and saves the point
pointRouter.post('/', async (request, response) => {
  try {
    const newPoint = await Point.create(request.body)
    response.status(201).json({message: "new point created!"}).end()
  } catch (error) {
    console.error("failed to create point: ", error);
    response.status(500).json({message: "failed to create point"}).end()
  }
})
// find a point and if found delete it.
pointRouter.delete('/:id', async (request, response) => {
  const trashPoint = await Point.findByPk(request.params.id)
  if (trashPoint){
    await trashPoint.destroy()
    response.status(204).json({message: "point deleted succesfully"}).end()
  } else {
    response.status(404).end()
  }
})

pointRouter.patch('/:id', async (request, response) => {
  const updatePoint = await Point.findByPk(request.params.id)
  if (updatePoint) {
    try {
      await updatePoint.update(request.body)
      response.status(202).end()
    } catch (error) {
      console.log(error);
      response.status(505).json({message: "failed to update point"})
    }
  } else {
    response.status(404).end()
  }
})

module.exports = pointRouter