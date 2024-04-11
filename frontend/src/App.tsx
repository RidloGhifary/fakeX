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

export default function App() {
  return (
    <main className="bg-black text-white min-h-dvh">
      <div className="max-w-[1100px] mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<h1>hallo world</h1>} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password/:userId" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ConfirmEmail />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}
