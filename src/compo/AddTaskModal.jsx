import React, { useContext, useState } from "react";
import { Context } from "../context/DataContext";

const AddTaskModal = () => {
  const {
    board,
    setBoard,
    activeBoard,
    TaskModal,
    setTaskModal,
    isaddTaskModal,
    setisaddTaskModal,
  } = useContext(Context);

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { task: "make coffe", isChecked: false },
  ]);
  const [status, setStatus] = useState(0); // Default status

  // Handle subtasks dynamically
  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].task = value;
    setSubtasks(newSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { task: "", isChecked: false }]);
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      Description,
      subtasks,
      status,
    };

    // Update the board with the new task
    // const updatedBoard = board.map((b) => {
    //   if (b.id === activeBoard) {
    //     // Ensure that b.task[status] exists and is an array
    //     if (!Array.isArray(b.task[status])) {
    //       b.task[status] = []; // Initialize it as an empty array if not present
    //     }

    //     // Add the new task to the specified status (column)
    //     b.task[status] = [...b.task[status], newTask];
    //   }
    //   return b;
    // });
    console.log(newTask,activeBoard, "newTask");
    let copyBoard = [...board];
    copyBoard[activeBoard-1].task.push(newTask);
    console.log(copyBoard, "copyBoard");


    setBoard(copyBoard);
    setisaddTaskModal(false); // Close the modal after submission
  };

  if (!isaddTaskModal) return null; // Only render the modal when it's open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setisaddTaskModal(false)} // Close modal on click
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subtasks
            </label>
            {subtasks.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center mb-2">
                <input
                  type="text"
                  value={subtask.task}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Subtask"
                />
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeSubtask(index)}>
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-500 hover:text-blue-700"
              onClick={addSubtask}>
              + Add New Subtask
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}>
              {board
                .find((b) => b.id === activeBoard)
                .columns.map((column, index) => (
                  <option
                    key={index}
                    value={index}>
                    {column}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
