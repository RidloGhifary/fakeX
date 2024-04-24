import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import PostContent from "./PostContent";
import React from "react";
import { Post } from "@/models/Post";

const SwitchContent: React.FC<{
  postDatas: Post[];
  postContentDatasByFollowing: Post[];
}> = ({ postDatas, postContentDatasByFollowing }) => {
  return (
    <section className="my-4 block md:hidden">
      <Tabs defaultValue="forYou" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900 text-white">
          <TabsTrigger value="forYou">For you</TabsTrigger>
          <TabsTrigger value="follow">Follow</TabsTrigger>
        </TabsList>
        <TabsContent value="forYou">
          {postDatas?.map((data, i) => (
            <div key={i}>
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <PostContent data={data} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="follow">
          {postContentDatasByFollowing?.map((data, i) => (
            <div key={i}>
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <PostContent data={data} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SwitchContent;
