import { UseAppContext } from "@/context/AppContext";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import React, { Suspense } from "react";

export default function PrivateRoute() {
  const { isLoggedIn } = UseAppContext();

  return isLoggedIn ? (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </React.Fragment>
  ) : (
    <Navigate to="/sign-in" />
  );
}
