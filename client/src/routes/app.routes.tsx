// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "../components/auth/layout.component";
import Login from "../pages/login.page";
import Signup from "../pages/signup.page";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Auth Routes */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;