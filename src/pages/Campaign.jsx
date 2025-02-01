import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { X, XIcon } from "lucide-react";
import toast from "react-hot-toast";

function CampForm() {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    members: [],
    csvData: "", // Store CSV data as a string
  });

  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await axiosInstance.get("/campaign/members");
      return response.data.data;
    },
    onSuccess: (data) => {},
  });

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [currentSelectedMember, setCurrentSelectedMember] = useState({
    id: "0",
    name: "select member",
  });

  const addCampaignMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/campaign/create", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Campaign created successfully!");
      queryClient.invalidateQueries(["campaign"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error adding campaign");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop();
    const reader = new FileReader();

    if (fileExtension === "csv") {
      reader.onload = (event) => {
        const csvData = event.target.result; // Capture entire CSV content
        setFormData((prevData) => ({
          ...prevData,
          csvData: csvData, // Store the CSV data as a string
        }));

        // Parse CSV and skip the first row (header)
        Papa.parse(csvData, {
          complete: (results) => {
            const data = results.data;
            const jsonData = data.slice(1).map((row) => {
              // Create JSON from the row, assuming the CSV columns are in the order: userName, email, phoneNumber
              return {
                userName: row[0], // First column -> userName
                email: row[1], // Second column -> email
                phoneNumber: row[2], // Third column -> phoneNumber
              };
            });

            // Here you can update the formData or use the jsonData as needed
          },
        });
      };
      reader.readAsText(file);
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0]; // Get the first sheet name
        const worksheet = workbook.Sheets[firstSheetName]; // Get the first sheet
        const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to JSON

        // You can now manipulate the `jsonData` as needed
        const processedData = jsonData.map((row) => {
          return {
            userName: row[Object.keys(row)[0]], // Use the first column for userName
            email: row[Object.keys(row)[1]], // Use the second column for email
            phoneNumber: row[Object.keys(row)[2]], // Use the third column for phoneNumber
          };
        });

        // Here you can update the formData or use the processedData as needed
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file format. Please upload a CSV or Excel file.");
    }
  };

  const handleMembersChange = (e) => {
    const selectedOptionText = e.target.selectedOptions[0].textContent;
    const selectedId = e.target.value;

    if (selectedId !== "select member") {
      setSelectedMembers((prev) => {
        const updatedSelectedMembers = [...prev];
        if (
          !updatedSelectedMembers.some((member) => member.id === selectedId)
        ) {
          updatedSelectedMembers.push({
            id: selectedId,
            name: selectedOptionText,
          });
        }

        // Update formData.members with both id and name
        setFormData((prevData) => ({
          ...prevData,
          members: updatedSelectedMembers,
        }));
        return updatedSelectedMembers;
      });
    }

    setCurrentSelectedMember({ id: selectedId, name: selectedOptionText });
  };

  const handleRemoveMember = (id) => {
    setSelectedMembers((prev) => {
      const updatedSelectedMembers = prev.filter((member) => member.id !== id);
      // Update formData.members after removal
      setFormData((prevData) => ({
        ...prevData,
        members: updatedSelectedMembers,
      }));
      return updatedSelectedMembers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only send campaign name, start date, selected members, and CSV data
    const { name, startDate, members, csvData } = formData;
    addCampaignMutation.mutate({ name, startDate, members, csvData });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p- w-1/2 p-5 mx-auto bg-white rounded shadow-md  border-2  ">
      {/* <p>
        <XIcon
          size={30}
          className="absolute top-4 right-5 cursor-pointer text-red-500 font-semibold "
          // onClick={() => setShowCampaign(false)}
        />
      </p> */}
      <h1 className="text-xl font-bold mb-4">Create Camp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Phone Number (Upload CSV or Excel)
          </label>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border rounded"
          />
          <p className="mt-2 text-sm text-gray-500">
            Upload a CSV or Excel file.
          </p>
        </div>

        {/* Display selected members above the dropdown */}
        {selectedMembers.length > 0 && (
          <section className="flex flex-wrap gap-2 border-2 border-gray-600 p-2 mb-4">
            {selectedMembers.map((member, index) => (
              <p
                key={index}
                className="flex items-center px-3 py-1 bg-gray-200 rounded"
              >
                {member.name}{" "}
                <span
                  onClick={() => handleRemoveMember(member.id)}
                  className="cursor-pointer ml-2 text-red-500"
                >
                  <X />
                </span>
              </p>
            ))}
          </section>
        )}
        {/* Dropdown to select more members */}
        <div>
          <select
            value={currentSelectedMember.name}
            onChange={(e) => handleMembersChange(e)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="select member" disabled>
              select member
            </option>
            {members.map((member, index) => (
              <option key={index} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CampForm;
