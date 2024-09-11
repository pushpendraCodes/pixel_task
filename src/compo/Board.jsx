import React, { useContext, useState } from "react";
import { Context } from "../context/DataContext";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal ";
import EditTaskModal from "./EditTaskModal";
import EditBoardModal from "./EditBoardModal";
import AddTaskModal from "./AddTaskModal";
import ClearBoard from "./ClearBoard";

const Board = () => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  const {
    board,
    activeTask,
    TaskModal,
    setTaskModal,
    setactiveTask,
    activeBoard,
    isDeleteModalOpen,
    setIsModalOpen,
    isEditModal,
    setEditModal,
    isEditBoard,
    setisEditBoard,
    sideBarOpen,
    isaddTaskModal,
    setisaddTaskModal,
    clearBoardModalOpen,
    setIsclearBoardModalOpen,
  } = useContext(Context);

  const currentBoard = board.find((boardItem) => boardItem.id === activeBoard);
  console.log(board, "boars");
  console.log(activeTask, "activeTask");
  console.log(activeBoard, "currentBoard");
  // let task;
  // if (activeTask.coloumn !== -1 && currentBoard) {
  //   task = currentBoard.task.find(
  //     (t, index) => index === activeTask.task && t.status === activeTask.coloumn
  //   );
  // }

  const [selectedTask, setSelectedTask] = useState("");

  // This condition should be outside to prevent further execution
  // if (!currentBoard || !task) {
  //   console.log("Board or task is undefined.");
  //   return null;
  // }

  console.log(clearBoardModalOpen, "clearBoardModalOpen");

  return (
    <div className="h-full px-5">
      {TaskModal && <Modal />}
      {isaddTaskModal && <AddTaskModal />}
      {isEditBoard && <EditBoardModal />}
      {isEditModal && <EditTaskModal />}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setTaskModal(false);
          }}
          // onDelete={handleDelete}
          // taskName={selectedTask}
        />
      )}


      {/* Horizontal scrolling inside the board container */}
      <div className={`w-full h-full ${sideBarOpen && "overflow-x-scroll"}`}>
        <div className="flex space-x-4 p-4">
          {/* Mapping through columns */}
          {board &&
            currentBoard?.columns.map((column, i) => (
              <div
                key={i}
                className="flex flex-col rounded-lg min-w-[20rem] p-4">
                {/* Column Header */}
                <h3 className="flex gap-2 place-items-center font-semibold mb-4">
                  <div
                    className={`${
                      colors[i % colors.length]
                    } w-4 h-4 rounded-full`}></div>
                  {column}
                  {currentBoard.task
                    .filter((task) => task.status === i)
                    .map((task, index) => (
                      <p>({task.subtasks.length||0})</p>
                    ))}
                </h3>

                {/* Tasks */}
                <div className="space-y-2">
                  {currentBoard.task
                    .filter((task) => task.status === i)
                    .map((task, taskIndex) => (
                      <div
                        onClick={() => {
                          setactiveTask({ coloumn: i, task: taskIndex });
                          setSelectedTask(task.title); // Update selected task
                          setTaskModal(true);
                        }}
                        key={taskIndex}
                        className="bg-white cursor-pointer px-3 py-7 rounded-lg shadow-lg">
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-gray-500">
                          {
                            task.subtasks.filter((subtask) => subtask.isChecked)
                              .length
                          }{" "}
                          of {task.subtasks.length} subtasks
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}

          {/* Add New Column */}
          <div
            onClick={() => setisEditBoard(true)}
            className="flex flex-col items-center  mx-5 justify-center bg-[#E4EBFA] text-gray-500 rounded-lg shadow-md min-w-[15rem] h-[25rem] p-4 cursor-pointer hover:bg-gray-300">
            <span>+ New Column</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
