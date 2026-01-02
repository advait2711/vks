import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authAPI } from '../utils/api';
import '../styles/adminlayout.css';

const AdminLayout = () => {
    // Start open on desktop (>1024px), closed on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        // Only close sidebar on mobile
        if (window.innerWidth <= 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="admin-layout">
            {/* Mobile Header with Hamburger */}
            <div className="admin-mobile-header">
                <button className="hamburger-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h2>VKS Admin</h2>
            </div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="admin-sidebar-header">
                    <h2>VKS Admin</h2>
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        {isSidebarOpen ? '✕' : '☰'}
                    </button>
                </div>

                <nav className="admin-nav">
                    <NavLink to="/secured-admin2711/dashboard" className="admin-nav-link" onClick={closeSidebar}>
                        <span className="nav-icon">📊</span>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>
                    <NavLink to="/secured-admin2711/users" className="admin-nav-link" onClick={closeSidebar}>
                        <span className="nav-icon">👥</span>
                        <span className="nav-text">User Management</span>
                    </NavLink>
                    <NavLink to="/secured-admin2711/news" className="admin-nav-link" onClick={closeSidebar}>
                        <span className="nav-icon">📰</span>
                        <span className="nav-text">News Management</span>
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user-info">
                        <div className="admin-avatar">👤</div>
                        <div className="admin-user-details">
                            <p className="admin-username">{adminUser.username}</p>
                            <p className="admin-role">{adminUser.role}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`admin-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && window.innerWidth <= 1024 && (
                <div className="sidebar-overlay" onClick={closeSidebar}></div>
            )}
        </div>
    );
};

export default AdminLayout;
