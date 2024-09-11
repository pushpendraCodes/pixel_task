import React, { useContext, useRef, useState } from "react";
import { Context } from "../context/DataContext";

const Modal = () => {
  // const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    // Check if the clicked element is the overlay
    if (event.target.classList.contains("fixed")) {
      // Close the modal (you could set a state here to control modal visibility)
      console.log("Outside click detected - modal will close");
      closeModal();
    }
  };

  const handleModalClick = (event) => {
    // Stop click propagation so clicks inside the modal don't trigger outside click
    event.stopPropagation();
  };


  const {
    board,
    activeTask,
    setTaskModal,
    activeBoard,
    setBoard,
    isDeleteModalOpen,
    setIsModalOpen,
    EditModal, setEditModal
  } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeBoardData = board.find((b) => b.id === activeBoard);
console.log(activeBoardData,"activeBoardData");
console.log(activeTask,"activeTask");

  if (!activeBoardData) {
    console.log("activeBoard is undefined.");
    return null;
  }

  // Get the task based on activeTask
  const task = activeBoardData?.task.find(
    (t, index) => index === activeTask.task && t.status === activeTask.coloumn
  );

  console.log(task,"task");
  if (!task) {
    console.log("Task is undefined.");
    return null;
  }

  // Toggle checkbox for subtasks
  const handleSubtaskToggle = (subtaskIndex) => {
    const updatedBoard = [...board];
    const activeBoardTasks = updatedBoard.find(
      (b) => b.id === activeBoard
    ).task;
    const activeTaskData = activeBoardTasks[activeTask.task];
    activeTaskData.subtasks[subtaskIndex].isChecked =
      !activeTaskData.subtasks[subtaskIndex].isChecked;
    setBoard(updatedBoard); // Update the board state with new subtask check status
  };

  // Handle task status change
  const handleStatusChange = (e) => {
    const updatedBoard = [...board];
    const activeBoardTasks = updatedBoard.find(
      (b) => b.id === activeBoard
    ).task;
    activeBoardTasks[activeTask.task].status = parseInt(e.target.value);
    setBoard(updatedBoard); // Update the board state with new task status
  };

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeModal = () => {
    setTaskModal(false);
    console.log("Modal closed");
  };

  // Close the modal
  // const closeModal = () => {
  //   setTaskModal(false);
  // };

  return (
    <div onClick={handleOutsideClick} className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      {/* Modal content */}
      <div
        // ref={modalRef}
        className="bg-white p-6 rounded-lg w-[30rem]">
        {/* Task Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <div className="relative">
            <button
              className="text-gray-500"
              onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-lg shadow-lg">
                <button onClick={()=>{setEditModal(true)}} className="block w-full text-sm text-left px-4 py-2 hover:bg-gray-100">
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setTaskModal(false);

                  }}
                  className="block w-full text-sm  text-red-700 text-left px-4 py-2 hover:bg-gray-100">
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Task Description */}
        <p className="text-gray-600 mt-4">{task.Description}</p>

        {/* Subtasks */}
        <div className="mt-5">
          <h3 className="text-md text-gray-400 font-medium">
            {task.subtasks.filter((subtask) => subtask.isChecked).length} of{" "}
            {task.subtasks.length} subtasks completed
          </h3>
          <div className="mt-2 space-y-2">
            {task.subtasks.map((subtask, index) => (
              <div
                key={index}
                className={`flex gap-2 items-center ${
                  subtask.isChecked ? "bg-[#F4F7FD]" : "bg-[#F4F7FD]"
                } py-2 px-3`}>
                <input
                  type="checkbox"
                  checked={subtask.isChecked}
                  onChange={() => handleSubtaskToggle(index)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span
                  className={`text-sm ${
                    subtask.isChecked ? "line-through text-gray-500" : ""
                  }`}>
                  {subtask.task}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-4">
          <h3 className="text-sm font-medium">Current Status</h3>
          <div className="mt-2">
            <select
              value={task.status}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700">
              {activeBoardData.columns.map((column, index) => (
                <option
                  key={index}
                  value={index}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
