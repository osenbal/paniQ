import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./Layouts/DashboardLayout";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Spinner from "./Components/Spinner";

import { AuthMiddleware } from "./Middleware/auth.middleware";

import "./App.css";

const Login = lazy(() => import("./Pages/Login/LoginView"));
const Index = lazy(() => import("./Pages/index"));
const PageCamera = lazy(() => import("./Pages/Camera/PageCameraView"));
const PageNotification = lazy(
  () => import("./Pages/Notification/PageNotificationView")
);
const Post = lazy(() => import("./Pages/Post/_slug"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<AuthMiddleware />}>
            <Route element={<ProtectedLayout />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Index />} />
              </Route>

              <Route path="/camera" element={<PageCamera />} />
              <Route path="/notification" element={<PageNotification />} />
              <Route path="/post" element={<Post />} />
            </Route>
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
