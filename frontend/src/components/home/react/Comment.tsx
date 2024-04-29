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
import { Repeat2 } from "lucide-react";
import React, { ChangeEvent, useEffect } from "react";
import ProfilePicture from "@/components/ProfilePicture";
import Username from "@/components/Username";
import { Post } from "@/models/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseCommentPost } from "@/api/PostApi";
import { useToast } from "@/components/ui/use-toast";

const Comment: React.FC<{ post: Post; url?: string }> = ({ post, url }) => {
  const [textPostComment, setTextPostComment] = React.useState<string>("");
  const [postData, setPostData] = React.useState({} as Post | undefined);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleChangePostComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostComment(event.target.value);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["comment-post"],
    mutationFn: UseCommentPost,
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
      setTextPostComment("");
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
      await mutate({ content: textPostComment, url: url as string });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Create: failed!",
        description: "An error occurred during posting.",
      });
    }
  };

  useEffect(() => {
    setPostData(post);
  }, [post]);

  return (
    <div className="cursor-pointer rounded-full p-1 hover:scale-105">
      <Dialog>
        <DialogTrigger className="flex items-center justify-center">
          <Repeat2 size={27} />
        </DialogTrigger>
        <DialogContent className="border-white/50 bg-black text-white">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-start gap-4 overflow-hidden">
                <section className="flex flex-none flex-col items-center gap-4">
                  <img
                    src={(postData && postData?.user?.profile_picture) || User}
                    alt="user-photo"
                    className="h-10 w-10 rounded-full border object-cover"
                  />
                  <Separator
                    orientation="vertical"
                    className="h-[74%] border-[.2px] border-gray-800"
                  />
                </section>
                <section>
                  <p className="font-semibold">
                    @{postData && postData?.user?.username}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm font-light leading-normal">
                    {postData && postData?.content}
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
