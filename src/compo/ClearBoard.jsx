import React, { useContext } from "react";
import { Context } from "../context/DataContext";

const ClearBoard = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    board,
    activeTask,
    setTaskModal,
    activeBoard,
    setBoard,
    setIsModalOpen, clearBoardModalOpen, setIsclearBoardModalOpen
  } = useContext(Context);

  // Delete Task Function
  const handelClearBoard = () => {
    const updatedBoard = board.map((b) => {
      if (b.id === activeBoard) {
        // Clear tasks but keep the columns intact
        return {
          ...b,
          task: [],
          columns:[] // Clear the task array
        };
      }
      return b;
    });

    setBoard(updatedBoard); // Update the board in the context
    onClose(); // Close modal after clearing
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-red-600 text-lg font-bold mb-4">clear this Board?</h2>
        <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to clear the
        {board[activeBoard-1].name}  board? This action will remove all columns and tasks and cannot be reversed.


        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={handelClearBoard}
            className="bg-red-500 text-white px-12 py-2 rounded-full hover:bg-red-600 transition"
          >
            Clear
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

export default ClearBoard;
