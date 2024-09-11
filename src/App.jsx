import React, { useContext } from "react";

import { FaRegEye } from "react-icons/fa";

import Dashboard from "./compo/Dashboard";
import { Context } from "./context/DataContext";
import NewBoardModel from "./compo/newBoardModel";
// import { Context } from './context/dataContext';

function App() {
  // const data = useContext(Context)
  // console.log(data,"dta")/
  const { sideBarOpen, setSideBarOpen } = useContext(Context);
  const { newBoardModalOpen, setBoardOpen } = useContext(Context);
  return (
    // <Router>
    <>
      {!sideBarOpen && (
        <div
          onClick={() => setSideBarOpen(true)}
          className="cursor-pointer bg-[#635FC7] px-3 py-2 absolute top-[80%] left=[0%] rounded-r-full">
          <FaRegEye
            color="white"
            size={25}
          />
        </div>
      )}

      {newBoardModalOpen && <NewBoardModel />}
      <Dashboard />
    </>
    // </Router>
  );
}

export default App;
