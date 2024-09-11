import React, { useContext } from "react";
import { Context } from "../context/DataContext";

const ResetAllBoardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    board,
    activeTask,
    setTaskModal,
    activeBoard,
    setBoard,
    setIsModalOpen,
    clearBoardModalOpen,
    setIsclearBoardModalOpen,
    setIsdeleteBoardModalOpen,
  } = useContext(Context);

  // Delete Task Function
  const handelResetAllBoardModal = () => {


    setBoard([]); // Update the board in the context
    onClose();

    // Close modal after clearing
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-red-600 text-lg font-bold mb-4">
        Reset all Boards?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to reset all boards? This action will remove all boards, columns, tasks etc which where created by you. This action can't be reversed!
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={handelResetAllBoardModal}
            className="bg-red-500 text-white px-12 py-2 rounded-full hover:bg-red-600 transition">
            Reset
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-12 rounded-full py-2 hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetAllBoardModal;
