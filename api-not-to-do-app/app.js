import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import path from 'path'

app.use(cors())

const PORT = process.env.PORT || 5000

import router from './router.js'
// importing and connectiong MOngoDB
import mongoClient from './config/db.js'
mongoClient()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/api/v1', router)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/not-to-do-list/build')))

  app.get('*', (req, res) => {
    // // thorw new Error("test error")
    res.sendFile(path.join(__dirname, '/not-to-do-list/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('dddeded to my app')
  })
}

app.use((error, req, res, next) => {
  console.log(error)
  res.send(error.message)
})

app.listen(PORT, (error) => {
  error && console.log(error)
  console.log(`server is running at http://localHost:${PORT}`)
})
