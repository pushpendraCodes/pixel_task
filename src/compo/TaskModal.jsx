import React, { useContext } from "react";
import { Context } from "../context/DataContext";

const TaskModal = () => {
  const { board, activeTask, setTaskModal, activeBoard } = useContext(Context);

  console.log("Board:", board);
  console.log("Active Task:", activeTask);

  // Ensure board and activeTask are present
  if (!board || !activeTask) {
    console.log("board or activeTask is undefined.");
    return null; // Do not render modal if there's no data
  }

  // Get the active board
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

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("fixed")) {
      closeModal();
    }
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const closeModal = () => {
    setTaskModal(false);
    console.log("Modal closed");
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div
        onClick={handleModalClick}
        className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <button
            className="text-gray-500"
            onClick={closeModal}>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 my-5">{task.Description}</p>

        {/* Subtasks */}
        <div className="mt-4">
          <h3 className="text-md font-medium">
            Subtasks ({task.subtasks.filter((sub) => sub.isChecked).length} of{" "}
            {task.subtasks.length})
          </h3>
          <div className="mt-5 space-y-2">
            {task.subtasks?.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={subtask.isChecked}
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
          <h3 className="text-md font-medium">Current Status</h3>
          <div className="mt-2">
            <input
              type="text"
              value={
                task.status === 0
                  ? "todo"
                  : task.status === 1
                  ? "in Progress"
                  : "done"
              }
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
