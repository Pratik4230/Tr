import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./utils/axiosInstance";
import { addUser, removeUser } from "./store/userSlice";
import toast, { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import ConfirmOtp from "./pages/ConfirmOtp";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import CallLogs from "./pages/CallLogs";
import Container from "./pages/Container";
import Devices from "./pages/Devices";
import Config from "./pages/Config";
import Campaign from "./pages/Campaign";
import Logs from "./pages/Logs";
import Profile from "./pages/Profile";
import ShowCampaign from "./pages/ShowCampaign";
import Graphs from "./pages/Graphs";

import Shimmer from "./pages/Shimmer";

function App() {
  const dispatch = useDispatch();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/protected-route");
        return response.data;
      } catch (error) {
        console.log("Auth user error", error);
        toast.error(
          error.response.data.message || "Unathenticated! Please Login again"
        );
        if (error.response && error.response.status === 401) {
          return null;
        }
      }
    },
  });

  useEffect(() => {
    if (authUser && authUser.user) {
      dispatch(addUser(authUser.user)); // Dispatch the user to Redux
    } else {
      dispatch(removeUser()); // Remove user if not authenticated
    }
  }, [authUser, dispatch]);

  if (isLoading) {
    return (
      <div className="p-6 min-h-[100vh] ">
        <Shimmer />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Container />}>
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/devices"
              element={authUser ? <Devices /> : <Navigate to="/login" />}
            />
            <Route
              path="/config"
              element={authUser ? <Config /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/forget-password"
              element={!authUser ? <ForgetPassword /> : <Navigate to="/" />}
            />
            <Route
              path="/confirmotp"
              element={!authUser ? <ConfirmOtp /> : <Navigate to="/" />}
            />

            <Route
              path="/test"
              element={authUser ? <Test /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={authUser ? <Dashboard /> : <Navigate to="/" />}
            />

            {/* <Route path="/dashboard" element={<Dashboard />} /> */}

            <Route
              path="/calllogs/:device_name"
              element={authUser ? <CallLogs /> : <Navigate to="/" />}
            />

            <Route
              path="/Campaign"
              element={authUser ? <Campaign /> : <Navigate to="/" />}
            />
            <Route
              path="/logs"
              element={authUser ? <Logs /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/mycampaigns"
              element={authUser ? <ShowCampaign /> : <Navigate to="/" />}
            />

            <Route path="/graphs" element={<Graphs />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
