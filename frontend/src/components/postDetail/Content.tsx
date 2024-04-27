import React from "react";
import User from "../../assets/user.png";
import { BadgeCheck, Check, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Love from "../home/react/Love";
import Comment from "../home/react/Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import moment from "moment";
import Share from "../home/react/Share";
import MenuPost from "../home/MenuPost";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UseAppContext } from "@/context/AppContext";
import { useToast } from "../ui/use-toast";
import { Post } from "@/models/Post";

const Content: React.FC<{ data: Post; dataIsLoading: boolean }> = ({
  data,
  dataIsLoading,
}) => {
  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { postId } = useParams();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: async () => {
      const response = await makeRequest.post(
        `/user/follow/${data?.user?._id.toString()}`,
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

  if (dataIsLoading) return <p>Loading...</p>;

  return (
    <section className="flex justify-start gap-4">
      <div className="flex flex-1 gap-4">
        <div className="w-full">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={data?.user.profile_picture || User}
                alt={data?.user.username}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />

              {currentUser._id ===
              data?.user?._id ? null : currentUser?.following.includes(
                  data?.user?._id,
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
            <p className="flex gap-1 font-semibold">
              <Link
                to={`/profile/@${data?.user.username}`}
                className="hover:underline"
              >
                @{data?.user.username}
              </Link>
              <span>
                {data?.user.hasBadge && (
                  <BadgeCheck fill="blue" stroke="black" />
                )}
              </span>
              <span className="ml-3 text-gray-500">
                {moment(data?.createdAt).fromNow()}
              </span>
            </p>
          </div>
          <p className="mt-2 font-light">{data?.content}</p>
          <div className="mb-2 mt-7 flex items-center gap-3">
            <Love post={data} urlLike={`/post/like/${postId}`} />
            <Comment post={data} url={postId} />
            <Share post={data} />
          </div>
          <p className="text-sm text-gray-500">
            {data?.likes.length !== 0 && (
              <span>
                {data?.likes.length +
                  " " +
                  `${data?.likes.length > 1 ? "likes" : "like"}`}
              </span>
            )}
            {data?.likes.length !== 0 && data?.comments.length !== 0 && " - "}
            {data?.comments.length !== 0 && (
              <span>
                {data?.comments.length +
                  " " +
                  `${data?.comments.length > 1 ? "comments" : "comment"}`}
              </span>
            )}
          </p>
        </div>
        <MenuPost post={data} />
      </div>
    </section>
  );
};

export default Content;
