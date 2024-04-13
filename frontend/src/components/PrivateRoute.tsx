import { UseAppContext } from "@/context/AppContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { isLoggedIn } = UseAppContext();

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
