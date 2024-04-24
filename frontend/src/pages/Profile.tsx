import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ProfileComp from "@/components/profile/ProfileComp";
import React from "react";

const Profile = () => {
  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <ProfileComp />
    </React.Fragment>
  );
};

export default Profile;
