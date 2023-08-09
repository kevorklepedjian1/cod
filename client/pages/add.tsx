import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../services/tasksApi";
import * as Yup from "yup";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const initialState: Task = {
  title: "",
  description: "",
  dueDate: "",
  completed: false,
};

const add: React.FC = () => {
  const { id } = useRouter().query;
  const [adddatas] = useCreateTaskMutation();
  const [editMode, setEditMode] = React.useState(Boolean(id));
  const { data } = useGetTasksQuery();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due Date is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!editMode) {
          await adddatas(values);
          toast.success("Contact Added Successfully");
        } else {
          // Handle update logic here
          toast.success("Contact Updated Successfully");
        }
        router.push("/");
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
    },
  });

  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Your Name..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <p className="text-red-500 text-xs italic">{formik.errors.title}</p>
        ) : null}

        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mt-4">
          Email
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Your Email..."
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
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          placeholder="Due Date..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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

        {/* Add some spacing */}
        <div className="mt-4 space-x-4">
          <button
            type="button"
            onClick={() => router.push("/")} // Add onClick function to navigate back
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default add;
