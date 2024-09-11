import React, { useContext, useState } from "react";
import { Context } from "../context/DataContext";

const EditTaskModal = () => {
  const {
    board,
    activeTask,
    setTaskModal,
    activeBoard,
    setBoard,
    setEditModal,
  } = useContext(Context);

  const activeBoardData = board.find((b) => b.id === activeBoard);

  if (!activeBoardData) {
    console.log("activeBoard is undefined.");
    return null; // Do not render modal if activeBoard is undefined
  }

  // Get the task based on activeTask
  const task = activeBoardData.task.find(
    (t, index) => index === activeTask.task && t.status === activeTask.coloumn
  );

  if (!task) {
    console.log("Task is undefined.");
    return null; // Do not render modal if task is undefined
  }

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.Description || "");
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [status, setStatus] = useState(task?.status || 0);

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], task: value };
    setSubtasks(updatedSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { task: "", isChecked: false }]);
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      subtasks,
      status,
    };

    // Update the board
    const updatedBoard = board.map((b) => {
      if (b.id === activeBoard) {
        return {
          ...b,
          task: b.task.map((t, index) => {
            if (index === activeTask.task && t.status === activeTask.coloumn) {
              return updatedTask; // Update the specific task
            }
            return t; // Return other tasks unchanged
          }),
        };
      }
      return b; // Return other boards unchanged
    });

    setBoard(updatedBoard); // Update the board state with the modified task
    setEditModal(false);
    setTaskModal(false)// Close the modal after saving
  };

  const closeModal = () => {
   // Update the board state with the modified task
    setEditModal(false);
    setTaskModal(false)// Close the modal after saving
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("fixed")) {
      closeModal();
    }
  };



  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleOutsideClick} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div onClick={handleModalClick} className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={subtask.task}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => removeSubtask(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addSubtask}
            className="mt-2 bg-[#E4EBFA] rounded-full w-full py-2  ">
            + Add New Subtask
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {activeBoardData.columns.map((column, index) => (
              <option key={index} value={index}>
                {column}
              </option>
            ))}
          </select>
        </div>
        <div className="">

          <button
            onClick={handleSave}
            className="px-4 py-2 w-full rounded-full hover:bg-[#A8A4FF] text-white  bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
