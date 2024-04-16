import User from "../../../assets/user.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import React, { ChangeEvent } from "react";
import ProfilePicture from "@/components/ProfilePicture";
import Username from "@/components/Username";
import { Post } from "@/models/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseCommentPost } from "@/api/PostApi";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Comment: React.FC<{ post?: Post }> = ({ post }) => {
  const [textPostComment, setTextPostComment] = React.useState<string>("");

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChangePostComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostComment(event.target.value);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["comment-post"],
    mutationFn: UseCommentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      setTextPostComment("");
      navigate(`/@${post?.user.username}/post/${post?._id}`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Create: failed!",
        description: "An error occurred during posting.",
      });
    },
  });

  const handleSubmitPostComment = async () => {
    try {
      await mutate({ content: textPostComment, url: post?._id as string });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Create: failed!",
        description: "An error occurred during posting.",
      });
    }
  };

  return (
    <div className="cursor-pointer rounded-full p-1 hover:scale-105">
      <Dialog>
        <DialogTrigger>
          <MessageCircle size={25} />
        </DialogTrigger>
        <DialogContent className="border-white/50 bg-black text-white">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-start gap-4 overflow-hidden">
                <section className="flex flex-none flex-col items-center gap-4">
                  <img
                    src={post?.user.profile_picture || User}
                    alt="user-photo"
                    className="w-10 rounded-full border"
                  />
                  <Separator
                    orientation="vertical"
                    className="h-[74%] border-[.2px] border-gray-800"
                  />
                </section>
                <section>
                  <p className="font-semibold">@{post?.user.username}</p>
                  <p className="mt-2 line-clamp-3 text-sm font-light leading-normal">
                    {post?.content}
                  </p>
                </section>
              </div>
              <div className="mt-4 flex justify-start gap-4 overflow-hidden">
                <section className="flex flex-none flex-col items-center gap-4">
                  <ProfilePicture />
                  <Separator
                    orientation="vertical"
                    className="h-[74%] border-[.2px] border-gray-800"
                  />
                </section>
                <section className="flex-1">
                  <div className="w-full">
                    <Username />
                    <Textarea
                      autoFocus={true}
                      value={textPostComment}
                      minLength={1}
                      maxLength={500}
                      onChange={handleChangePostComment}
                      contentEditable={true}
                      disabled={isPending}
                      placeholder="Write for posting..."
                      className="h-auto min-h-[80px] w-full resize-none border-0 bg-transparent px-0 font-light focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm font-medium text-white/50">
                      add to public
                    </p>
                    <DialogClose asChild>
                      <Button
                        disabled={textPostComment === "" || isPending}
                        onClick={handleSubmitPostComment}
                        className="rounded-full bg-white font-bold uppercase text-black transition  hover:bg-white/80 hover:text-black disabled:cursor-not-allowed disabled:bg-white/50"
                      >
                        {isPending ? "wait" : "post"}
                      </Button>
                    </DialogClose>
                  </div>
                </section>
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Comment;
