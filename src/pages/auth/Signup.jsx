import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Zap } from "lucide-react";

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        await new Promise(r => setTimeout(r, 600));

        const newUser = { name, email, phone, password };
        localStorage.setItem("user", JSON.stringify(newUser));

        setLoading(false);
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Zap size={20} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">ContactPro</span>
                </div>

                <div className="relative space-y-6">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Start managing<br />contacts the<br />smart way.
                    </h2>
                    <p className="text-indigo-200 text-lg leading-relaxed max-w-sm">
                        Join thousands of professionals using ContactPro to grow and maintain meaningful relationships.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                        <div className="flex -space-x-2">
                            {["A", "B", "C", "D"].map((l, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                    {l}
                                </div>
                            ))}
                        </div>
                        <p className="text-indigo-200 text-sm">
                            <span className="text-white font-semibold">2,000+</span> professionals trust ContactPro
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-indigo-200 text-sm italic">
                        "An essential tool for anyone serious about relationship management."
                    </p>
                    <p className="text-white text-sm font-medium mt-1">— Enterprise User</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-gray-950 overflow-y-auto">
                <div className="w-full max-w-md py-6">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Contact<span className="text-indigo-600">Pro</span></span>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card p-8 border border-gray-100 dark:border-gray-800">
                        <div className="mb-7">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Get started with ContactPro for free</p>
                        </div>

                        {error && (
                            <div className="mb-5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type="text" placeholder="John Doe" className="input-field pl-10"
                                        value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type="email" placeholder="you@example.com" className="input-field pl-10"
                                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type="tel" placeholder="+91 98765 43210" className="input-field pl-10"
                                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type={showPassword ? "text" : "password"} placeholder="Min. 6 characters"
                                        className="input-field pl-10 pr-10" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter password"
                                        className="input-field pl-10 pr-10" value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full btn-primary justify-center py-2.5 mt-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
                                {loading ? (
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : null}
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </form>

                        <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}