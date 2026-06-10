import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Articles from "../pages/articles/Articles";
import Ceodesk from "../pages/ceodesk/Ceodesk";
import Pressrelease from "../pages/pressrelease/Pressrelease";
import PressReleaseForm from "../pages/pressrelease/PressReleaseForm";
import PressReleaseList from "../pages/pressrelease/PressReleaseList";
import PressReleaseView from "../pages/pressrelease/PressReleaseView";
import Users from "../pages/users/Users";
import Settings from "../pages/settings/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes with Common Layout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/ceodesk" element={<Ceodesk />} />
          <Route path="/pressrelease" element={<Pressrelease />} />
          <Route path="/pressrelease/add" element={<PressReleaseForm />} />
          <Route path="/pressrelease/list" element={<PressReleaseList />} />
          <Route path="/pressrelease/edit/:id" element={<PressReleaseForm />} />
          <Route path="/pressrelease/view/:id" element={<PressReleaseView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}