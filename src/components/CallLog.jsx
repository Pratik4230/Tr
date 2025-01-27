import React, { useState } from "react";

const CallLog = ({ call }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Calculate total pages and data for the current page
  const totalPages = Math.ceil(call.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = callLogs.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  // Pagination handler
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
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
          {currentRecords.map((call, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {call.callDate}
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

      {/* Pagination Controls */}
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

export default CallLog;

{
  /* <table className="table-auto border-collapse border border-gray-300 w-full bg-white rounded shadow-lg">
<thead className="bg-blue-100">
  <tr>
    <th className="border border-gray-300 px-4 py-2 text-blue-700">
      User ID
    </th>
    <th className="border border-gray-300 px-4 py-2 text-blue-700">
      Name
    </th>
    <th className="border border-gray-300 px-4 py-2 text-blue-700">
      Email
    </th>
    <th className="border border-gray-300 px-4 py-2 text-blue-700">
      Role
    </th>
    <th className="border border-gray-300 px-4 py-2 text-blue-700">
      Actions
    </th>
  </tr>
</thead>
<tbody>
  {currentUsers?.map((user) => (
    <UserRow
      key={user.id}
      user={user}
      onUpdateUser={handleUpdateUser}
    />
  ))}
</tbody>
</table> */
}

// const formatDateAndTime = (isoString) => {
//   const date = new Date(isoString);

//   // Extract date and time parts
//   const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
//   const optionsTime = {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   };

//   const formattedDate = new Intl.DateTimeFormat("en-GB", optionsDate).format(
//     date
//   );
//   const formattedTime = new Intl.DateTimeFormat("en-GB", optionsTime).format(
//     date
//   );

//   return `${formattedDate}, ${formattedTime}`;
// };

// Example usage
