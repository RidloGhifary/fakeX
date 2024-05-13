import React from "react";
import { UseAppContext } from "@/context/AppContext";
import SavedPostContent from "@/components/SavedPostContent";
import { PostSavedProps } from "@/models/PostSaved";
import { Separator } from "@/components/ui/separator";
import LazyLoadedComponent from "@/components/LazyLoadedComponent";
import PostContentSkeleton from "@/components/skeleton/PostContentSkeleton";

const PostSaved = () => {
  const { savePostDatas, savePostDatasLoading } = UseAppContext();

  if (savePostDatasLoading) return <PostContentSkeleton />;
  return (
    <React.Fragment>
      <div className="mx-auto max-w-[600px] px-3 pb-56 pt-4 md:px-0 md:py-20">
        {savePostDatas.length < 1 && (
          <p className="text-center">Looks like you don`t have any</p>
        )}
        {savePostDatas?.map((savePostData: PostSavedProps, i: number) => (
          <LazyLoadedComponent key={i}>
            <SavedPostContent data={savePostData} />
            {savePostDatas?.length > 1 && (
              <Separator className="my-6 border-[.2px] border-gray-800" />
            )}
          </LazyLoadedComponent>
        ))}
      </div>
    </React.Fragment>
  );
};

export default PostSaved;
