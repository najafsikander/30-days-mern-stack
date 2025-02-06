import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ErrorPage from "./pages/404Page";
import HomePage from "./pages/HomePage";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="auth">
            <Route path="login" element={<LoginPage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
