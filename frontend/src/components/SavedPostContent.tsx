import React from "react";
import UserImage from "../assets/user.png";
import { PostSavedProps } from "@/models/PostSaved";
import { Separator } from "./ui/separator";
import { UseAppContext } from "@/context/AppContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeCheck, Check, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { makeRequest } from "@/utils/axios";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import ProfileHover from "./home/ProfileHover";
import moment from "moment";
import MenuPost from "./home/MenuPost";
import Love from "./home/react/Love";
import Comment from "./home/react/Comment";
import Share from "./home/react/Share";

const SavedPostContent: React.FC<{ data: PostSavedProps }> = ({ data }) => {
  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await makeRequest.post(
        `/user/follow/${data?.post?.user?._id.toString()}`,
      );
      return response;
    },
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

  const handleFollow = () => {
    try {
      mutate();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Follow: failed!",
        description: "An error occurred during follow.",
      });
    }
  };

  return (
    <section className="flex justify-start gap-4">
      <div className="flex flex-none flex-col items-center">
        <div className="relative">
          <img
            src={data?.post?.user.profile_picture || UserImage}
            alt={data?.post?.user.username}
            className="h-10 w-10 rounded-full border object-cover"
            loading="lazy"
          />

          {currentUser._id ===
          data?.post?.user?._id ? null : currentUser?.following.includes(
              data?.post?.user?._id,
            ) ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="absolute -bottom-1 -right-1 cursor-pointer rounded-full border border-black bg-white text-black transition hover:scale-110">
                  <Check size={18} onClick={handleFollow} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>UnFollow</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="absolute -bottom-1 -right-1 cursor-pointer rounded-full border border-black bg-white text-black transition hover:scale-110">
                  <Plus size={18} onClick={handleFollow} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Separator
          orientation="vertical"
          className="h-[74%] border-[.2px] border-gray-800"
        />
      </div>
      <div className="flex flex-1 gap-4">
        <div className="w-full">
          <p className="flex items-center gap-1 font-semibold">
            <HoverCard>
              <HoverCardTrigger>
                <Link
                  to={`/profile/@${data?.post?.user.username}`}
                  className="text-lg hover:underline"
                >
                  @{data?.post?.user.username}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="border-white/50 bg-black text-white">
                <ProfileHover user={data?.post?.user} />
              </HoverCardContent>
            </HoverCard>

            <span>
              {data?.post?.user.hasBadge && (
                <BadgeCheck fill="blue" stroke="black" />
              )}
            </span>
            <span className="ml-3 text-sm text-gray-500">
              {moment(data?.post?.createdAt).fromNow()}
            </span>
          </p>
          <Link
            to={`/@${data?.post?.user?.username}/post/${data?.post?._id}`}
            className="mt-2 line-clamp-4 font-light"
          >
            {data?.post?.content}
          </Link>
          <div className="mb-1 mt-10 flex items-center gap-3">
            <Love post={data?.post} urlLike={`/post/like/${data?.post?._id}`} />
            <Comment post={data?.post} url={`${data?.post?._id}`} />
            <Share post={data?.post} />
          </div>
          <p className="text-sm text-gray-500">
            {data?.post?.likes?.length}{" "}
            {data?.post?.likes?.length > 1 ? "likes" : "like"} -{" "}
            <Link
              to={`/@${data?.user?.username}/post/${data?._id}`}
              className="hover:underline"
            >
              {data?.post?.comments?.length}{" "}
              {data?.post?.comments?.length > 1 ? "comments" : "comment"}
            </Link>
          </p>
        </div>
        <MenuPost post={data?.post} />
      </div>
    </section>
  );
};

export default SavedPostContent;
