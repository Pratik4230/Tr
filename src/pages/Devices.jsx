import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { Eye, FileText, Power, PowerOff, Trash2 } from "lucide-react";
// import QRCode from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";

const Config = () => {
  const [showDeviceNamePopUp, setShowDeviceNamePopUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showWebHookPopUp, setShowWebHookPopUp] = useState(false);
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");
  const [qrVisible, setQrVisible] = useState(true);

  const handleGenerateQR = () => {
    if (url.trim() !== "") {
      setQrVisible(true);
    }
  };

  const addDeviceMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        "/admin-and-reseller/add-device",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Device added successfully", data);
      setUrl(data?.webhookUrl);
      queryClient.invalidateQueries(["devices"]);
      handleGenerateQR();
    },
    onError: (error) => {
      console.error("Error adding device", error);
    },
  });

  const handleAddDevice = () => {
    if (deviceName && selectedOption) {
      addDeviceMutation.mutate({
        deviceName,
        sendInterval: selectedOption,
      });
    }
  };

  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin-and-reseller/devices");
      // console.log("response", response);

      return response?.data?.data;
    },
    onSuccess: (data) => {
      // console.log("Devices fetched", data);
    },
  });

  const deleteDeviceMutation = useMutation({
    mutationFn: async (id) => {
      console.log("device id in mutation", id);

      const response = await axiosInstance.delete(`/user/delete-device/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Device deleted successfully", data);
      queryClient.invalidateQueries(["devices"]);
    },
    onError: (error) => {
      console.error("Error delete device", error);
    },
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (isLoading) {
    return <p>Devices loading...</p>;
  }

  // console.log("devices", devices);

  const handleDeleteCall = (id) => {
    // console.log("called");
    deleteDeviceMutation.mutate(id);
    // console.log("device id", id);
  };

  // console.log(devices);
  // console.log("device webhook url", url);

  return (
    <div>
      <p className="mb-4 font-semibold text-2xl flex justify-center ">
        Devices{" "}
      </p>

      {/* Add Device Button */}
      <section className="flex justify-center p-2 m-3">
        <Button
          onClick={() => setShowDeviceNamePopUp(!showDeviceNamePopUp)}
          className="bg-blue-500 text-white"
        >
          Add New Device
        </Button>
      </section>

      {/* Devices Table */}
      <section className="p-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Device Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">
                {" "}
                Today total Calls
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Overall total Calls
              </th>
              <th className="border border-gray-300 px-4 py-2">Webhook URL</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices?.map((device) => (
              <tr key={device._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {device._id}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                  {device.deviceName}
                  <Eye
                    onClick={() => {
                      setSelectedDevice(device);
                      setShowWebHookPopUp(true);
                    }}
                    className="cursor-pointer text-blue-500"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-center">
                    {device.status === "offline" ? <PowerOff /> : <Power />}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {device.today_total_calls}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {device.overall_total_calls}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {device.webhookUrl}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-around">
                  <p>
                    <Link to={`/calllogs/${device?.deviceName}`}>
                      {" "}
                      <FileText />{" "}
                    </Link>
                  </p>
                  <p className="flex justify-center text-red-500 cursor-pointer">
                    <Trash2 onClick={() => handleDeleteCall(device?._id)} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Device Popup */}
      {showDeviceNamePopUp && (
        <section className="fixed inset-0 flex  justify-center items-center  bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/2 max-h-[90%]">
            <p className="text-lg font-semibold mb-4">Enter Device Name</p>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Device Name"
              className="p-2 w-full border border-gray-300 rounded-md mb-4"
            />
            <div className="mt-4">
              <label
                htmlFor="daysDropdown"
                className="block text-sm font-medium text-gray-700"
              >
                Select Day Interval
              </label>
              <select
                id="daysDropdown"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="daily">1 Day</option>
                <option value="weekly">7 Days</option>
                <option value="monthly">30 Days</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={
                  () => setShowDeviceNamePopUp(false)
                  // () => setQrVisible(false)
                }
                className="bg-red-500 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddDevice}
                className="bg-blue-500 text-white"
              >
                Submit
              </Button>
            </div>

            {/* Only QR CODE DONT TOUCH THIS */}
            <div className="text-center p-5 ">
              {/*               
              <section className="flex justify-center gap-1">
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={window.location.origin + url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="p-2 w-72 mb-2 text-base border border-gray-300 rounded-md"
                />
                <br />
               
                <button
                  onClick={handleGenerateQR}
                  className="px-3   text-base text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Generate QR Code
                </button>
              </section> 
 */}

              <br />
              {qrVisible && url && (
                <div className="mt-5 flex justify-center">
                  <QRCodeSVG value={window.location.origin + url} size={150} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Webhook Popup */}
      {showWebHookPopUp && selectedDevice && (
        <section className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/2  border-4 border-yellow-400 ">
            <p className="text-lg font-semibold mb-4">Device Details</p>

            <section className="flex items-center gap-1 relative">
              <strong>URL:</strong>
              <p className="border-1 text-blue-400 py-3 px-1">
                {window.location.origin}
                {selectedDevice.webhookUrl}
              </p>

              <div className="flex border-3 border-red-800 absolute top-0 right-0">
                <Button
                  onClick={() => setShowWebHookPopUp(false)}
                  className="bg-red-500 text-white"
                >
                  Close
                </Button>
              </div>
            </section>

            <Button
              onClick={() =>
                handleCopy(
                  `${window.location.origin}${selectedDevice.webhookUrl}`
                )
              }
              className="bg-blue-500 text-white mb-4"
            >
              Copy URL
            </Button>

            {
              <div className="text-center p-5 ">
                <section className="flex justify-center   gap-1"></section>
                {/* <br /> */}
                {qrVisible && selectedDevice.webhookUrl && (
                  <div className="mt-5 flex justify-center">
                    <QRCodeSVG
                      value={window.location.origin + selectedDevice.webhookUrl}
                      size={150}
                    />
                  </div>
                )}
              </div>
            }
          </div>
        </section>
      )}
    </div>
  );
};

export default Config;
