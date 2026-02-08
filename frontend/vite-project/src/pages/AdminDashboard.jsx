import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminUserAPI, newsAPI } from '../utils/api';

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
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl text-text-dark font-bold mb-2">
                    Welcome back, {adminUser.username}! 👋
                </h1>
                <p className="text-text-dark/70">Manage your Kerala Samajam Vasai East website from here</p>
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-emerald-primary text-lg">Loading statistics...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-white rounded-xl p-6 shadow-sm-custom flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-primary to-emerald-dark flex items-center justify-center text-3xl">
                                👥
                            </div>
                            <div>
                                <h3 className="text-text-dark/70 text-base font-medium mb-1">Total Members</h3>
                                <p className="text-3xl font-bold gradient-text">{stats.totalUsers}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm-custom flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-primary to-gold-accent flex items-center justify-center text-3xl">
                                📰
                            </div>
                            <div>
                                <h3 className="text-text-dark/70 text-base font-medium mb-1">News Articles</h3>
                                <p className="text-3xl font-bold gradient-text">{stats.totalNews}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl text-text-dark font-semibold mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <Link to="/secured-admin2711/users" className="block bg-white rounded-xl p-6 text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-2 hover:shadow-md-custom group no-underline">
                                <span className="text-4xl block mb-4 transition-transform duration-300 group-hover:scale-110">➕</span>
                                <h3 className="text-lg text-text-dark font-semibold mb-2">Add New Member</h3>
                                <p className="text-text-dark/60 text-sm">Create a new member account</p>
                            </Link>

                            <Link to="/secured-admin2711/news" className="block bg-white rounded-xl p-6 text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-2 hover:shadow-md-custom group no-underline">
                                <span className="text-4xl block mb-4 transition-transform duration-300 group-hover:scale-110">✍️</span>
                                <h3 className="text-lg text-text-dark font-semibold mb-2">Create News Article</h3>
                                <p className="text-text-dark/60 text-sm">Publish a new news article</p>
                            </Link>

                            <Link to="/secured-admin2711/users" className="block bg-white rounded-xl p-6 text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-2 hover:shadow-md-custom group no-underline">
                                <span className="text-4xl block mb-4 transition-transform duration-300 group-hover:scale-110">📋</span>
                                <h3 className="text-lg text-text-dark font-semibold mb-2">Manage Members</h3>
                                <p className="text-text-dark/60 text-sm">View and edit member information</p>
                            </Link>

                            <Link to="/secured-admin2711/news" className="block bg-white rounded-xl p-6 text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-2 hover:shadow-md-custom group no-underline">
                                <span className="text-4xl block mb-4 transition-transform duration-300 group-hover:scale-110">📝</span>
                                <h3 className="text-lg text-text-dark font-semibold mb-2">Manage News</h3>
                                <p className="text-text-dark/60 text-sm">Edit or delete news articles</p>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
