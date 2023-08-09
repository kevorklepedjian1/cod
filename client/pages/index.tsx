import { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useGetTasksQuery, useDeleteTaskMutation } from "../services/tasksApi";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css"; // Update this with the correct CSS module path

const Home = () => {
  const { data, error } = useGetTasksQuery();
  const [deletecontact] = useDeleteTaskMutation();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deletecontact(id);
      toast.success("Contact Deleted Successfully");
    }
  };

  return (
    <div className="bg-white">
    <h2 className="text-center">Task managment</h2>
    <Link href="/add">
    <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
          </button>
    </Link>
    <br />
    <br />

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-2">
                        <div className="flex items-center">
                            <input
                                id="checkbox-all-search"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="p-2">
                        Product name
                    </th>
                    <th scope="col" className="p-2">
                        Color
                    </th>
                    <th scope="col" className="p-2">
                        Category
                    </th>
                    <th scope="col" className="p-2">
                        
                    </th>
                    
                    <th scope="col" className="p-2">
                        Available
                    </th>
                    
                    
                    <th scope="col" className="p-2 m-4">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.map((item: any, index: number) => (
                        <tr
                            key={item._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${index + 1}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.title}
                            </td>
                            <td className="px-6 py-4">{item.dueDate}</td>
                            <td className="px-6 py-4">{item.description}</td>
                            <td className="px-6 py-4">{item.accessories}</td>
                            <td className="px-6 py-4">
                                {item.completed ? "Yes" : "No"}
                            </td>
                            <td className="flex items-center px-6 py-4 space-x-3">
                                <Link
                                    href={`/update/${item._id}`}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                                
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
</div>

    


  );
};

export default Home;
