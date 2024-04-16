import React, { ChangeEvent } from "react";
import User from "../../assets/user.png";
import { Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import Love from "./react/Love";
import Comment from "./react/Comment";
import Share from "./react/Share";
import MenuPost from "./MenuPost";
import { Post } from "@/models/Post";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { UseAppContext } from "@/context/AppContext";
import { useToast } from "../ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PostContentProps {
  data: Post;
}

const PostContent: React.FC<PostContentProps> = ({ data }) => {
  const [textPostComment, setTextPostComment] = React.useState<string>("");

  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { toast } = useToast();

  const handleChangePostComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostComment(event.target.value);
  };

  const handleSubmitPostComment = () => {
    console.log(textPostComment);
  };

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
            src={data?.user.profile_picture || User}
            alt={data?.user.username}
            className="w-10 rounded-full border"
          />

          {currentUser._id ===
          data?.user?.userId ? null : currentUser?.following.includes(
              data?.user?.userId,
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
          <p className="font-semibold">
            <Link
              to={`/profile/${data?.user.username}`}
              className="hover:underline"
            >
              @{data?.user.username}
            </Link>
            <span className="ml-3 text-sm text-gray-500">
              {moment(data?.createdAt).fromNow()}
            </span>
          </p>
          <Link
            to={`/@${data?.user?.username}/post/${data?._id}`}
            className="mt-2 line-clamp-4 font-light"
          >
            {data?.content}
          </Link>
          <div className="mb-2 mt-10 flex items-center gap-3">
            <Love post={data} />
            <Comment
              handleChangePostComment={handleChangePostComment}
              handleSubmitPostComment={handleSubmitPostComment}
              textPostComment={textPostComment}
            />
            <Share post={data} />
          </div>
          <p className="text-sm text-gray-500">
            {data?.likes.length} {data?.likes.length > 1 ? "likes" : "like"} -{" "}
            <Link
              to={`/@${data?.user?.username}/post/${data?._id}`}
              className="hover:underline"
            >
              {data?.comments.length}{" "}
              {data?.comments.length > 1 ? "comments" : "comment"}
            </Link>
          </p>
        </div>
        <MenuPost post={data} />
      </div>
    </section>
  );
};

export default PostContent;
