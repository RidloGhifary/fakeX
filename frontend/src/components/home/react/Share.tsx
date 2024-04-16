import { useToast } from "@/components/ui/use-toast";
import { Post } from "@/models/Post";
import { Send } from "lucide-react";

const Share: React.FC<{ post: Post }> = ({ post }) => {
  const { toast } = useToast();

  const domain = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";

  const handelShareLink = () => {
    const postUrl = `http://${domain}${port}/@${post?.user?.username}/post/${post?._id}`;

    navigator.clipboard
      .writeText(`${postUrl}`)
      .then(() => {
        toast({
          title: "Success copied.",
          description: "URL has been copied.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed.",
          description: "Failed copied URL.",
        });
      });
  };

  return (
    <div className="cursor-pointer rounded-full p-1 hover:scale-105">
      <Send size={27} onClick={handelShareLink} />
    </div>
  );
};

export default Share;
