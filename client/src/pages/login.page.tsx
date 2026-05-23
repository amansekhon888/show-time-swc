import GoogleAuth from "../components/auth/google/google.component";
import FacebookComponent from "../components/auth/google/facebook.component";
import Divider from "../components/common/divider.component";
import LoginForm from "../components/auth/login/login.component";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-xl font-bold text-white">Welcome Back</h2>
                <p className="text-xs text-white/60">
                    Continue your cinema journey
                </p>
            </div>

            <LoginForm />

            <Divider text="or continue with" />

            <div className="grid grid-cols-2 gap-4">
                <GoogleAuth />
                <FacebookComponent />
            </div>

            <p className="text-xs text-center text-gray-300 dark:text-gray-400">
                New to ShowTime?{" "}
                <Link
                    to="/auth/signup"
                    className="font-semibold text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
};

export default Login;
