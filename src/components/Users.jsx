import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { KeyRound, Pencil, X } from "lucide-react";
import { axiosInstance } from "../utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Shimmer from "../pages/Shimmer";
import toast from "react-hot-toast";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin-and-reseller/users");
      return response.data.data;
    },
    onSuccess: (data) => {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    selectedUserName: "",
    selectedUserId: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const user = useSelector((state) => state?.user?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    const { value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      selectedUserName: users.find((user) => user._id === value)?.name || "",
      selectedUserId: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addUserMutation.mutate({ ...formData, ...selectedUser });
  };

  const queryClient = useQueryClient();

  // const { name, email, password, role } = req.body;
  const addUserMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        "/admin-and-reseller/add-user",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
      toast.success(data?.data?.message || "User added successfully");
      setShowAddUser(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error adding user");
    },
  });

  if (isLoading)
    return (
      <div className="p-6 min-h-[100vh] ">
        <Shimmer />
      </div>
    );

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = filteredUsers
    ? Math.ceil(filteredUsers.length / entriesPerPage)
    : 1;

  const currentUsers = filteredUsers?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axiosInstance.put(
        `admin-and-reseller/update-user/${updatedUser._id}`,
        updatedUser
      );
      refetch(); // Re-fetch updated data
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <p className="text-2xl font-bold text-blue-700 mb-4">Users</p>

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowAddUser(!showAddUser)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add User
        </Button>
      </div>
      {/* Add user PopUp */}
      {showAddUser && (
        <section className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-lg max-h-[90%] overflow-auto relative  left-auto">
            <form onSubmit={handleSubmit} className="space-y-6  ">
              <h2 className="text-xl font-bold text-center text-gray-800">
                User Form
              </h2>

              <X
                className="absolute top-0 right-3 cursor-pointer text-red-600 font-medium "
                size={30}
                onClick={() => setShowAddUser(false)}
              />

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Select a role
                  </option>

                  <>
                    {user?.role == "super_admin" ||
                      (user.role == "reseller" && (
                        <option value="reseller">Reseller</option>
                      ))}
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    <option value="member">member</option>
                  </>
                </select>

                {(["manager", "member"].includes(formData.role) &&
                  user.role == "reseller") ||
                  (user.role == "super_admin" && (
                    <select
                      id="user"
                      name="user"
                      value={selectedUser?.selectedUserId || ""}
                      onChange={handleUserChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    >
                      <option value="" disabled>
                        Select a user
                      </option>
                      {user?.role === "super_admin" ||
                        user?.role === "reseller" ||
                        (user.role == "user" &&
                          users.map(
                            (user) =>
                              user.role == "user" && (
                                <option key={user._id} value={user._id}>
                                  {user.name}
                                </option>
                              )
                          ))}
                    </select>
                  ))}
              </div>

              <button
                type="submit"
                className="w-full bg-500 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Records Per Page and Search */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border border-blue-300 bg-white text-blue-700 p-2 rounded shadow-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-gray-600">Entries per Page</span>
        </div>

        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-blue-300 bg-white p-2 rounded w-[30%] shadow-sm"
        />
      </div>

      {/* User Table */}
      <table className="table-auto border-collapse border border-gray-300 w-full bg-white rounded shadow-lg">
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
              key={user._id}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          Previous
        </button>
        <span className="font-semibold text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const UserRow = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedRole, setEditedRole] = useState(user.role);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUser = { ...user, name: editedName, role: editedRole };
      await onUpdateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePasswordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(
        `/admin-and-reseller/change-password/${user._id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      setIsPasswordModalOpen(false);
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error updating password");
    },
  });

  const handleUpdatePassword = async (newPassword) => {
    if (newPassword) {
      updatePasswordMutation.mutate({ newPassword });
    }
  };

  return (
    <>
      <tr>
        <td className="border border-gray-300 px-4 py-2 text-center">
          {user._id}
        </td>
        <td className="border border-gray-300 px-4 py-2 text-center">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border-2 border-blue-600 p-2 rounded-lg w-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm animate-pulse"
            />
          ) : (
            user.name
          )}
        </td>
        <td className="border border-gray-300 px-4 py-2 text-center">
          {user.email}
        </td>
        <td className="border border-gray-300 px-4 py-2 text-center">
          {isEditing ? (
            <input
              type="text"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="border-2 border-blue-600 p-2 rounded-lg w-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm animate-pulse"
            />
          ) : (
            user.role
          )}
        </td>
        <td className="border border-gray-300 px-4 py-2 text-center flex justify-evenly space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          ) : (
            <Pencil
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="text-yellow-500"
          >
            <KeyRound />
          </button>
        </td>
      </tr>

      {isPasswordModalOpen && (
        <PasswordModal
          onClose={() => setIsPasswordModalOpen(false)}
          onUpdatePassword={handleUpdatePassword}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

const PasswordModal = ({ onClose, onUpdatePassword, isLoading }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePassword(newPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-[400px]">
        <X
          className="absolute top-3 right-3 cursor-pointer text-red-500"
          onClick={onClose}
        />
        <h2 className="text-xl font-bold mb-4">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Users;
