import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import Post from "@/components/postDetail/PostDetail";
import React from "react";

const PostDetail = () => {
  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <Post />
    </React.Fragment>
  );
};

export default PostDetail;
