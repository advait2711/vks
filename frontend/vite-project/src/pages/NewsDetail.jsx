import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/newsdetail.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${API_URL}/news/${id}`);
                setArticle(response.data.data);
            } catch (err) {
                console.error('Error fetching article:', err);
                setError('Failed to load article');
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="news-detail-page">
                <div className="news-detail-loading">Loading article...</div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="news-detail-page">
                <div className="news-detail-error">
                    <h2>Article Not Found</h2>
                    <p>{error || 'The article you are looking for does not exist.'}</p>
                    <button onClick={() => navigate('/news')} className="back-btn">
                        ← Back to News
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="news-detail-page">
            <div className="news-detail-container">
                <button onClick={() => navigate('/news')} className="back-btn">
                    ← Back to News
                </button>

                <article className="news-detail-article">
                    {article.image_url && (
                        <div
                            className="news-detail-image"
                            style={{ backgroundImage: `url(${article.image_url})` }}
                        />
                    )}

                    <div className="news-detail-content">
                        <span className="news-detail-date">{formatDate(article.date)}</span>
                        <h1>{article.title}</h1>

                        <div className="news-detail-excerpt">
                            {article.excerpt}
                        </div>

                        <div className="news-detail-body">
                            {article.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NewsDetail;
