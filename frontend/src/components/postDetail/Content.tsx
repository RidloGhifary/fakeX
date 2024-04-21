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

const Content = () => {
  const queryClient = useQueryClient();
  const { currentUser, postDetail } = UseAppContext();
  const { postId } = useParams();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["follow-user"],
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
    <section className="flex justify-start gap-4">
      <div className="flex flex-1 gap-4">
        <div className="w-full">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={postDetail?.user.profile_picture || User}
                alt={postDetail?.user.username}
                className="w-10 rounded-full border"
              />

              {currentUser._id ===
              postDetail?.user?.userId ? null : currentUser?.following.includes(
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
            <p className="flex gap-1 font-semibold">
              <Link
                to={`/profile/${postDetail?.user.username}`}
                className="hover:underline"
              >
                @{postDetail?.user.username}
              </Link>
              <span>
                {postDetail?.user.hasBadge && (
                  <BadgeCheck fill="blue" stroke="black" />
                )}
              </span>
              <span className="ml-3 text-gray-500">
                {moment(postDetail?.createdAt).fromNow()}
              </span>
            </p>
          </div>
          <p className="mt-2 font-light">{postDetail?.content}</p>
          <div className="mb-2 mt-7 flex items-center gap-3">
            <Love post={postDetail} urlLike={`/post/like/${postId}`} />
            <Comment post={postDetail && postDetail} url={postId} />
            <Share post={postDetail} />
          </div>
          <p className="text-sm text-gray-500">
            {postDetail?.likes.length}{" "}
            {postDetail?.likes.length > 1 ? "likes" : "like"} -{" "}
            {postDetail?.comments.length}{" "}
            {postDetail?.comments.length > 1 ? "comments" : "comment"}
          </p>
        </div>
        <MenuPost post={postDetail} />
      </div>
    </section>
  );
};

export default Content;
