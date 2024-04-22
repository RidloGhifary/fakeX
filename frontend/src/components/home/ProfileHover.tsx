import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import User from "../../assets/user.png";
import { BadgeCheck } from "lucide-react";
import { UseAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { UseFollowUser } from "@/api/UserApi";

interface ProfileHoverProps {
  _id: string;
  username: string;
  bio: string;
  profile_picture: string;
  hasBadge: boolean;
  followers: string[];
}

const ProfileHover: React.FC<{ user: ProfileHoverProps }> = ({ user }) => {
  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: UseFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Follow: failed!",
        description: "An error occurred during follow.",
      });
    },
  });

  const handleFollow = async () => {
    try {
      await mutate(user?._id);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Follow: failed!",
        description: "An error occurred during follow.",
      });
    }
  };

  return (
    <div className="flex justify-between space-x-4">
      <Avatar className="flex-none">
        <AvatarImage src={user?.profile_picture || User} />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex gap-1">
          <h4 className="text-base font-semibold">@{user?.username}</h4>
          <span>
            {user.hasBadge && <BadgeCheck fill="blue" stroke="black" />}
          </span>
        </div>
        <p className="line-clamp-3 pb-2 text-sm font-light">
          {user?.bio || "halo"}
        </p>
        <p className="text-xs text-gray-500">
          {user?.followers.length}{" "}
          {user?.followers.length > 1 ? "followers" : "follower"}
        </p>
        {currentUser?._id !== user?._id && (
          <Button
            size={"sm"}
            className="w-full bg-white text-black transition hover:scale-105 hover:bg-white hover:text-black"
            onClick={handleFollow}
          >
            {currentUser?.following.includes(user?._id) ? "UnFollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileHover;
