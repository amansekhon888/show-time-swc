import { Link } from "react-router-dom";
import GoogleAuth from "../components/auth/google/google.component";
import FacebookComponent from "../components/auth/google/facebook.component";
import Divider from "../components/common/divider.component";
import SignupForm from "../components/auth/signup/signup.component";

const Signup = () => {
    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-xl text-white font-bold">
                    Join ShowTime
                </h2>
                <p className="text-xs text-white/60 dark:text-gray-400">
                    Create your cinema account in seconds
                </p>
            </div>

            <SignupForm />

            <Divider text="or sign up with" />

            <div className="grid grid-cols-2 gap-4">
                <GoogleAuth />
                <FacebookComponent />
            </div>

            <p className="text-xs text-center text-gray-300 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="font-semibold text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;
