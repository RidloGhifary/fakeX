import { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UseAppContext } from "./context/AppContext";

const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ConfirmEmail = lazy(() => import("./pages/ConfirmEmail"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search"));
const PostSaved = lazy(() => import("./pages/PostSaved"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

export default function App() {
  const { isLoggedIn, currentUser } = UseAppContext();

  return (
    <main className=" min-h-dvh bg-black text-white">
      <div className="mx-auto max-w-[1100px]">
        <Router>
          <Routes>
            <Route
              path="/sign-in"
              element={isLoggedIn ? <Navigate to="/" /> : <SignIn />}
            />
            <Route
              path="/sign-up"
              element={
                isLoggedIn && currentUser?.verified ? (
                  <Navigate to="/" />
                ) : (
                  <SignUp />
                )
              }
            />
            <Route path="/verify-otp/:userId" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ConfirmEmail />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:username/post-saved" element={<PostSaved />} />
              <Route path="/byfollowing" element={<Home />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/:username/post/:postId" element={<PostDetail />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}
