import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const Logout = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("auth/logout", {});
      return response;
    },
    onSuccess: (data) => {
      dispatch(removeUser());
      queryClient.invalidateQueries(["authUser"]);
      navigate("/login", { replace: true });
      console.log("Logout success", data);
    },
    onError: (error) => {
      console.log("Logout error", error);
    },
  });

  return (
    <nav className="flex justify-between m-1.5 items-center mx-5 ">
      <div>Call App</div>
      <div>
        {user?.role == "user" && (
          <div className="flex items-center gap-5">
            <Link to="/">
              {" "}
              <p className="cursor-pointer">Home</p>{" "}
            </Link>
            <Link to="/devices">
              {" "}
              <p className="cursor-pointer">Devices</p>{" "}
            </Link>
            <Link to="/config">
              {" "}
              <p className="cursor-pointer">Config</p>{" "}
            </Link>
            <p className="cursor-pointer">Log</p>
          </div>
        )}
        {user?.role == "reseller" && (
          <div className="flex items-center gap-5">
            <Link to="/">
              {" "}
              <p className="cursor-pointer"> Home</p>{" "}
            </Link>

            <Link to="dashboard">
              <p className="cursor-pointer">Users</p>{" "}
            </Link>

            <Link to="/devices">
              {" "}
              <p className="cursor-pointer">Devices</p>{" "}
            </Link>
            <Link to="/config">
              {" "}
              <p className="cursor-pointer">Config</p>{" "}
            </Link>
            <p className="cursor-pointer">Log</p>
          </div>
        )}
        {user?.role == "super_admin" && (
          <div className="flex items-center gap-5">
            <Link to="/">
              {" "}
              <p className="cursor-pointer">Home</p>
            </Link>
            <Link to="dashboard">
              {" "}
              <p className="cursor-pointer">Users</p>
            </Link>
            <Link to="/devices">
              {" "}
              <p className="cursor-pointer">Devices</p>
            </Link>
            <Link to="/config">
              {" "}
              <p className="cursor-pointer">Config</p>
            </Link>
            <p className="cursor-pointer">Log</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <p>Profile</p>
        <Button onClick={() => Logout.mutate()}> Logout </Button>{" "}
      </div>
    </nav>
  );
};

export default Navbar;
