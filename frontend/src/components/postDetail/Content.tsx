import React, { ChangeEvent } from "react";
import User from "../../assets/user.png";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileHover from "../home/ProfileHover";
import Love from "../home/react/Love";
import Comment from "../home/react/Comment";
import Share from "../home/react/Share";
import MenuPost from "../home/MenuPost";

const Content = () => {
  const [textPostComment, setTextPostComment] = React.useState<string>("");

  const handleChangePostComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostComment(event.target.value);
  };

  const handleSubmitPostComment = () => {
    console.log(textPostComment);
  };

  return (
    <section className="flex justify-start gap-4">
      <div className="flex flex-1 gap-4">
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center gap-4">
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
                <p className="font-semibold">
                  <Link to="/profile/@rdllghifary_" className="hover:underline">
                    @rdllghifary_
                  </Link>
                  <span className="ml-5 text-gray-500">2h</span>
                </p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <ProfileHover />
            </HoverCardContent>
          </HoverCard>
          <p className="mt-2 line-clamp-4 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            praesentium libero natus distinctio inventore atque deserunt
            voluptas consectetur? Perspiciatis alias rerum repudiandae
          </p>
          <div className="mb-2 mt-7 flex items-center gap-3">
            <Love />
            <Comment
              handleChangePostComment={handleChangePostComment}
              handleSubmitPostComment={handleSubmitPostComment}
              textPostComment={textPostComment}
            />
            <Share />
          </div>
          <p className="text-sm text-gray-500">
            200 likes -{" "}
            <Link
              to="/@user/post/660d669a571eec5f7c60dcd9"
              className="hover:underline"
            >
              10 replies
            </Link>
          </p>
        </div>
        <MenuPost />
      </div>
    </section>
  );
};

export default Content;
