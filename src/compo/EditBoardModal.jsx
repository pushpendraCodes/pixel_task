import React, { useState, useContext } from "react";
import { Context } from "../context/DataContext"; // Import your context

const EditBoardModal = () => {
  const { board, activeBoard, setBoard, setEditModal,isEditBoard, setisEditBoard } = useContext(Context);

  const activeBoardData = board.find((b) => b.id === activeBoard);

  if (!activeBoardData) {
    return null; // Don't render if no active board
  }

  const [boardName, setBoardName] = useState(activeBoardData.name);
  const [columns, setColumns] = useState([...activeBoardData.columns]);

  const handleColumnChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const addColumn = () => {
    setColumns([...columns, ""]);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedBoard = board.map((b) => {
      if (b.id === activeBoard) {
        return {
          ...b,
          name: boardName,
          columns,
        };
      }
      return b;
    });

    setBoard(updatedBoard); // Update board in context
    setEditModal(false); // Close modal after saving
    setisEditBoard(false); // Close modal after saving
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("fixed")) {
        setisEditBoard(false);
    }
  };



  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleOutsideClick} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div onClick={handleModalClick} className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Board</h2>
        {/* Board Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Board Name
          </label>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Board Columns */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Board Columns
          </label>
          {columns.map((column, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={column}
                onChange={(e) => handleColumnChange(index, e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => removeColumn(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={addColumn}
            className="mt-2 bg-[#E4EBFA] rounded-full w-full py-2 "
          >
            + Add New Column
          </button>
        </div>

        {/* Save Button */}
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

export default EditBoardModal;
