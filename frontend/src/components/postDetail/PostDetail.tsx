import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UseGetPostDetail } from "@/api/PostApi";

const Content = React.lazy(() => import("./Content"));
const CommentSection = React.lazy(() => import("./CommentSection"));

const Post = () => {
  const { postId } = useParams();

  const { data: postDetail, isLoading: postDetailIsLoading } = useQuery({
    queryKey: ["post-detail", postId],
    queryFn: () => UseGetPostDetail(postId as string),
  });

  if (postDetailIsLoading) return <p className="text-center">Loading...</p>;
  return (
    <div className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      {!postDetail ? (
        <p className="text-center text-rose-500">Cannot find post</p>
      ) : (
        <React.Suspense fallback={<p className="text-center">Loading...</p>}>
          <Content data={postDetail} dataIsLoading={postDetailIsLoading} />
          <CommentSection
            data={postDetail}
            dataIsLoading={postDetailIsLoading}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default Post;
