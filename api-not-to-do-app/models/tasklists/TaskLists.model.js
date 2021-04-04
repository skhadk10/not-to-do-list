import TaskList from './TaskLists.schema.js'

// inputing files in mongoDb thorugh this process
export const insertTask = (newTask) => {
  return new Promise((resolve, reject) => {
    try {
      TaskList(newTask)
        .save()
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  })
}

export const updateToDo = ({ _id, todo }) => {
  return new Promise((resolve, reject) => {
    try {
      //  update the tasklist

      TaskList.findByIdAndUpdate(
        { _id },
        {
          $set: { todo },
        },
        {
          new: true,
        }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export const getList = () => {
  return new Promise((resolve, reject) => {
    try {
      TaskList.find()

        .then((data) => resolve(data))
        .catch((error) => reject(error))
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export const deleteTasks = (ids) => {
  if (!ids.length) return false

  return new Promise((resolve, reject) => {
    try {
      TaskList.deleteMany({
        _id: {
          $in: ids,
        },
      })

        .then((data) => resolve(data))
        .catch((error) => reject(error))
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
