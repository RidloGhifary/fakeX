import React from "react";
import CreatePostHomePage from "./CreatePostHomePage";
import { ArrowLeftRight } from "lucide-react";
import SwitchContent from "./SwitchContent";
import { Post } from "@/models/Post";
import { UseAppContext } from "@/context/AppContext";
import PostContent from "./PostContent";
import { Separator } from "../ui/separator";

const TimeLine = () => {
  const [postOrder, setPostOrder] = React.useState<boolean>(false);
  const { postContentDatas, postContentIsLoading } = UseAppContext();

  return (
    <section className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <CreatePostHomePage />
      <SwitchContent postDatas={postContentDatas} />

      <div className="mb-56 hidden md:block">
        {postContentIsLoading ? (
          <p>Loading...</p>
        ) : (
          postContentDatas?.map((post: Post, i: number) => (
            <div key={i}>
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <PostContent data={post} />
            </div>
          ))
        )}
      </div>

      <div className="sticky bottom-5 left-0 hidden w-fit cursor-pointer rounded-full border border-gray-500 bg-black p-3 transition hover:scale-110 md:block">
        <div
          onClick={() => setPostOrder(!postOrder)}
          className="flex items-center justify-end gap-2"
        >
          {postOrder ? "Following" : "For you"}
          <ArrowLeftRight />
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
