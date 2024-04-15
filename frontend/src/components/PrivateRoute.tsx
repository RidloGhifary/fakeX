import { UseAppContext } from "@/context/AppContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { isLoggedIn, currentUser } = UseAppContext();

  return isLoggedIn && currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
