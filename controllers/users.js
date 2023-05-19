const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

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

module.exports = userRouter