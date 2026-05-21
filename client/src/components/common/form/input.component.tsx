import React from "react";

interface InputFieldProps {
    label: string;
    icon?: React.ReactNode;
    type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
    placeholder?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    touched?: boolean;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    [key: string]: any; // Allow additional props
}

export const InputField = (props: InputFieldProps) => {
    const { label, icon, name, type, placeholder, error, required, ...rest } = props;
    return (
        <div className={`w-full`}>
            {label && <label className="block text-xs text-white/80 dark:text-gray-300 mb-1">{label} {required && <span>*</span>}</label>}
            <div className="relative">
                {icon && <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/80 dark:text-gray-300">
                   {icon}</div>}
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    disabled={props.disabled}
                    className={`w-full px-2 py-2 text-sm rounded-md
                        bg-white/20 dark:bg-slate-800
                        border border-gray-200 dark:border-slate-700
                        text-gray-100 dark:text-gray-100
                        placeholder-gray-300 dark:placeholder-gray-400
                        transition-all duration-300 ease-out
                        focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 dark:focus:ring-red-500/30
                        hover:border-gray-300 dark:hover:border-slate-600
                        disabled:bg-gray-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed
                        ${icon ? "pl-10" : ""}
                        ${error ? "border-red-500 dark:border-red-500" : ""}
                    `}
                    {...rest}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    )
}