import Content from "./Content";
import PostComment from "./PostComment";

const Post = () => {
  return (
    <div className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <Content />
      <PostComment />
    </div>
  );
};

export default Post;
