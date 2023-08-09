import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../models/task.model';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003/' }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void> ({
      query: () => 'task/list',
      providesTags: ["Task"],
    }),
    task: builder.query<Task, string>({
      query: (id) => `/task/list/${id}` ,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<{}, Task>({
      query: (newTask) => ({
        url: 'task/create',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags:["Task"],
    }),
    updateTask: builder.mutation<void, Task>({
      query: ({ _id, ...updates }) => ({
        url: `task/update/${_id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags:["Task"],
    }),
    toggleComplete: builder.mutation({
        query: ({ _id, completed }) => ({
          url: `task/toggle-complete/${_id}`,
          method: 'PATCH', // You can use PATCH or PUT based on your server setup
          body: { completed },
        }),
      }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation,useTaskQuery, useUpdateTaskMutation, useDeleteTaskMutation,  useToggleCompleteMutation } = tasksApi;
