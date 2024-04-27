import React from "react";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { UseAppContext } from "@/context/AppContext";
import SavedPostContent from "@/components/SavedPostContent";
import { PostSavedProps } from "@/models/PostSaved";
import { Separator } from "@/components/ui/separator";
import LazyLoadedComponent from "@/components/LazyLoadedComponent";

const PostSaved = () => {
  const { savePostDatas, savePostDatasLoading } = UseAppContext();

  if (savePostDatasLoading) return <p>Loading...</p>;
  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <div className="mx-auto max-w-[600px] px-3 pb-56 pt-4 md:px-0 md:py-20">
        <h1 className="text-center text-white">Saved Content</h1>
        <Separator className="my-6 border-[.2px] border-gray-800" />
        {savePostDatas?.map((savePostData: PostSavedProps, i: number) => (
          <LazyLoadedComponent key={i}>
            <SavedPostContent data={savePostData} />
          </LazyLoadedComponent>
        ))}
        {!savePostDatas && (
          <Separator className="my-6 border-[.2px] border-gray-800" />
        )}
      </div>
    </React.Fragment>
  );
};

export default PostSaved;
