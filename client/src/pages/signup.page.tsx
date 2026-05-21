import { useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../components/common/form/input.component";
import ButtonComponent from "../components/common/button/button.component";
import GoogleAuth from "../components/auth/google/google.component";
import FacebookComponent from "../components/auth/google/facebook.component";
import Divider from "../components/common/divider.component";

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Name must be at least 3 characters";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain uppercase, lowercase, and number";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!agreedToTerms) {
            newErrors.general = "You must agree to terms and conditions";
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
            const { confirmPassword, ...signupData } = formData;
            console.log("Signup attempt:", signupData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Success handling
            console.log("Signup successful!");
            // Redirect or update app state here
        } catch (error) {
            setErrors({
                general: "Failed to create account. Please try again.",
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
                    Join ShowTime
                </h2>
                <p className="text-xs text-white/60 dark:text-gray-400">
                    Create your cinema account in seconds
                </p>
            </div>

            {/* Error Alert */}
            {errors.general && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-sm font-medium">
                    {errors.general}
                </div>
            )}

            {/* Full Name Input */}
            <InputField
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                }
                disabled={isLoading}
            />

            {/* Email Input */}
            <InputField
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
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
                helperText="Min. 8 characters with uppercase, lowercase, and number"
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

            {/* Confirm Password Input */}
            <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
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
                            d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                }
                disabled={isLoading}
            />

            {/* Terms Agreement */}
            <label className="flex items-center gap-3 cursor-pointer group">
                <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        if (errors.general) {
                            setErrors((prev) => ({
                                ...prev,
                                general: undefined,
                            }));
                        }
                    }}
                    className="w-3 h-3 rounded accent-red-600 cursor-pointer flex-shrink-0"
                    disabled={isLoading}
                />
                <span className="text-xs text-gray-300 group-hover:text-gray-900 transition-colors leading-relaxed">
                    I agree to ShowTime's{" "}
                    <Link to="#" className="text-red-500 hover:underline">
                        Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link to="#" className="text-red-500 hover:underline">
                        Privacy Policy
                    </Link>
                </span>
            </label>

            {/* Sign Up Button */}
            <ButtonComponent
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                text="Create Account"
                loadingText="Creating Account..."
                disabled={isLoading}
                className="w-full"
            />

            {/* Divider */}
            <Divider text="or sign up with" />

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <GoogleAuth />
                <FacebookComponent />
            </div>

            {/* Login Link */}
            <p className="text-xs text-center text-gray-300 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="font-semibold text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    Login
                </Link>
            </p>
        </form>
    );
};

export default Signup;
