import UserImage from "../../assets/user.png";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import React from "react";
import moment from "moment";
import { UserPost } from "@/models/Post";
import MenuPost from "../home/MenuPost";
import Love from "../home/react/Love";
import Comment from "../home/react/Comment";
import Share from "../home/react/Share";

interface UserContentProps {
  userPost: UserPost;
  userPostLoading: boolean;
}

const UserContent: React.FC<UserContentProps> = ({
  userPost,
  userPostLoading,
}) => {
  if (userPostLoading) return <p>Loading...</p>;

  return (
    <section className="flex justify-start gap-4">
      <div className="flex flex-none flex-col items-center gap-4">
        <img
          src={userPost.user.profile_picture || UserImage}
          alt="user-photo"
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
        <Separator
          orientation="vertical"
          className="h-[74%] border-[.2px] border-gray-800"
        />
      </div>
      <div className="flex flex-1 gap-4">
        <div className="w-full">
          <p className="flex items-center gap-1 font-semibold">
            <Link
              to={`/profile/@${userPost?.user?.username}`}
              className="hover:underline"
            >
              @{userPost?.user?.username}
            </Link>
            <span>
              {userPost?.user.hasBadge && (
                <BadgeCheck fill="blue" stroke="black" />
              )}
            </span>
            <span className="ml-5 text-sm text-gray-500">
              {moment(userPost?.createdAt).fromNow()}
            </span>
          </p>
          <Link to={`/@${userPost?.user?.username}/post/${userPost?._id}`}>
            <p className="mt-2 line-clamp-4 font-light">{userPost?.content}</p>
          </Link>
          <div className="mb-2 mt-10 flex items-center gap-3">
            <div className="cursor-pointer rounded-full p-1 hover:bg-white/15">
              <Love post={userPost} urlLike={`/post/like/${userPost?._id}`} />
            </div>
            <div className="cursor-pointer rounded-full p-1 hover:bg-white/15">
              <Comment post={userPost} url={userPost?._id} />
            </div>
            <div className="cursor-pointer rounded-full p-1 hover:bg-white/15">
              <Share post={userPost} />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {userPost?.likes.length !== 0 && (
              <span>
                {userPost?.likes.length +
                  " " +
                  `${userPost?.likes.length > 1 ? "likes" : "like"}`}
              </span>
            )}
            {userPost?.likes.length !== 0 &&
              userPost?.comments.length !== 0 &&
              " - "}
            {userPost?.comments.length !== 0 && (
              <span>
                <Link
                  to={`/@${userPost?.user?.username}/post/${userPost?._id}`}
                >
                  {userPost?.comments.length +
                    " " +
                    `${userPost?.comments.length > 1 ? "replies" : "reply"}`}
                </Link>
              </span>
            )}
          </p>
        </div>
        <div>
          <MenuPost post={userPost} />
        </div>
      </div>
    </section>
  );
};

export default UserContent;
