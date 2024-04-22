import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import User from "../../assets/user.png";

interface ProfileHoverProps {
  _id: string;
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
        <h4 className="text-base font-semibold">@{user?.username}</h4>
        <p className="pb-2 text-sm font-light">{user?.bio || "halo"}</p>
        <p className="text-xs text-gray-500">
          {user?.followers?.length}{" "}
          {user?.followers?.length > 1 ? "followers" : "follower"}
        </p>
        <Button className="w-full bg-white text-black transition hover:scale-105 hover:bg-white hover:text-black">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default ProfileHover;
