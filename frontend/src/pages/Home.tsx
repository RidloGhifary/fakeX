import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import TimeLine from "@/components/home/TimeLine";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <TimeLine />
    </React.Fragment>
  );
};

export default Home;
