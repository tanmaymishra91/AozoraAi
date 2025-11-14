
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from '../components/Icon';

interface SignUpProps {
    onNavigateToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            await register(name, email, password);
            // On success, the main App component will see the user state change and redirect automatically.
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4 transition-colors duration-300">
            <div className="w-full max-w-md animate-fade-in motion-reduce:animate-none">
                <div className="text-center mb-8">
                    <img src="https://aozoradesu.com/wp-content/uploads/2025/09/Aozoranobg.svg" alt="AozoraAi Logo" className="mx-auto h-20 w-auto mb-4" />
                    <h2 className="text-2xl font-bold text-black dark:text-white">Create your Account</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Sign up to get 25 free daily credits.</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label htmlFor="name-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input id="name-signup" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input id="email-signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <div className="relative">
                                <input id="password-signup" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"><Icon name={showPassword ? 'eye-off' : 'eye'} className="h-5 w-5" /></button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                            <input id="confirm-password-signup" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md" required />
                        </div>
                        {error && <p className="text-red-500 dark:text-red-400 text-center mb-4 text-sm">{error}</p>}
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500">{isLoading ? <Icon name="spinner" className="h-5 w-5" /> : 'Create Account & Sign In'}</button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <button onClick={onNavigateToLogin} className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Sign In
                        </button>
                    </p>
                    <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
                        By signing up, you agree to our terms. Your data is kept private and secure.
                    </p>
                </div>
            </div>
             <style>{`
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
              }
            `}</style>
        </div>
    );
};

export default SignUp;