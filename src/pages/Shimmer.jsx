import React from "react";

const Shimmer = () => {
  return (
    <div className="space-y-4">
      {/* Table header shimmer */}
      <div className="flex space-x-4 animate-pulse">
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* Table body shimmer */}
      {Array(5)
        .fill("")
        .map((_, index) => (
          <div key={index} className="flex space-x-4 animate-pulse">
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
