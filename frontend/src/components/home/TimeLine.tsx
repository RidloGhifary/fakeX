import React from "react";
import CreatePostHomePage from "./CreatePostHomePage";
import { ArrowLeftRight } from "lucide-react";
import SwitchContent from "./SwitchContent";
import { Post } from "@/models/Post";
import { UseAppContext } from "@/context/AppContext";
import PostContent from "./PostContent";
import { Separator } from "../ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

const TimeLine = () => {
  const [postOrder, setPostOrder] = React.useState<boolean>(false);
  const {
    postContentDatas,
    postContentIsLoading,
    postContentDatasByFollowing,
    postContentDatasByFollowingLoading,
  } = UseAppContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChangePostContent = () => {
    setPostOrder(!postOrder);

    if (!postOrder) {
      navigate("/byfollowing");
    } else {
      navigate("/");
    }
  };

  if (postContentIsLoading || postContentDatasByFollowingLoading)
    return <p>Loading...</p>;

  return (
    <section className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <CreatePostHomePage />
      <SwitchContent
        postDatas={postContentDatas}
        postContentDatasByFollowing={postContentDatasByFollowing}
      />

      <div className="mb-56 hidden md:block">
        {postContentIsLoading || postContentDatasByFollowingLoading ? (
          <p>Loading...</p>
        ) : pathname === "/" ? (
          postContentDatas?.map((post: Post, i: number) => (
            <div key={i}>
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <PostContent data={post} />
            </div>
          ))
        ) : (
          postContentDatasByFollowing?.map((post: Post, i: number) => (
            <div key={i}>
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <PostContent data={post} />
            </div>
          ))
        )}
      </div>

      <div className="sticky bottom-5 left-0 hidden w-fit cursor-pointer rounded-full border border-gray-500 bg-black p-3 transition hover:scale-110 md:block">
        <div
          onClick={handleChangePostContent}
          className="flex items-center justify-end gap-2"
        >
          {!postOrder ? "Follow" : "For you"}
          <ArrowLeftRight />
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
