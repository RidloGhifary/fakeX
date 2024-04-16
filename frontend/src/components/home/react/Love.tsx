import { useToast } from "@/components/ui/use-toast";
import { UseAppContext } from "@/context/AppContext";
import { Post } from "@/models/Post";
import { makeRequest } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Love: React.FC<{ post?: Post; urlLike?: string; comment?: any }> = ({
  post,
  urlLike,
  comment,
}) => {
  const { currentUser } = UseAppContext();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["post"],
    mutationFn: async () => {
      const response = await makeRequest.post(urlLike as string);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        { queryKey: ["post"] },
        { queryKey: ["post-detail"] },
      ]);
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
    try {
      mutate();
    } catch {
      toast({
        variant: "destructive",
        title: "Like post: failed!",
        description: "An error occurred during like.",
      });
    }
  };

  return (
    <div className="cursor-pointer rounded-full p-1 hover:scale-105">
      <Heart
        fill={
          post?.likes?.includes(currentUser?._id) ||
          comment?.likes?.includes(currentUser?._id)
            ? "red"
            : "none"
        }
        stroke={
          post?.likes.includes(currentUser?._id) ||
          comment?.likes?.includes(currentUser?._id)
            ? "red"
            : "white"
        }
        size={27}
        onClick={handleLike}
      />
    </div>
  );
};

export default Love;
