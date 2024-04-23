import { Reply } from "@/models/Comment";
import User from "../../assets/user.png";
import React from "react";
import { BadgeCheck, Check, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Love from "../home/react/Love";
import { makeRequest } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UseAppContext } from "@/context/AppContext";
import { useToast } from "../ui/use-toast";

const RepliedSection: React.FC<{ reply: Reply; commentId: string }> = ({
  reply,
  commentId,
}) => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { currentUser } = UseAppContext();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ["post-detail"],
    queryFn: async () => {
      const response = await makeRequest.get(`/post/${postId}`);
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await makeRequest.post(
        `/user/follow/${data?.user?.userId.toString()}`,
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
      <div className="flex flex-none flex-col items-center gap-4">
        <div className="relative">
          <img
            src={reply?.user.profile_picture || User}
            alt={reply?.user.username}
            className="h-10 w-10 rounded-full border object-cover"
            loading="lazy"
          />
          {currentUser._id === data?.user?._id ||
          currentUser._id ===
            reply?.user._id ? null : currentUser?.following.includes(
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
      </div>
      <div className="flex flex-1 gap-4">
        <div className="w-full space-y-2">
          <p className="flex items-center gap-1 font-semibold">
            <Link
              to={`/profile/@${reply?.user.username}`}
              className="hover:underline"
            >
              @{reply?.user.username}
            </Link>
            <span>
              {reply?.user.hasBadge && (
                <BadgeCheck fill="blue" stroke="black" />
              )}
            </span>
            <span className="ml-3 text-sm text-gray-500">
              {moment(reply?.createdAt).fromNow()}
            </span>
          </p>
          <p className="font-light">{reply?.content}</p>
          <div className="flex items-center gap-3">
            <Love
              reply={reply}
              urlLike={`/post/comment/${commentId}/like-reply/${postId}/${reply?._id}`}
            />
            <p className="text-sm text-gray-500">
              {reply?.likes.length > 0 && reply?.likes.length}{" "}
              {reply?.likes.length > 1
                ? "likes"
                : reply?.likes.length === 0
                  ? null
                  : "like"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepliedSection;
