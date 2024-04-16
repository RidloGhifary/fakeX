import React, { ChangeEvent } from "react";
import User from "../../assets/user.png";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileHover from "./ProfileHover";
import Love from "./react/Love";
import Comment from "./react/Comment";
import Share from "./react/Share";
import MenuPost from "./MenuPost";
import { Post } from "@/models/Post";
import moment from "moment";

interface PostContentProps {
  data: Post;
}

const PostContent: React.FC<PostContentProps> = ({ data }) => {
  const [textPostComment, setTextPostComment] = React.useState<string>("");

  const handleChangePostComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostComment(event.target.value);
  };

  const handleSubmitPostComment = () => {
    console.log(textPostComment);
  };

  return (
    <section className="flex justify-start gap-4">
      <div className="flex  flex-none flex-col items-center gap-4">
        <div className="relative">
          <img
            src={data?.user.profile_picture || User}
            alt={data?.user.username}
            className="w-10 rounded-full border"
          />
          <div className="absolute -bottom-1 -right-1 cursor-pointer rounded-full border border-black bg-white text-black transition hover:scale-110">
            <Plus size={18} />
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="h-[74%] border-[.2px] border-gray-800"
        />
      </div>
      <div className="flex flex-1 gap-4">
        <div className="w-full">
          <HoverCard>
            <HoverCardTrigger>
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
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <ProfileHover user={data?.user} />
            </HoverCardContent>
          </HoverCard>
          <p className="mt-2 line-clamp-4 font-light">{data?.content}</p>
          <div className="mb-2 mt-10 flex items-center gap-3">
            <Love post={data} />
            <Comment
              handleChangePostComment={handleChangePostComment}
              handleSubmitPostComment={handleSubmitPostComment}
              textPostComment={textPostComment}
            />
            <Share />
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
        <MenuPost user={data?.user} />
      </div>
    </section>
  );
};

export default PostContent;
