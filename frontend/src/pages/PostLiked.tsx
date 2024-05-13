import React from "react";
import { UseAppContext } from "@/context/AppContext";
import { Separator } from "@/components/ui/separator";
import LazyLoadedComponent from "@/components/LazyLoadedComponent";
import { LikedPostProps } from "@/models/LikedPost";

const PostContentSkeleton = React.lazy(
  () => import("@/components/skeleton/PostContentSkeleton"),
);
const LikedPostContent = React.lazy(
  () => import("@/components/LikedPostContent"),
);

const PostLiked = () => {
  const { likedPostDatas, likedPostDatasLoading } = UseAppContext();

  if (likedPostDatasLoading) return <PostContentSkeleton />;

  return (
    <div className="mx-auto max-w-[600px] px-3 pb-56 pt-4 md:px-0 md:py-20">
      {likedPostDatas.length < 1 && (
        <p className="text-center">Looks like you don`t have any</p>
      )}
      <React.Suspense fallback={<p>Loading...</p>}>
        {likedPostDatas?.map((savePostData: LikedPostProps, i: number) => (
          <LazyLoadedComponent key={i}>
            <LikedPostContent data={savePostData} />
            {likedPostDatas?.length > 1 && (
              <Separator className="my-6 border-[.2px] border-gray-800" />
            )}
          </LazyLoadedComponent>
        ))}
      </React.Suspense>
    </div>
  );
};

export default PostLiked;
