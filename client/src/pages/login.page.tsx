import { useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../components/common/form/input.component";
import ButtonComponent from "../components/common/button/button.component";
import GoogleAuth from "../components/auth/google/google.component";
import FacebookComponent from "../components/auth/google/facebook.component";
import Divider from "../components/common/divider.component";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            console.log("Login attempt:", { ...formData, rememberMe });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Success handling
            console.log("Login successful!");
            // Redirect or update app state here
        } catch (error) {
            setErrors({
                general: "Failed to login. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-xl text-white font-bold">
                    Welcome Back
                </h2>
                <p className="text-xs text-white/60 dark:text-gray-400">
                    Continue your cinema journey
                </p>
            </div>

            {/* Error Alert */}
            {errors.general && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-sm font-medium">
                    {errors.general}
                </div>
            )}

            {/* Email Input */}
            <InputField
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                icon={
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                }
                disabled={isLoading}
            />

            {/* Password Input */}
            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                icon={
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                }
                disabled={isLoading}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3 h-3 rounded accent-red-600 cursor-pointer"
                        disabled={isLoading}
                    />
                    <span className="!text-xs text-gray-300 group-hover:text-gray-400 dark:group-hover:text-gray-100 transition-colors">
                        Remember me
                    </span>
                </label>

                <Link
                    to="#"
                    className="text-xs text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold transition-colors"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Login Button */}
            <ButtonComponent
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                disabled={isLoading}
                text="Login to ShowTime"
                className="w-full"
            />
            <Divider text="or continue with" />

            <div className="grid grid-cols-2 gap-4">
                <GoogleAuth />
                <FacebookComponent />
            </div>

            {/* Sign Up Link */}
            <p className="text-xs text-center text-gray-300 dark:text-gray-400">
                New to ShowTime?{" "}
                <Link
                    to="/auth/signup"
                    className="font-semibold text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    Create Account
                </Link>
            </p>
        </form>
    );
};

export default Login;
