import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/secured-admin2711/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.login({ username, password });

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
                navigate('/secured-admin2711/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-white via-cream-soft to-emerald-primary/10 flex items-center justify-center p-4">
            <div className="w-full max-w-[420px]">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg-custom border border-gold-primary/20">
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-4 animate-pulse-scale inline-block">🔒</div>
                        <h1 className="text-2xl md:text-3xl text-text-dark font-bold mb-2 font-poppins">Admin Portal</h1>
                        <p className="text-text-dark/60">Secure Access Only</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="mb-5">
                            <label htmlFor="username" className="block text-text-dark font-semibold mb-2 text-sm">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter admin username"
                                required
                                autoComplete="username"
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-emerald-primary focus:bg-white focus:ring-2 focus:ring-emerald-primary/20"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-text-dark font-semibold mb-2 text-sm">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                autoComplete="current-password"
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-emerald-primary focus:bg-white focus:ring-2 focus:ring-emerald-primary/20"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-emerald-primary to-emerald-dark text-white font-bold rounded-lg text-lg transition-all duration-300 hover:shadow-lg-custom hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-text-dark/40 text-sm">Protected Area - Authorized Personnel Only</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
