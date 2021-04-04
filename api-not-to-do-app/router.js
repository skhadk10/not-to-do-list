import express from 'express'
const router = express.Router()

import {
  insertTask,
  updateToDo,
  getList,
  deleteTasks,
} from './models/tasklists/TaskLists.model.js'

router.all('*', (req, res, next) => {
  next()
})

// get method
router.get('/', async (req, res) => {
  // call the function and get the database
  console.log('work')
  const result = await getList(req.body)

  return res.json({
    status: 'sucess',
    message: 'Your get task is added',
    result, //const ma vako result lerako
  })
})

// create new task in the database and imported insertlist from tasklists.model
router.post('/', async (req, res) => {
  const result = await insertTask(req.body)
  if (result._id) {
    return res.json({
      status: 'success',
      message: 'Your new task is added',
    })
  }
  res.json({
    status: 'error',
    message: 'unable to add your new task, please check and try again',
  })
})

// patch method update task form todo to not to do and vice-varsa
router.patch('/', async (req, res) => {
  const { todo } = req.body
  console.log(todo)
  try {
    const result = await updateToDo(todo)

    res.json(result)
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    })
  }
})

// put method
router.put('/', async (req, res) => {})

// delete method call function to delete task from database
router.delete('/', async (req, res) => {
  try {
    const ids = req.body
    console.log(ids)
    const result = await deleteTasks(ids)

    console.log(result)

    if (result?.deletedCount) {
      return res.json({
        status: 'success',
        message: ' task is deleted',
      })
    }
    res.json({
      status: 'error',
      message: ' Nothing is deleted',
    })
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    })
  }
})

export default router
