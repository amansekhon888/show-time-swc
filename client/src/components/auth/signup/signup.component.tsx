import GoogleAuth from '../google/google.component';
import FacebookComponent from '../google/facebook.component';
import { Link } from 'react-router-dom';
import Divider from '../../common/divider.component';
import ButtonComponent from '../../common/button/button.component';
import { InputField } from '../../common/form/input.component';
import { useSignupForm } from '../../../hooks/useSignupForm';

const SignupForm = () => {
    const { formData, errors, isLoading, agreedToTerms, handleChange, handleSubmit } = useSignupForm();

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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                    onChange={handleChange}
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
    )
}

export default SignupForm