import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Copyright } from "lucide-react";

const Container = () => {
  return (
    <div className="min-h-screen  w-full border-2  border-blue-600 ">
      <Navbar />

      <Outlet className="border-3 border-green-600" />

      <footer className="flex  h-10 w-full items-center justify-center bg-blue-50 gap-2   ">
        {" "}
        <Copyright /> 2025 Technfest IT Solution. All rights reserved.{" "}
      </footer>
    </div>
  );
};

export default Container;
