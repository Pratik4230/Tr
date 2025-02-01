import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import {
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  PhoneOff,
  PhoneOutgoing,
} from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const [filter, setFilter] = useState("30days");

  // Calculate start_date and end_date based on the filter
  const { startDate, endDate } = useMemo(() => {
    const today = new Date();
    let startDate = new Date();
    if (filter === "7days") {
      startDate.setDate(today.getDate() - 7);
    } else if (filter === "15days") {
      startDate.setDate(today.getDate() - 15);
    } else if (filter === "30days") {
      startDate.setDate(today.getDate() - 30);
    } else if (filter === "today") {
      startDate = today; // Start and end date will be today
    }
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
  }, [filter]);

  // Fetch analytics data
  const { data: callAnalytics, isLoading } = useQuery({
    queryKey: ["callAnalytics", filter, startDate, endDate],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `user/analytics-calls?filter=${filter}&start_date=${startDate}&end_date=${endDate}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Call analytics fetched successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error fetching call analytics"
      );
    },
  });

  if (isLoading) {
    return <p>Loading call analytics...</p>;
  }

  const totalCall = {
    title: "Total Calls",
    count: callAnalytics?.total_calls || 0,
  };

  const otherData = [
    {
      title: "Answered Outgoing",
      count: callAnalytics?.answered_outgoing || 0,
    },
    {
      title: "Incoming Calls",
      count: callAnalytics?.incoming_calls || 0,
    },
    {
      title: "Missed Calls",
      count: callAnalytics?.missed_calls || 0,
    },
    {
      title: "Outgoing Calls",
      count: callAnalytics?.outgoing_calls || 0,
    },
    {
      title: "Unanswered Outgoing",
      count: callAnalytics?.unanswered_outgoing || 0,
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <section className="mb-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold"></h1>
          <div>
            <label className="mr-2 font-medium">Filter:</label>
            <select
              className="border border-blue-300 bg-white text-blue-700 p-2 rounded shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="7days">7 Days</option>
              <option value="15days">15 Days</option>
              <option value="30days">30 Days</option>
            </select>
          </div>
        </div>
      </section>

      {/* Total Calls Row */}
      <section className="mb-6 grid grid-cols-1 md:grid-cols-1 gap-4 w-4/12">
        <div
          key="total"
          className="bg-white h-52 border-2 border-blue-400 shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center relative"
        >
          <Phone className="text-blue-500 absolute top-5 left-14 size-10 " />
          <div className="text-4xl font-extrabold text-blue-500">
            {totalCall.count}
          </div>
          <div className="text-xl font-semibold mt-2">{totalCall.title}</div>
          <div className="text-sm text-gray-600 mt-2">
            <p className="font-medium">
              {" "}
              Start Date: <span className="font-normal"> {startDate}</span>
            </p>
            <p className="font-medium">
              {" "}
              End Date: <span className="font-normal">{endDate}</span>{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Other Data Row */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {otherData.map((item, index) => (
          <div
            key={index}
            className="bg-white  h-52 border-2 border-blue-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center relative"
          >
            {item.title === "Answered Outgoing" && (
              <PhoneCall className="text-green-500 absolute top-5 left-14 size-10 " />
            )}
            {item.title === "Incoming Calls" && (
              <PhoneIncoming className="text-yellow-500 absolute top-5 left-14 size-10 " />
            )}
            {item.title === "Missed Calls" && (
              <PhoneMissed className="text-red-500 absolute top-5 left-14 size-10 " />
            )}
            {item.title === "Outgoing Calls" && (
              <PhoneOutgoing className="text-gray-600 absolute top-5 left-14 size-10 " />
            )}
            {item.title === "Unanswered Outgoing" && (
              <PhoneOff className="text-black absolute top-5 left-14 size-10 " />
            )}
            <div className="text-4xl font-bold text-blue-500">{item.count}</div>
            <div className="text-xl font-semibold mt-2">{item.title}</div>
            <div className="text-sm text-gray-600 mt-2">
              <p className="font-medium">
                {" "}
                Start Date: <span className="font-normal">
                  {startDate}
                </span>{" "}
              </p>
              <p className="font-medium">
                {" "}
                End Date: <span className="font-normal">{endDate}</span>{" "}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
