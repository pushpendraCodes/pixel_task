import React, { useContext } from "react";
import { Context } from "../context/DataContext";

const DeleteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    board,
    activeTask,
    setTaskModal,
    activeBoard,
    setBoard,
    setIsModalOpen,
  } = useContext(Context);

  // Delete Task Function
  const handleDeleteTask = () => {
    const updatedBoard = board.map((b) => {
      if (b.id === activeBoard) {
        const updatedTasks = b.task.filter(
          (t, index) => index !== activeTask.task || t.status !== activeTask.coloumn
        );
        return { ...b, task: updatedTasks };
      }
      return b;
    });

    // Update the board with the deleted task
    setBoard(updatedBoard);

    // Close the modals
    setIsModalOpen(false);
    setTaskModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-red-600 text-lg font-bold mb-4">Delete this Task?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete the task and its subtasks? This action cannot be reversed.
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleDeleteTask}
            className="bg-red-500 text-white px-12 py-2 rounded-full hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-12 rounded-full py-2 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
