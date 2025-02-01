import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CampaignCard = ({ campaign }) => {
  return (
    <Card className="w-full max-w-md shadow-lg p-5 rounded-2xl border border-gray-200 ">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 border-b-2 p-2">
          {campaign.compaignName}
        </CardTitle>
        <Badge
          className={`text-sm px-3 py-1 rounded-full mt-2 ${
            campaign.compaignStatus === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {campaign.compaignStatus}
        </Badge>
      </CardHeader>
      <CardContent className="text-gray-700 space-y-2">
        <div className="flex space-x-2 flex-wrap">
          <p className="font-medium">Members:</p>
          {campaign?.members?.map((member) => (
            <p key={member?.memberId}>{member?.memberName},</p>
          ))}
        </div>

        <p>
          <span className="font-medium">Last Actioner:</span>{" "}
          {campaign.compaignCreatorName} ({campaign.compaignCreatorRole})
        </p>

        <p>
          <span className="font-medium">Start Date:</span>{" "}
          {new Date(campaign.compaignStartDate).toDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
