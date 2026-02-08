import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            <div className="min-h-screen py-8 bg-cream-white">
                <div className="text-center py-16 text-emerald-primary text-xl">Loading article...</div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen py-8 bg-cream-white">
                <div className="text-center py-16 px-8">
                    <h2 className="text-3xl text-text-dark mb-4">Article Not Found</h2>
                    <p className="text-gray-500 text-lg mb-8">{error || 'The article you are looking for does not exist.'}</p>
                    <button
                        onClick={() => navigate('/news')}
                        className="inline-flex items-center gap-2 py-3 px-6 bg-white text-emerald-primary border-2 border-emerald-primary rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-emerald-primary hover:text-white hover:-translate-x-1"
                    >
                        ← Back to News
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 bg-cream-white">
            <div className="max-w-[900px] mx-auto px-4 md:px-8">
                <button
                    onClick={() => navigate('/news')}
                    className="inline-flex items-center gap-2 py-3 px-6 bg-white text-emerald-primary border-2 border-emerald-primary rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 mb-8 hover:bg-emerald-primary hover:text-white hover:-translate-x-1"
                >
                    ← Back to News
                </button>

                <article className="bg-white rounded-2xl overflow-hidden shadow-md-custom animate-fade-in">
                    {article.image_url && (
                        <div
                            className="w-full h-[250px] md:h-[400px] bg-cover bg-center bg-gray-100"
                            style={{ backgroundImage: `url(${article.image_url})` }}
                        />
                    )}

                    <div className="p-6 md:p-12">
                        <span className="inline-block py-2 px-4 bg-gradient-to-br from-emerald-subtle to-emerald-light text-emerald-dark rounded-full text-sm font-semibold mb-6">
                            {formatDate(article.date)}
                        </span>
                        <h1 className="text-2xl md:text-4xl text-text-dark leading-tight mb-6">{article.title}</h1>

                        <div className="text-lg md:text-xl text-gray-600 leading-relaxed p-4 md:p-6 bg-cream-soft border-l-4 border-gold-primary rounded-xl mb-8">
                            {article.excerpt}
                        </div>

                        <div className="text-base md:text-lg leading-loose text-text-dark">
                            {article.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && <p key={index} className="mb-6 last:mb-0">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NewsDetail;
