import React from "react";
import { UseLikePost } from "@/api/PostApi";
import { useToast } from "@/components/ui/use-toast";
import { UseAppContext } from "@/context/AppContext";
import { Reply } from "@/models/Comment";
import { Post } from "@/models/Post";
import { UserSum } from "@/models/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { socket } from "@/utils/socket";

interface CommentProps {
  user: UserSum;
  content: string;
  edited: boolean;
  likes: string[];
  _id: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

const Love: React.FC<{
  post?: Post;
  urlLike: string;
  comment?: CommentProps;
  reply?: Reply;
}> = ({ post, urlLike, comment, reply }) => {
  const { currentUser } = UseAppContext();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["post"],
    mutationFn: UseLikePost,
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
        queryKey: ["liked-post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["search-post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-notification"],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Like post: failed!",
        description: "An error occurred during like.",
      });
    },
  });

  const handleLike = () => {
    mutate(urlLike);
    socket.emit("love", {
      userPostId: post?.user?._id,
      senderId: currentUser._id,
      message: "Love your post",
    });
  };

  return (
    <div className="cursor-pointer rounded-full p-1 hover:scale-105">
      <Heart
        fill={
          post?.likes?.includes(currentUser?._id) ||
          comment?.likes?.includes(currentUser?._id) ||
          reply?.likes?.includes(currentUser?._id)
            ? "red"
            : "none"
        }
        stroke={
          post?.likes?.includes(currentUser?._id) ||
          comment?.likes?.includes(currentUser?._id) ||
          reply?.likes?.includes(currentUser?._id)
            ? "red"
            : "white"
        }
        size={25}
        onClick={handleLike}
      />
    </div>
  );
};

export default Love;
