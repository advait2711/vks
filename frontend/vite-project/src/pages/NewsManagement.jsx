import { useState, useEffect } from 'react';
import { newsAPI } from '../utils/api';
import '../styles/newsmanagement.css';

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
        <div className="news-management">
            <div className="page-header">
                <div>
                    <h1>News Management</h1>
                    <p>Create and manage news articles</p>
                </div>
                <button onClick={openCreateModal} className="btn-primary">
                    ➕ Add News Article
                </button>
            </div>

            {success && (
                <div className="alert alert-success">
                    {success}
                    <button onClick={() => setSuccess('')}>✕</button>
                </div>
            )}

            {error && !showModal && (
                <div className="alert alert-error">
                    {error}
                    <button onClick={() => setError('')}>✕</button>
                </div>
            )}

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="loading">Loading news articles...</div>
            ) : (
                <div className="news-grid">
                    {filteredNews.length === 0 ? (
                        <div className="no-data">No news articles found</div>
                    ) : (
                        filteredNews.map(news => (
                            <div key={news.id} className="news-item">
                                {news.image_url && (
                                    <div
                                        className="news-item-image"
                                        style={{ backgroundImage: `url(${news.image_url})` }}
                                    />
                                )}
                                <div className="news-item-content">
                                    <span className="news-item-date">{formatDate(news.date)}</span>
                                    <h3>{news.title}</h3>
                                    <p className="news-item-excerpt">{news.excerpt}</p>
                                    <div className="news-item-actions">
                                        <button
                                            onClick={() => handleEdit(news)}
                                            className="btn-edit"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(news.id, news.title)}
                                            className="btn-delete"
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
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingNews ? 'Edit News Article' : 'Create News Article'}</h2>
                            <button onClick={closeModal} className="modal-close">✕</button>
                        </div>

                        {error && (
                            <div className="alert alert-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="news-form">
                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter news title"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                    />
                                    {editingNews && editingNews.image_url && (
                                        <small style={{ display: 'block', marginTop: '0.5rem', color: '#6b7280' }}>
                                            Current image exists. Upload new to replace.
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Excerpt *</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    placeholder="Brief summary of the article (shown in news list)"
                                />
                            </div>

                            <div className="form-group">
                                <label>Full Content *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                    rows="10"
                                    placeholder="Full article content (shown on detail page)"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={closeModal} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
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
