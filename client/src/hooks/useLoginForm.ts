import { useState, type ChangeEvent, type FormEvent } from "react"

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export const useLoginForm = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "", password: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 5) {
            newErrors.password = "Minimum 6 characters are required"
        }
        // TODO: Implement further validations of uppercase, lowercase, special characters, etc.

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;
        setIsLoading(true);

        try {
            await new Promise((res) => setTimeout(res, 2000));
            console.log("Login success", { ...formData, rememberMe });
        } catch { setErrors({ general: "Login failed" })}
        finally { setIsLoading(false) }
    }

    return {
        formData, errors, isLoading, rememberMe, setRememberMe, handleChange, handleSubmit
    }
}
