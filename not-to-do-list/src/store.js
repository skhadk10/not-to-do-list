import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./component/taskSlice.js";
const store = configureStore({
  reducer: {
    // list all of our store
    task: taskReducer,
  },
});

export default store;
