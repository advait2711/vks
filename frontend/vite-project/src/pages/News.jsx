import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/news.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${API_URL}/news`);
                setNewsData(response.data.data || []);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news articles');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleReadMore = (id) => {
        navigate(`/news/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (isLoading) {
        return (
            <div className="news-page">
                <div className="news-header">
                    <h1>Latest News & Updates</h1>
                    <p>Loading news articles...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="news-page">
                <div className="news-header">
                    <h1>Latest News & Updates</h1>
                    <p style={{ color: '#c33' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="news-page">
            <div className="news-header">
                <h1>Latest News & Updates</h1>
                <p>Stay informed about Kerala Samajam Vasai East events, celebrations, and community news</p>
            </div>

            <div className="news-grid">
                {newsData.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#6b7280' }}>
                        No news articles available at the moment.
                    </p>
                ) : (
                    newsData.map((article) => (
                        <article key={article.id} className="news-card">
                            {article.image_url && (
                                <div className="news-image" style={{ backgroundImage: `url(${article.image_url})` }}></div>
                            )}
                            <div className="news-content">
                                <span className="news-date">{formatDate(article.date)}</span>
                                <h2>{article.title}</h2>
                                <p>{article.excerpt}</p>
                                <button
                                    className="read-more"
                                    onClick={() => handleReadMore(article.id)}
                                >
                                    Read More →
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default News;

