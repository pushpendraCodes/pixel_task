import React, { useContext, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Context } from "../context/DataContext";
import AddTaskModal from "./AddTaskModal";
import ClearBoard from "./ClearBoard";
import DeleteBoardModal from "./DeleteBoardModal";
import ResetAllBoardModal from "./ResetAllBoardModal";

const Topbar = () => {
  const { setisaddTaskModal,darkMode,isEditBoard, resetAllModal, setresetAllModal,deleteBoardModalOpen, setIsdeleteBoardModalOpen,setisEditBoard, isaddTaskModal,setIsclearBoardModalOpen,clearBoardModalOpen } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false); // State for popup menu

  return (
    <div className={`flex-1 ${darkMode ?"bg-[#3E3F4E]":"bg-white"} px-5 py-4 border border-b-gray-600`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Example Board 2</h2>
        <div className="flex gap-3 items-center relative">
          <button
            onClick={() => {
              setisaddTaskModal(true);
            }}
            className="bg-[#635FC7] py-4 rounded-full text-white px-8">
            + Add New Task
          </button>
          <span>
            <CiMenuKebab
              size={30}
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)} // Toggle popup menu
            />
          </span>

          {/* Popup menu */}
          {menuOpen && (
            <div className="absolute top-14 right-0 w-40 bg-white shadow-lg border rounded-md py-2">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  setisEditBoard(true)
                  // Handle Edit Board logic here
                }}>
                Edit Board
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  setIsclearBoardModalOpen(true)
                  // Handle Clear Board logic here
                }}>
                Clear Board
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  // Handle Delete Board logic here
                  setIsdeleteBoardModalOpen(true)
                }}>
                Delete Board
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  // Handle Reset Boards logic here
                  setresetAllModal(true)
                }}>
                Reset Boards
              </button>
            </div>
          )}
        </div>
      </div>
      {clearBoardModalOpen && (
        <ClearBoard
          isOpen={clearBoardModalOpen}
          onClose={() => {
            setIsclearBoardModalOpen(false);
            // setTaskModal(false);
          }}
          // onDelete={handleDelete}
          // taskName={selectedTask}
        />
      )}
      {deleteBoardModalOpen && (
        <DeleteBoardModal
          isOpen={deleteBoardModalOpen}
          onClose={() => {
            setIsdeleteBoardModalOpen(false);
            // setTaskModal(false);
          }}
          // onDelete={handleDelete}
          // taskName={selectedTask}
        />
      )}
      {resetAllModal && (
        <ResetAllBoardModal
          isOpen={resetAllModal}
          onClose={() => {
            setresetAllModal(false);
            // setTaskModal(false);
          }}
          // onDelete={handleDelete}
          // taskName={selectedTask}
        />
      )}
    </div>
  );
};

export default Topbar;
