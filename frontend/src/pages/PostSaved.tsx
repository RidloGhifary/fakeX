import React from "react";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { UseAppContext } from "@/context/AppContext";
import SavedPostContent from "@/components/SavedPostContent";
import { PostSavedProps } from "@/models/PostSaved";
import { Separator } from "@/components/ui/separator";

const PostSaved = () => {
  const { savePostDatas, savePostDatasLoading } = UseAppContext();

  if (savePostDatasLoading) return <p>Loading...</p>;
  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <div className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
        {savePostDatas?.map((savePostData: PostSavedProps, i: number) => (
          <div key={i}>
            <Separator className="my-6 border-[.2px] border-gray-800" />
            <SavedPostContent data={savePostData} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default PostSaved;
