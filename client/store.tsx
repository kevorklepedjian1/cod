import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './services/tasksApi';



const store = configureStore({
  reducer: {
    
    [tasksApi.reducerPath]: tasksApi.reducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export default store;

