import React, { useContext, useState } from "react";
import { Context } from "../context/DataContext";

function NewBoardModel() {
  const handleOutsideClick = (event) => {
    // Check if the clicked element is the overlay
    if (event.target.classList.contains("fixed")) {
      // Close the modal (you could set a state here to control modal visibility)
      console.log("Outside click detected - modal will close");
      closeModal();
    }
  };
  const { newBoardModalOpen, setBoardOpen,setBoard,board } = useContext(Context);
  const handleModalClick = (event) => {
    // Stop click propagation so clicks inside the modal don't trigger outside click
    event.stopPropagation();
  };

  const closeModal = () => {
    setBoardOpen(false);
    // Implement your logic to hide the modal (e.g., setting a state)
    console.log("Modal closed");
  };

  const [columns, setColumns] = useState(["todo", "doing"]);

  // Handle input change for individual column edits
  const handleInputChange = (index, event) => {
    const newColumns = [...columns];
    newColumns[index] = event.target.value; // Update the specific column
    setColumns(newColumns);
  };


  // Add a new column
  const handleAddColumn = () => {
    setColumns([...columns, ""]); // Add an empty column
  };

  // Remove a column
  const handleRemoveColumn = (index) => {
    const newColumns = columns.filter((_, colIndex) => colIndex !== index);
    setColumns(newColumns);
  };
  const [boardName, setBoardName] = useState(""); // Store the board name
  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };
  const handleSubmit = () => {
    const newBoard = {
      id: board.length + 1, // Generate a new id
      name: boardName,
      columns: [...columns],
      task: [], // Empty task initially
    };

    setBoard([...board, newBoard]); // Update board state with new board

    // Clear form fields after submission
    setBoardName("");
    setColumns(["todo", "doing"]);
    closeModal();
  };

  return (
    //    <!-- Modal Overlay -->
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick} // Close modal logic here
    >
      {/* Modal */}
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
        onClick={handleModalClick} // Prevent closing when clicking inside modal
      >
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">Add New Board</h2>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Board Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Board Name
            </label>
            <input
              type="text"
              value={boardName}
              onChange={handleBoardNameChange}
              placeholder="e.g Web Development"
              className="mt-1 p-2 border rounded w-full focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Dynamic Column Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Board Columns
            </label>
            <div className="space-y-2">
              {columns.map((item, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleInputChange(index, e)} // Handle column edit
                    className="p-2 border rounded w-full focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveColumn(index)} // Handle column removal
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Column Button */}
          <button
            onClick={handleAddColumn}
            className="w-full py-2 mt-4 border border-purple-500 text-purple-500 rounded hover:bg-purple-100"
          >
            + Add New Column
          </button>
        </div>

        {/* Modal Footer Buttons */}
        <div className="mt-6">
          <button
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={handleSubmit} // Submit form
          >
            Create New Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewBoardModel;