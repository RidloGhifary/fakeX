import React, { ChangeEvent } from "react";
import User from "../../assets/user.png";
import { BadgeCheck, Check, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Love from "../home/react/Love";
import Comment from "../home/react/Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [textPostComment, setTextPostComment] = React.useState<string>("");

  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { postId } = useParams();
  const { toast } = useToast();

  const handleChangePostComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostComment(event.target.value);
  };

  const handleSubmitPostComment = () => {
    console.log(textPostComment);
  };

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
      <div className="flex flex-1 gap-4">
        <div className="w-full">
          <div className="flex items-center gap-4">
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
            <p className="flex gap-1 font-semibold">
              <Link
                to={`/profile/${data?.user.username}`}
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
            <Comment
              handleChangePostComment={handleChangePostComment}
              handleSubmitPostComment={handleSubmitPostComment}
              textPostComment={textPostComment}
            />
            <Share post={data} />
          </div>
          <p className="text-sm text-gray-500">
            {data?.likes.length} {data?.likes.length > 1 ? "likes" : "like"} -{" "}
            {data?.comments.length}{" "}
            {data?.comments.length > 1 ? "comments" : "comment"}
          </p>
        </div>
        <MenuPost post={data} />
      </div>
    </section>
  );
};

export default Content;
