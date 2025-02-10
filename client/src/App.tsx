import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ErrorPage from "./pages/404Page";
import HomePage from "./pages/HomePage";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./context/userContext";


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
            </Route>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
