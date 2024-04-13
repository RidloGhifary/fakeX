import { Separator } from "../ui/separator";
import User from "../../assets/user.png";
import React, { ChangeEvent } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileHover from "../home/ProfileHover";
import Love from "../home/react/Love";
import Comment from "../home/react/Comment";
import Share from "../home/react/Share";
import MenuPost from "../home/MenuPost";

const PostComment = () => {
  const [textPostReplyComment, setTextPostReplyComment] =
    React.useState<string>("");

  const handleChangePostReplyComment = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextPostReplyComment(event.target.value);
  };

  const handleSubmitPostReplyComment = () => {
    console.log(textPostReplyComment);
  };
  return (
    <div className="py-5 pb-10">
      {Array.from([1, 2, 3, 4]).map((_, i) => (
        <div key={i}>
          <Separator className="border-[.2px] border-gray-800" />
          <section className="my-4 flex justify-start gap-4">
            <div className="flex flex-none flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={User}
                  alt="user-photo"
                  className="w-10 rounded-full border"
                />
                <div className="absolute -bottom-1 -right-1 cursor-pointer rounded-full border border-black bg-white text-black transition hover:scale-110">
                  <Plus size={18} />
                </div>
              </div>
              {/* <Separator
            orientation="vertical"
            className="h-[74%] border-[.2px] border-gray-800"
          /> */}
            </div>
            <div className="flex flex-1 gap-4">
              <div className="w-full">
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="font-semibold">
                      <Link
                        to="/profile/@rdllghifary_"
                        className="hover:underline"
                      >
                        @ghfryy_
                      </Link>
                      <span className="ml-5 text-gray-500">2h</span>
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <ProfileHover />
                  </HoverCardContent>
                </HoverCard>
                <p className="mt-2 line-clamp-4 font-light">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </p>
                <div className="mb-2 mt-5 flex items-center gap-3">
                  <Love />
                  <Comment
                    handleChangePostComment={handleChangePostReplyComment}
                    handleSubmitPostComment={handleSubmitPostReplyComment}
                    textPostComment={textPostReplyComment}
                  />
                  <Share />
                </div>
                <p className="text-sm text-gray-500">
                  89 likes -{" "}
                  <Link
                    to="/@user/post/660d669a571eec5f7c60dcd9"
                    className="hover:underline"
                  >
                    40 replies
                  </Link>
                </p>
              </div>
              <MenuPost />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default PostComment;
