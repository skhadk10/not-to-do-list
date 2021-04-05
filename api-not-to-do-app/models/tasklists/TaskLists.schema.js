import mongoose from 'mongoose'

const TaskListSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      default: '',
    },
    hr: {
      type: Number,
      require: true,
      default: 0,
    },
    todo: {
      type: Boolean,
      require: true,
      default: true,
    },

    // addedAt,
    // updatedAt,
  },
  {
    timestamps: true,
  }
)

// creating tables and Task_list
const TaskList = mongoose.model('Task_List', TaskListSchema)
export default TaskList
