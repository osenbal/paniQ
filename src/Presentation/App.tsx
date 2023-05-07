import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "./Components/Spinner";
import "./App.css";

import { AuthMiddleware } from "./Middleware/auth.middleware";

const Todos = lazy(() => import("./Pages/Todos/TodoListView"));
const Login = lazy(() => import("./Pages/Login/LoginView"));
const Index = lazy(() => import("./Pages/index"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<AuthMiddleware />}>
            <Route path="/" element={<Index />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
