import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ErrorPage from "./pages/404Page";
import HomePage from "./pages/HomePage";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./context/userContext";
import ChangePassPage from "./pages/ProfilePage/ChangePassPage";
import ForgotPasswordPage from "./pages/auth/ForgotPassPage";
import NewPassPage from "./pages/auth/ForgotPassPage/NewPassPage";
import PrivateChatPage from "./pages/chat/private";
import { SocketProvider } from "./context/socketContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="newPassword" element={<NewPassPage />} />
            </Route>
            <Route path="chat">
              <Route
                path="private"
                element={
                  <SocketProvider>
                    <PrivateChatPage />
                  </SocketProvider>
                }
              />
            </Route>
            <Route path="profile">
              <Route index element={<ProfilePage />} />
              <Route path="changePass" element={<ChangePassPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
