import {  Routes, Route } from "react-router";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import { UserProvider } from "./context/userContext";
import { SocketProvider } from "./context/socketContext";
import RouteProtection from "./components/RouteProtection";
import { lazy, Suspense } from "react";

const ErrorPage = lazy(() => import('./pages/404Page'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ChangePassPage = lazy(() => import('./pages/ProfilePage/ChangePassPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPassPage'));
const NewPassPage = lazy(() => import('./pages/auth/ForgotPassPage/NewPassPage'));
const PrivateChatPage = lazy(() => import('./pages/ProfilePage'));

function App() {
  return (
    <UserProvider>
        <Suspense fallback={<div>Loading Page....</div>}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgotPassword" element={<ForgotPasswordPage />} />
              <Route element={<RouteProtection />}>
                <Route path="newPassword" element={<NewPassPage />} />
              </Route>
            </Route>
            <Route element={<RouteProtection />}>
              <Route index element={
                <SocketProvider>
                <HomePage />
                </SocketProvider>
                } />
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
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
        </Suspense>
    </UserProvider>
  );
}

export default App;
