import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Zap } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        await new Promise(r => setTimeout(r, 600)); // simulate async

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            setError("No account found. Please sign up first.");
            setLoading(false);
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {
            navigate("/");
        } else {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    const features = [
        "Smart relationship tracking",
        "Automated follow-up reminders",
        "Advanced analytics & insights",
        "Seamless contact management",
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 flex-col justify-between p-12 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Zap size={20} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">ContactPro</span>
                </div>

                {/* Hero Text */}
                <div className="relative space-y-6">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Build stronger<br />relationships,<br />effortlessly.
                    </h2>
                    <p className="text-indigo-200 text-lg leading-relaxed max-w-sm">
                        The smart CRM that helps you stay connected with the people who matter most.
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                        {features.map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-indigo-100">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-sm">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom quote */}
                <div className="relative">
                    <p className="text-indigo-200 text-sm italic">
                        "ContactPro transformed how we manage our client relationships."
                    </p>
                    <p className="text-white text-sm font-medium mt-1">— Product Team</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-gray-950">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Contact<span className="text-indigo-600">Pro</span></span>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card p-8 border border-gray-100 dark:border-gray-800">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Sign in to your ContactPro account</p>
                        </div>

                        {error && (
                            <div className="mb-5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="input-field pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <Link to="/forgot-password" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="input-field pl-10 pr-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary justify-center py-2.5 mt-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : null}
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                        </form>

                        <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}