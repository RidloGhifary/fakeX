import { Reply } from "@/models/Comment";
import User from "../../assets/user.png";
import React from "react";
import { BadgeCheck, Check, Plus, Trash } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Love from "../home/react/Love";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Post } from "@/models/Post";
import { UseFollowUser } from "@/api/UserApi";
import { DeleteReplyComment } from "@/api/PostApi";

const RepliedSection: React.FC<{
  reply: Reply;
  commentId: string;
  postData: Post;
}> = ({ reply, commentId, postData }) => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
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

  const handleFollow = () => {
    mutate(postData?.user?._id.toString());
  };

  const { mutate: deleteCommentMutate } = useMutation({
    mutationKey: ["delete-comment"],
    mutationFn: DeleteReplyComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-detail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-byfollowing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["save-post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["search-post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-post"],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Delete: failed!",
        description: "An error occurred during deleting.",
      });
    },
  });

  const handleDeleteReplyComment = () => {
    deleteCommentMutate({ commentId, postId, replyId: reply._id });
  };

  return (
    <section className="flex justify-start gap-4">
      <div className="flex flex-none flex-col items-center gap-4">
        <div className="relative">
          <img
            src={reply?.user.profile_picture || User}
            alt={reply?.user.username}
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />
          {currentUser._id === postData?.user?._id ||
          currentUser._id ===
            reply?.user._id ? null : currentUser?.following.includes(
              postData?.user?._id,
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
          <div className="flex items-center gap-1">
            <Love
              reply={reply}
              urlLike={`/post/comment/${commentId}/like-reply/${postId}/${reply?._id}`}
            />
            <span className="text-sm text-gray-500">
              {reply?.likes?.length}
            </span>
          </div>
        </div>
        {currentUser?._id === reply?.user?._id && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash
                size={20}
                className="cursor-pointer transition hover:scale-105"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete and
                  remove your comment reply from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteReplyComment()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </section>
  );
};

export default RepliedSection;
