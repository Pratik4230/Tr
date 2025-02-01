import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

const CallLogs = () => {
  const params = useParams();
  const { deviceName } = params;

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: callLogs, isLoading } = useQuery({
    queryKey: ["callLogs", deviceName],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `user/device-call-logs/${deviceName}`
        );
        return response.data;
      } catch (error) {
        console.log("Call logs error", error);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Call logs fetched successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error fetching call logs");
    },
  });

  if (isLoading) {
    return <p>Loading call logs...</p>;
  }

  // Filter call logs based on search query
  const filteredLogs = callLogs?.call_logs?.filter((call) => {
    const formattedDate = new Date(call.callDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return (
      formattedDate.toLocaleLowerCase().includes(searchQuery) ||
      call.duration.toString().includes(searchQuery) ||
      call.number.toLowerCase().includes(searchQuery) ||
      call.simSlot.toString().toLowerCase().includes(searchQuery) ||
      call.type.toLowerCase().includes(searchQuery)
    );
  });

  // Pagination logic
  const totalRecords = filteredLogs?.length || 0;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredLogs?.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Call Logs</h1>

      {/* Search and Records Per Page */}
      <section className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="border border-blue-300 bg-white text-blue-700 p-2 rounded shadow-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-600">records per page</span>
        </div>
        <input
          type="text"
          placeholder="Search by Call Date, Duration, Number, SIM Slot, Type..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value.toLowerCase());
            setRecordsPerPage(10);
          }}
          className="border border-blue-300 bg-white p-2 rounded w-[30%] shadow-sm"
        />
      </section>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Call Date
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Duration (s)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Number
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              SIM Slot
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords?.map((call) => (
            <tr key={call._id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {formatDateTime(call.callDate)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {call.duration}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {call.number}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {call.simSlot}
              </td>
              <td className="border border-gray-300 px-4 py-2">{call.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CallLogs;
