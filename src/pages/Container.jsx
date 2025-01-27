import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Copyright } from "lucide-react";

const Container = () => {
  return (
    <div className="min-h-screen relative w-full">
      <Navbar />

      <Outlet />

      <footer className="flex mt-10 h-10 w-full items-center justify-center bg-blue-50 gap-2 absolute bottom-0">
        {" "}
        <Copyright /> 2025 Technfest IT Solution. All rights reserved.{" "}
      </footer>
    </div>
  );
};

export default Container;
