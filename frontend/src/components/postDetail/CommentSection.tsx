import { Separator } from "../ui/separator";
import User from "../../assets/user.png";
import { BadgeCheck, Check, Plus, Trash } from "lucide-react";
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
import { Post } from "@/models/Post";
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

interface CommentProps {
  user: {
    _id: string;
    username: string;
    profile_picture: string;
    hasBadge: boolean;
  };
  content: string;
  edited: boolean;
  likes: string[];
  _id: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CommentSection: React.FC<{ data: Post; dataIsLoading: boolean }> = ({
  data,
  dataIsLoading,
}) => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { currentUser } = UseAppContext();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["user"],
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
        description: "An error occurred during following.",
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

  const { mutate: deleteCommentMutate } = useMutation({
    mutationKey: ["delete-comment"],
    mutationFn: async (commentId: string) => {
      const response = await makeRequest.post(
        `/post/comment/${commentId}/delete/${data?._id}`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-byfollowing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-detail"],
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
      // console.log("🚀 ~ err:", err);
      toast({
        variant: "destructive",
        title: "Delete: failed!",
        description: "An error occurred during deleting.",
      });
    },
  });

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutate(commentId);
  };

  if (dataIsLoading) return <p>Loading...</p>;

  return (
    <div className="pb-44 pt-5">
      <Separator className="mb-5 border-[.2px] border-gray-800" />
      {data?.comments?.map((commentData: CommentProps) => {
        return (
          <div key={commentData?._id}>
            <section className="flex justify-start gap-4">
              <div className="flex flex-none flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={commentData?.user.profile_picture || User}
                    alt={commentData?.user.username}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  {currentUser._id === data?.user?._id ||
                  currentUser._id ===
                    commentData?.user
                      ._id ? null : currentUser?.following.includes(
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
                {commentData?.replies.length > 0 && (
                  <Separator
                    orientation="vertical"
                    className="h-[50%] border-[.2px] border-gray-800"
                  />
                )}
              </div>
              <div className="flex flex-1 items-start gap-4">
                <div className="w-full space-y-2">
                  <p className="flex items-center gap-1 font-semibold">
                    <Link
                      to={`/profile/@${commentData?.user.username}`}
                      className="hover:underline"
                    >
                      @{commentData?.user.username}
                    </Link>
                    <span>
                      {commentData?.user.hasBadge && (
                        <BadgeCheck fill="blue" stroke="black" />
                      )}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">
                      {moment(commentData?.createdAt).fromNow()}
                    </span>
                  </p>
                  <p className="font-light">{commentData?.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Love
                        comment={commentData}
                        urlLike={`/post/comment/${commentData?._id}/like/${postId}`}
                      />
                      <span className="text-sm text-gray-500">
                        {commentData?.likes?.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Comment
                        post={commentData}
                        url={`${commentData?._id}/reply/${data?._id}`}
                      />
                      <span className="text-sm text-gray-500">
                        {commentData?.replies?.length}
                      </span>
                    </div>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash
                      size={20}
                      className="cursor-pointer transition hover:scale-105"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete and remove your comment from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteComment(commentData?._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </section>
            {commentData?.replies.map((reply: Reply) => (
              <div key={reply._id} className="mt-4">
                <RepliedSection reply={reply} commentId={commentData?._id} />
              </div>
            ))}
            <Separator className="my-5 border-[.2px] border-gray-800" />
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
