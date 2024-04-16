import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import User from "../../assets/user.png";

interface ProfileHoverProps {
  userId: string;
  username: string;
  bio: string;
  profile_picture: string;
  hasBadge: boolean;
  followers: string[];
}

const ProfileHover: React.FC<{ user: ProfileHoverProps }> = ({ user }) => {
  return (
    <div className="flex justify-between space-x-4">
      <Avatar className="flex-none">
        <AvatarImage src={user?.profile_picture || User} />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold">@{user?.username}</h4>
        <p className="text-sm">{user?.bio || "halo"}</p>
        <p className="text-sm text-gray-500">
          {user?.followers?.length}{" "}
          {user?.followers?.length > 1 ? "followers" : "follower"}
        </p>
        <Button className="w-full bg-black text-white transition hover:scale-105 hover:bg-black hover:text-white">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default ProfileHover;
