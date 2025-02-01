import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import Shimmer from "./Shimmer";
import toast from "react-hot-toast";

const Logs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 when searching
    }, 800);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["callLogs", page, debouncedSearch, limit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/user/call-logs?page=${page}&limit=${limit}&search=${debouncedSearch}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Call logs fetched successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error fetching call logs");
    },
    keepPreviousData: true,
    staleTime: 10000,
  });

  const convertToHMSS = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-[100vh] ">
        <Shimmer />
      </div>
    );
  }

  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case "incoming":
        return "bg-green-100 text-green-600";
      case "outgoing":
        return "bg-blue-100 text-blue-600";
      case "missed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📞 Call Logs</h2>

      {/* Search and Rows per Page */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            className="px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            value={limit}
            onChange={(e) => {
              setPage(1); // Reset to page 1 when changing rows per page
              setLimit(e.target.value);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by number, type, or device name..."
          className="p-2 w-3/12 mb-4 border-2 border-blue-300 rounded-md focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Number</th>
              <th className="px-4 py-2 text-left">Call Date</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Device Name</th>
              <th className="px-4 py-2 text-left">SIM Slot</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Last SMS</th>
            </tr>
          </thead>
          <tbody>
            {data?.callLogs?.map((log) => (
              <tr key={log?._id} className="border-b odd:bg-gray-50">
                <td className="px-4 py-3">{log?.number}</td>
                <td className="px-4 py-3">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(log?.callDate))}
                </td>
                <td className="px-4 py-3">{convertToHMSS(log?.duration)}</td>
                <td className="px-4 py-3">{log?.deviceName}</td>
                <td className="px-4 py-3">{log?.simSlot}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getBadgeColor(
                      log?.type
                    )}`}
                  >
                    {log?.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {log.lastSmsSentAt &&
                    new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(log?.lastSmsSentAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-5">
        <button
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            page === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ⬅️ Previous
        </button>
        <span className="text-gray-700">
          Page {data?.currentPage} of {data?.totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            page >= data?.totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= data?.totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Logs;
