import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminUserAPI, newsAPI } from '../utils/api';
import '../styles/admindashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalNews: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersResponse, newsResponse] = await Promise.all([
                    adminUserAPI.getAll(),
                    newsAPI.getAll()
                ]);

                setStats({
                    totalUsers: usersResponse.data.data?.length || 0,
                    totalNews: newsResponse.data.data?.length || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Welcome back, {adminUser.username}! 👋</h1>
                <p>Manage your Kerala Samajam Vasai East website from here</p>
            </div>

            {isLoading ? (
                <div className="dashboard-loading">Loading statistics...</div>
            ) : (
                <>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon users">👥</div>
                            <div className="stat-info">
                                <h3>Total Members</h3>
                                <p className="stat-number">{stats.totalUsers}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon news">📰</div>
                            <div className="stat-info">
                                <h3>News Articles</h3>
                                <p className="stat-number">{stats.totalNews}</p>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="actions-grid">
                            <Link to="/secured-admin2711/users" className="action-card">
                                <span className="action-icon">➕</span>
                                <h3>Add New Member</h3>
                                <p>Create a new member account</p>
                            </Link>

                            <Link to="/secured-admin2711/news" className="action-card">
                                <span className="action-icon">✍️</span>
                                <h3>Create News Article</h3>
                                <p>Publish a new news article</p>
                            </Link>

                            <Link to="/secured-admin2711/users" className="action-card">
                                <span className="action-icon">📋</span>
                                <h3>Manage Members</h3>
                                <p>View and edit member information</p>
                            </Link>

                            <Link to="/secured-admin2711/news" className="action-card">
                                <span className="action-icon">📝</span>
                                <h3>Manage News</h3>
                                <p>Edit or delete news articles</p>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
