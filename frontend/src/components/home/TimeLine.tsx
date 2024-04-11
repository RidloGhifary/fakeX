import React from "react";
import CreatePostHomePage from "./CreatePostHomePage";
import { Separator } from "../ui/separator";
import PostContent from "./PostContent";
import { ArrowLeftRight } from "lucide-react";

const TimeLine = () => {
  const [postOrder, setPostOrder] = React.useState<boolean>(false);

  return (
    <section className="mx-auto max-w-[600px] py-20">
      <CreatePostHomePage />
      {Array.from(
        [1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i}>
            <Separator className="my-6 border-[.2px] border-gray-800" />
            <PostContent />
          </div>
        )),
      )}
      <div className="sticky bottom-5 w-fit cursor-pointer rounded-full border border-gray-500 bg-black p-3 transition hover:scale-110">
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
