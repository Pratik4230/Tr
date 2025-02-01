import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { removeUser } from "../store/userSlice";
import toast from "react-hot-toast";

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
      toast.success(data?.data?.message || "Logout successful");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error logging out");
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
            <Link to="/logs">
              {" "}
              <p className="cursor-pointer">Log</p>{" "}
            </Link>
            <Link to="/mycampaigns">
              {" "}
              <p className="cursor-pointer">My Campaigns</p>{" "}
            </Link>
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
            <Link to="/logs">
              {" "}
              <p className="cursor-pointer">Log</p>{" "}
            </Link>
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
            <Link to="/logs">
              {" "}
              <p className="cursor-pointer">Log</p>{" "}
            </Link>

            <Link to="/mycampaigns">
              {" "}
              <p className="cursor-pointer"> My Campaigns </p>{" "}
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link to="/profile">
          {" "}
          <p className="cursor-pointer p-2 bg-blue-400 rounded-xl text-white font-semibold ">
            Profile{" "}
          </p>{" "}
        </Link>
        <Button onClick={() => Logout.mutate()}> Logout </Button>{" "}
      </div>
    </nav>
  );
};

export default Navbar;
