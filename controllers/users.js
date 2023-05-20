const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const Point = require('../models/point.js')

userRouter.get('/', async (request, response) => {
    try {
      const allUsers = await User.findAll()
      console.log("all users fetched!");
      response.json(allUsers)
    } catch (error) {
      console.error("Error executing the query: ", error)
      response.status(500).end()
    } 
})

userRouter.get('/:id', async (request, response) => {
  const singleUser = await User.findByPk(request.params.id)
  if(singleUser) {
    console.log("user found!");
    response.json(singleUser)
  } else {
    console.log("user not found");
    response.status(404).end()
  }
})

userRouter.post('/', async (request, response) => {
    const {username, password} = request.body
    const hashedpassword = await bcrypt.hash(password, 10)
    try {
      await User.create({username: username, password: hashedpassword})
      response.status(201).json({message: "new user created!"}).end()
    } catch (error) {
      console.error("failed to create point: ", error);
      response.status(500).json({message: "failed to create user"}).end()
    }
  })

userRouter.delete('/:id', async (request, response) => {
    const trashUser = await User.findByPk(request.params.id)
    if (trashUser){
      await trashUser.destroy()
      response.status(204).json({message: "user deleted succesfully"}).end()
    } else {
      response.status(404).end()
    }
  })

  userRouter.patch('/addpoint', async (request, response) => {
    const achievingUser = await User.findOne({where: {id: request.body.userId}})
    const userPoint = await Point.findByPk(request.body.pointId)
    if(achievingUser && userPoint){
      await achievingUser.addPoint(userPoint)
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  })
module.exports = userRouter