import React from "react";
import { useParams } from "react-router-dom";
import { makeRequest } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const Content = React.lazy(() => import("./Content"));
const CommentSection = React.lazy(() => import("./CommentSection"));

const Post = () => {
  const { postId } = useParams();

  const { data: postDetail, isLoading: postDetailIsLoading } = useQuery({
    queryKey: ["post-detail", postId],
    queryFn: async () => {
      const response = await makeRequest.get(`/post/byId/${postId}`);
      return response.data;
    },
  });

  if (postDetailIsLoading) return <p>Loading...</p>;
  return (
    <div className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <React.Suspense fallback={<p>Loading...</p>}>
        <Content data={postDetail} dataIsLoading={postDetailIsLoading} />
        <CommentSection data={postDetail} dataIsLoading={postDetailIsLoading} />
      </React.Suspense>
    </div>
  );
};

export default Post;
