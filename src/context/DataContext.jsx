import { createContext, useState } from "react";

export const Context = createContext(null);

const DataContext = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [darkMode, setdarkMode] = useState(false);
  const [newBoardModalOpen, setBoardOpen] = useState(false);
  const [board, setBoard] = useState([
    {
      id: 1,
      name: "example Board 1",
      columns: ["todo", "in Progress", "done"],
      task: [
        {
          title: "coding",
          Description: "edbeu duehufe",
          subtasks: [{ task: "jbjfr", isChecked: true }],
          status: 0,
        },
        {
          title: "codingnihhi",
          Description: "edbeu duehufe",
          subtasks: [{ task: "jbjfr", isChecked: true }],
          status: 1,
        },
      ],
    },
    {
      id: 2,
      name: "example Board 2",
      columns: ["todo", "in Progress", "done"],
      task: [
        {
          title: "coding",
          Description: "edbeu duehufe",
          subtasks: [{ task: "jbjfr", isChecked: true }],
          status: 0,
        },
      ],
    },
    {
      id: 3,
      name: "example Board 3",
      columns: ["todo", "in Progress"],
      task: [
        {
          title: "coding",
          Description: "edbeu duehufe",
          subtasks: [{ task: "jbjfr", isChecked: false }],
          status: 1,
        },
        {
          title: "coding",
          Description: "edbeu duehufe",
          subtasks: [{ task: "jbjfr", isChecked: false }],
          status: 0,
        },
      ],
    },
  ]);
  const [activeBoard, setactiveBoard] = useState(board.length ? board[0].id : null);
  const [activeTask, setactiveTask] = useState({coloumn:-1,task:-1});
  const [TaskModal, setTaskModal] = useState(false);
  const [isDeleteModalOpen, setIsModalOpen] = useState(false);
  const [clearBoardModalOpen, setIsclearBoardModalOpen] = useState(false);
  const [deleteBoardModalOpen, setIsdeleteBoardModalOpen] = useState(false);
  const [resetAllModal, setresetAllModal] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [isEditBoard, setisEditBoard] = useState(false);
  const [isaddTaskModal, setisaddTaskModal] = useState(false);

  return (
    <Context.Provider
      value={{
        deleteBoardModalOpen, setIsdeleteBoardModalOpen,
        clearBoardModalOpen, setIsclearBoardModalOpen,
        isaddTaskModal, setisaddTaskModal,
        isDeleteModalOpen, setIsModalOpen,
        TaskModal, setTaskModal,
        activeTask, setactiveTask,
        activeBoard,
        setactiveBoard,
        board,
        setBoard,
        newBoardModalOpen,
        setBoardOpen,
        sideBarOpen,
        darkMode,
        setdarkMode,
        setSideBarOpen,
        isEditModal, setEditModal,isEditBoard, setisEditBoard,resetAllModal, setresetAllModal
      }}>
      {children}
    </Context.Provider>
  );
};

export default DataContext;
