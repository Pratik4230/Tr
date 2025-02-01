import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import CampaignCard from "../components/CampaignCard";
import { Button } from "../components/ui/button";
import CampForm from "../components/CampForm";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ShowCampaign = () => {
  const [showCampaign, setShowCampaign] = useState(false);
  const user = useSelector((state) => state?.user?.user);

  let api;
  if (user?.role == "user") {
    api = "campaign/campaigns";
  } else if (user?.role == "super_admin") {
    api = "campaign/super-admin-campaigns";
  }

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const response = await axiosInstance.get(api);
      return response.data.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Campaign fetched successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error fetching campaign");
    },
  });

  if (isLoading) {
    return <div>Loading.......</div>;
  }

  return (
    <div>
      <p>ShowCampaign</p>

      <div className="flex justify-end px-2">
        <button
          onClick={() => setShowCampaign(!showCampaign)}
          className={`${
            showCampaign ? "bg-red-400" : "bg-green-600"
          }  p-2 text-white rounded-md `}
        >
          {showCampaign ? <X /> : "Create Campaign"}
        </button>
      </div>

      {showCampaign && (
        <section>
          <CampForm />
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {campaign?.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </section>
    </div>
  );
};

export default ShowCampaign;
