import { useParams } from "react-router-dom";
import Content from "./Content";
import { makeRequest } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import CommentSection from "./CommentSection";

const Post = () => {
  const { postId } = useParams();

  const { data: postDetail, isLoading: postDetailIsLoading } = useQuery({
    queryKey: ["post-detail"],
    queryFn: async () => {
      const response = await makeRequest.get(`/post/${postId}`);
      return response.data;
    },
  });

  return (
    <div className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <Content data={postDetail} dataIsLoading={postDetailIsLoading} />
      <CommentSection data={postDetail} dataIsLoading={postDetailIsLoading} />
    </div>
  );
};

export default Post;
