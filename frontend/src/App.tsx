import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import ConfirmEmail from "./pages/ConfirmEmail";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <main className=" min-h-dvh bg-black text-white">
      <div className="mx-auto max-w-[1100px]">
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-otp/:userId" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ConfirmEmail />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
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
