import { useState, useEffect } from 'react';
import { newsAPI } from '../utils/api';

const NewsManagement = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        excerpt: '',
        content: '',
        image: null
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await newsAPI.getAll();
            setNewsArticles(response.data.data || []);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to fetch news articles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const submitFormData = new FormData();
            submitFormData.append('title', formData.title);
            submitFormData.append('date', formData.date);
            submitFormData.append('excerpt', formData.excerpt);
            submitFormData.append('content', formData.content);

            if (formData.image instanceof File) {
                submitFormData.append('image', formData.image);
            }

            if (editingNews) {
                await newsAPI.update(editingNews.id, submitFormData);
                setSuccess('News article updated successfully!');
            } else {
                await newsAPI.create(submitFormData);
                setSuccess('News article created successfully!');
            }

            fetchNews();
            closeModal();
        } catch (error) {
            setError(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (news) => {
        setEditingNews(news);
        setFormData({
            title: news.title || '',
            date: news.date || '',
            excerpt: news.excerpt || '',
            content: news.content || '',
            image: null
        });
        setShowModal(true);
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        try {
            await newsAPI.delete(id);
            setSuccess('News article deleted successfully!');
            fetchNews();
        } catch (error) {
            setError(error.response?.data?.message || 'Delete failed');
        }
    };

    const openCreateModal = () => {
        setEditingNews(null);
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            excerpt: '',
            content: '',
            image: null
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNews(null);
        setError('');
    };

    const filteredNews = newsArticles.filter(news =>
        news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl text-text-dark font-bold mb-1">News Management</h1>
                    <p className="text-text-dark/70">Create and manage news articles</p>
                </div>
                <button onClick={openCreateModal} className="btn-primary whitespace-nowrap">
                    ➕ Add News Article
                </button>
            </div>

            {success && (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                    {success}
                    <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700 text-xl">✕</button>
                </div>
            )}

            {error && !showModal && (
                <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                    <button onClick={() => setError('')} className="text-red-500 hover:text-red-700 text-xl">✕</button>
                </div>
            )}

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary transition-all"
                />
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-emerald-primary text-lg">Loading news articles...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredNews.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-text-dark/60">No news articles found</div>
                    ) : (
                        filteredNews.map(news => (
                            <div key={news.id} className="bg-white rounded-xl shadow-sm-custom overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                                {news.image_url && (
                                    <div
                                        className="h-48 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${news.image_url})` }}
                                    />
                                )}
                                <div className="p-5">
                                    <span className="text-sm text-gold-accent font-medium">{formatDate(news.date)}</span>
                                    <h3 className="text-lg text-text-dark font-semibold mt-2 mb-3 line-clamp-2">{news.title}</h3>
                                    <p className="text-text-dark/70 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(news)}
                                            className="flex-1 py-2 px-3 bg-emerald-primary/10 text-emerald-primary rounded-lg font-medium text-sm hover:bg-emerald-primary hover:text-white transition-all"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(news.id, news.title)}
                                            className="flex-1 py-2 px-3 bg-red-50 text-red-500 rounded-lg font-medium text-sm hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-text-dark">{editingNews ? 'Edit News Article' : 'Create News Article'}</h2>
                            <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all">✕</button>
                        </div>

                        {error && (
                            <div className="mx-5 mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="p-5">
                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2 text-sm">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter news title"
                                    className="input-field"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="input-field text-sm"
                                    />
                                    {editingNews && editingNews.image_url && (
                                        <small className="block mt-2 text-text-dark/60">
                                            Current image exists. Upload new to replace.
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2 text-sm">Excerpt *</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    placeholder="Brief summary of the article (shown in news list)"
                                    className="input-field resize-none"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-text-dark font-semibold mb-2 text-sm">Full Content *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                    rows="10"
                                    placeholder="Full article content (shown on detail page)"
                                    className="input-field resize-none"
                                />
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                <button type="button" onClick={closeModal} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    {editingNews ? 'Update Article' : 'Create Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManagement;
