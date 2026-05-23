// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../components/auth/layout.component";
import Login from "../pages/login.page";
import Signup from "../pages/signup.page";
import Home from "../pages/home.page";
import Dashboard from "../pages/dashboard.page";
import Search from "../pages/search.page";
import Showtime from "../pages/showtime.page";
import OwnerPage from "../pages/owner.page";
import AdminPage from "../pages/admin.page";
import SupportPage from "../pages/support.page";
import NotFoundPage from "../pages/not-found.page";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/showtime/:id"
                    element={
                        <ProtectedRoute>
                            <Showtime />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/owner"
                    element={
                        <ProtectedRoute role="owner">
                            <OwnerPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/support"
                    element={
                        <ProtectedRoute>
                            <SupportPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;