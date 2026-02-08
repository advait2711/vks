import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AdminLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            navigate('/secured-admin2711');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-white via-cream-soft to-emerald-primary/10 flex flex-col">
            {/* Navbar */}
            <header className="bg-gradient-to-r from-emerald-primary to-emerald-dark shadow-md-custom sticky top-0 z-[100] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold font-poppins text-white tracking-tight">VKS Admin</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink
                                to="/secured-admin2711/dashboard"
                                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/secured-admin2711/users"
                                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                User Management
                            </NavLink>
                            <NavLink
                                to="/secured-admin2711/news"
                                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                            >
                                News Management
                            </NavLink>
                        </div>

                        {/* Desktop Profile & Logout */}
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-primary text-xs shadow-sm">
                                    👤
                                </div>
                                <span className="text-sm font-semibold text-white">{adminUser.username}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-white/90 hover:text-white font-medium text-sm transition-colors border border-white/20 hover:border-white/40 hover:bg-white/10 px-3 py-1.5 rounded-lg"
                                title="Logout"
                            >
                                Logout 🚪
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition-colors"
                            >
                                <span className="sr-only">Open main menu</span>
                                <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down shadow-lg-custom">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink
                                to="/secured-admin2711/dashboard"
                                onClick={closeMenu}
                                className={({ isActive }) => `block px-3 py-3 rounded-lg text-base font-medium ${isActive ? 'bg-emerald-primary/10 text-emerald-primary' : 'text-text-dark/70 hover:bg-gray-50 hover:text-text-dark'}`}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/secured-admin2711/users"
                                onClick={closeMenu}
                                className={({ isActive }) => `block px-3 py-3 rounded-lg text-base font-medium ${isActive ? 'bg-emerald-primary/10 text-emerald-primary' : 'text-text-dark/70 hover:bg-gray-50 hover:text-text-dark'}`}
                            >
                                User Management
                            </NavLink>
                            <NavLink
                                to="/secured-admin2711/news"
                                onClick={closeMenu}
                                className={({ isActive }) => `block px-3 py-3 rounded-lg text-base font-medium ${isActive ? 'bg-emerald-primary/10 text-emerald-primary' : 'text-text-dark/70 hover:bg-gray-50 hover:text-text-dark'}`}
                            >
                                News Management
                            </NavLink>
                        </div>
                        <div className="pt-4 pb-4 border-t border-gray-100">
                            <div className="flex items-center px-5 mb-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-primary to-emerald-primary flex items-center justify-center text-white text-lg shadow-sm">
                                        👤
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-text-dark">{adminUser.username}</div>
                                    <div className="text-sm font-medium leading-none text-text-dark/50 mt-1">{adminUser.role || 'Admin'}</div>
                                </div>
                            </div>
                            <div className="px-2 space-y-1">
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMenu();
                                    }}
                                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
