import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './todoListSlice';


const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>; // Root state type
export type AppDispatch = typeof store.dispatch; // App dispatch type

export default store;