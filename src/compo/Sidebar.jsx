import React, { useContext } from "react";
import { Context } from "../context/DataContext";
import { RiFileList2Fill } from "react-icons/ri";
import { FaRegEyeSlash, FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
const Sidebar = () => {
  const {
    activeBoard,
    setactiveBoard,
    setBoardOpen,
    board,
    setSideBarOpen,
    darkMode, setdarkMode
  } = useContext(Context);

  console.log(darkMode,"darkMode")
  // 3E3F4E
  return (
    <div className={` ${darkMode ?"bg-[#3E3F4E]":"bg-white"}  shadow-md h-screen flex flex-col`}>
      {/* Kanban Logo */}
      <div className="py-6 px-6 flex items-center">
        {/* Kanban SVG */}
        <div className="flex space-x-1 items-center">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <rect width="6" height="20" rx="2" fill="#635FC7" />
              <rect width="6" height="14" x="9" rx="2" fill="#A8A4FF" />
              <rect width="6" height="8" x="18" rx="2" fill="#E4EBFA" />
            </g>
          </svg>
        </div>
        <h1 className="ml-3 text-3xl font-bold text-gray-900">kanban</h1>
      </div>

      {/* Boards List */}
      <div className="flex-grow px-4">
        <p className="text-sm uppercase font-medium text-gray-500 mb-4">
          All Boards ({board.length})
        </p>
        <ul className="space-y-4">
          {board &&
            board.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setactiveBoard(item.id)}
                  className="cursor-pointer">
                  <div
                    className={`flex gap-2 items-center px-4 py-3 rounded-r-full whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200 ${
                      activeBoard === item.id
                        ? "bg-[#635FC7] text-white"
                        : "bg-transparent text-gray-700"
                    }`}>
                    {/* Board Icon SVG */}
                    <RiFileList2Fill  color={darkMode?"white":"black"} size={25} />
                    <span className={`${darkMode ?"text-white":"text-black"}  font-medium text-md`}>
                      {item.name}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>

        {/* Create New Board Button */}
        <div
          onClick={() => setBoardOpen(true)}
          className="mt-6 cursor-pointer flex items-center px-4 py-3 rounded-r-full bg-transparent hover:bg-gray-100 transition-colors duration-200 text-gray-700 whitespace-nowrap">
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 fill-purple-500"
          >
            <path d="M8 0a.75.75 0 0 1 .75.75v6.5h6.5a.75.75 0 0 1 0 1.5h-6.5v6.5a.75.75 0 0 1-1.5 0v-6.5h-6.5a.75.75 0 0 1 0-1.5h6.5v-6.5A.75.75 0 0 1 8 0z" />
          </svg>
          <span className="font-medium text-md text-purple-500">
             Create New Board
          </span>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="px-4 py-6">
        <div onClick={()=>setdarkMode(!darkMode)} className="flex items-center justify-between bg-[#A8A4FF] p-2 rounded-lg">
          {/* Light Icon */}
          <IoSunnyOutline size={25} />
          {
            darkMode ? <img className="w-10 h-10" src="switch-off.png" alt="" />:
            <img className="w-10 h-10" src="toggle-button.png" alt="" />
          }


          {/* Dark Icon */}
          <FaRegMoon  size={25}/>
        </div>
{/* <a href="https://www.flaticon.com/free-icons/toggle-button" title="toggle button icons">Toggle button icons created by FR_Media - Flaticon</a> */}
        {/* Hide Sidebar Button */}
        <button
          onClick={() => setSideBarOpen(false)}
          className="mt-6 flex items-center  gap-2 text-gray-400 hover:text-gray-500 transition-colors duration-200">
          {/* Hide Icon SVG */}
          {/* <FaEyeSlash /> */}
          <FaRegEyeSlash  color={darkMode?"white":"black"} size={25} />


          <span className="text-lg">Hide Sidebar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
