
const express = require('express')
const app = express()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({database: 'digitalfuksi', 
                              username: 'postgres', 
                              password: 'DarksoulsArtorias1', 
                              dialect: 'postgres',
                              port: '3049'
                            })

const main = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

main()

const PORT = 5048
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})