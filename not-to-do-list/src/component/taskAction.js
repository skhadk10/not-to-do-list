import {
  createTask,
  getTaskLists,
  switchTask,
  deleteTaskLists,
} from "../taskApi.js";
import {
  requestPending,
  addTaskSuccess,
  requestFail,
  fetchTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
} from "./taskSlice.js";

export const addTask = (FrmDt) => async (dispatch) => {
  try {
    dispatch(requestPending());
    const result = await createTask(FrmDt);
    // call the api to sent the data
    dispatch(addTaskSuccess(result));
    result.status === "success" && dispatch(fetchTaskLists());
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};

export const fetchTaskLists = () => async (dispatch) => {
  try {
    dispatch(requestPending());

    const taskArg = await getTaskLists();
    dispatch(fetchTaskSuccess(taskArg));
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};

export const taskSwitch = (toUpdate) => async (dispatch) => {
  try {
    dispatch(requestPending());

    const result = await switchTask(toUpdate);
    dispatch(updateTaskSuccess(result));

    result.status === "success" && dispatch(fetchTaskLists());
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};

export const deleteTasks = (ids) => async (dispatch) => {
  try {
    if (
      window.confirm("Are  you sure you want to delete the selected items?")
    ) {
      dispatch(requestPending());

      const result = await deleteTaskLists(ids);

      dispatch(deleteTaskSuccess(result));

      result.status === "success" && dispatch(fetchTaskLists());
    }
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};
