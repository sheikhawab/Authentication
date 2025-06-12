
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Features/authSlice";

const Landingpage = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };
    return (
        <>
          <h1 className="text-lg bg-cyan-400">ye rha landing page</h1>
    
    
           <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
    
        </>
      );
    };
    
    export default Landingpage;
