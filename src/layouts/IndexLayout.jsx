// import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const IndexLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-24 max-w-screen-2xl mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default IndexLayout;
