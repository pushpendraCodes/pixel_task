import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Board from "./Board";
import { Context } from "../context/DataContext";

const Dashboard = () => {
  const { sideBarOpen ,darkMode} = useContext(Context);

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      {sideBarOpen && (
        <div className="w-[280px] bg-gray-50 shadow-lg h-full">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-white">
        <Topbar />
        <div className={`h-full ${darkMode ?"bg-[#2B2C37]":"bg-[#E4EBFA]"} p-8 overflow-hidden`}>
          {/* Add a wrapper to the Board to limit its width and allow internal scrolling */}
          <div className="h-full max-w-[1000px]  ">
            <Board />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
