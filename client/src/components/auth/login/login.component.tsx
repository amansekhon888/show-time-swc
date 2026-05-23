import { InputField } from '../../common/form/input.component'
import { useLoginForm } from '../../../hooks/useLoginForm'
import { Link } from 'react-router-dom';
import ButtonComponent from '../../common/button/button.component';

const LoginForm = () => {
    const { formData, errors, isLoading, rememberMe, setRememberMe, handleChange, handleSubmit } = useLoginForm();
    console.log(isLoading);
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
                <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-sm font-medium">
                    {errors.general}
                </div>
            )}

            <InputField
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
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

            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
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

            <ButtonComponent
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                disabled={isLoading}
                text="Login to ShowTime"
                className="w-full"
            />
        </form>
    )
}

export default LoginForm