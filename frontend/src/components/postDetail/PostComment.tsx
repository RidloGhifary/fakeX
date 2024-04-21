import { Separator } from "../ui/separator";
import User from "../../assets/user.png";
import { BadgeCheck, Check, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Love from "../home/react/Love";
import Comment from "../home/react/Comment";
import { makeRequest } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UseAppContext } from "@/context/AppContext";
import { useToast } from "../ui/use-toast";
import RepliedSection from "./RepliedSection";
import { Reply } from "@/models/Comment";

const PostComment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { currentUser, postDetail } = UseAppContext();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await makeRequest.post(
        `/user/follow/${postDetail?.user?.userId.toString()}`,
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
    <div className="pb-44 pt-5">
      <Separator className="mb-5 border-[.2px] border-gray-800" />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {postDetail?.comments?.map((comment: any, i: number) => (
        <div key={i}>
          <section className="flex justify-start gap-4">
            <div className="flex flex-none flex-col items-center ">
              <div className="relative">
                <img
                  src={comment?.user.profile_picture || User}
                  alt={comment?.user.username}
                  className="w-10 rounded-full border"
                />
                {currentUser._id === postDetail?.user?.userId ||
                currentUser._id ===
                  comment?.user.userId ? null : currentUser?.following.includes(
                    postDetail?.user?.userId,
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
              {comment?.replies.length > 0 && (
                <Separator
                  orientation="vertical"
                  className="h-[70%] border-[.2px] border-gray-800"
                />
              )}
            </div>
            <div className="flex flex-1 gap-4">
              <div className="w-full space-y-2">
                <p className="flex items-center gap-1 font-semibold">
                  <Link
                    to={`/profile/@${comment?.user.username}`}
                    className="hover:underline"
                  >
                    @{comment?.user.username}
                  </Link>
                  <span>
                    {comment?.user.hasBadge && (
                      <BadgeCheck fill="blue" stroke="black" />
                    )}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">
                    {moment(comment?.createdAt).fromNow()}
                  </span>
                </p>
                <p className="font-light">{comment?.content}</p>
                <div className="flex items-center gap-3">
                  <Love
                    comment={comment}
                    urlLike={`/post/comment/${comment?._id}/like/${postId}`}
                  />
                  <Comment post={postDetail} />
                  <p className="text-sm text-gray-500">
                    {comment?.likes.length > 0 && comment?.likes.length}{" "}
                    {comment?.likes.length > 1
                      ? "likes"
                      : comment?.likes.length === 0
                        ? null
                        : "like"}
                    {" - "}
                    {comment?.replies.length > 0 &&
                      comment?.replies.length}{" "}
                    {comment?.replies.length > 1
                      ? "replies"
                      : comment?.replies.length === 0
                        ? null
                        : "reply"}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {comment?.replies.map((reply: Reply) => (
            <div key={reply._id}>
              <RepliedSection reply={reply} commentId={comment?._id} />
            </div>
          ))}
          <Separator className="my-5 border-[.2px] border-gray-800" />
        </div>
      ))}
    </div>
  );
};

export default PostComment;
