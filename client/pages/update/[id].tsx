import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../services/tasksApi";
import * as Yup from "yup";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const EditTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: tasksData } = useGetTasksQuery();

 // After fetching tasks data
console.log("tasksData:", tasksData);


console.log("id:", id);
console.log("tasksData:", tasksData);

// Assignment of taskToEdit
const taskToEdit = tasksData?.find((task) => task._id === id);
console.log("taskToEdit:", taskToEdit);


  const [updateTask] = useUpdateTaskMutation();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due Date is required"),
  });
 

  const formik = useFormik({
    initialValues: taskToEdit || {
      _id: "",
      id: "",
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateTask(values);
        toast.success("Task Updated Successfully");
        router.push("/");
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <p className="text-red-500 text-xs italic">{formik.errors.title}</p>
        ) : null}

        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mt-4">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <p className="text-red-500 text-xs italic">{formik.errors.description}</p>
        ) : null}

<label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mt-4">
          Due Date
        </label>
        {taskToEdit && (
          // Format the dueDate value
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            placeholder="Due Date..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={new Date(taskToEdit.dueDate).toISOString().substr(0, 10)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}
        {formik.touched.dueDate && formik.errors.dueDate ? (
          <p className="text-red-500 text-xs italic">{formik.errors.dueDate}</p>
        ) : null}

        <label htmlFor="completed" className="block text-gray-700 text-sm font-bold mt-4">
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          className="form-checkbox h-5 w-5 text-indigo-600 mb-2"
          checked={formik.values.completed}
          onChange={formik.handleChange}
        />

        <div className="mt-4 space-x-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
