import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            <div className="min-h-screen py-8 px-[5%] md:px-[4%] bg-cream-white">
                <div className="text-center mb-12 py-8">
                    <h1 className="text-4xl md:text-5xl gradient-text mb-2">{t('news.title')}</h1>
                    <p className="text-text-dark/80 text-lg">{t('news.loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen py-8 px-[5%] md:px-[4%] bg-cream-white">
                <div className="text-center mb-12 py-8">
                    <h1 className="text-4xl md:text-5xl gradient-text mb-2">{t('news.title')}</h1>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-[5%] md:px-[4%] bg-cream-white">
            <div className="text-center mb-12 py-8">
                <h1 className="text-4xl md:text-5xl gradient-text mb-2">{t('news.title')}</h1>
                <p className="text-text-dark/80 text-lg">{t('news.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
                {newsData.length === 0 ? (
                    <p className="text-center col-span-full py-12 text-gray-500">
                        {t('news.noNews')}
                    </p>
                ) : (
                    newsData.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm-custom transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-lg-custom"
                        >
                            {article.image_url && (
                                <div
                                    className="w-full h-[180px] md:h-[220px] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${article.image_url})` }}
                                ></div>
                            )}
                            <div className="p-6">
                                <span className="inline-block text-emerald-primary text-sm font-medium mb-2">
                                    {formatDate(article.date)}
                                </span>
                                <h2 className="text-lg md:text-xl text-text-dark mb-3 leading-snug font-semibold">
                                    {article.title}
                                </h2>
                                <p className="text-text-dark/70 leading-relaxed mb-4 text-sm md:text-base">
                                    {article.excerpt}
                                </p>
                                <button
                                    className="bg-transparent border-none text-gold-accent font-semibold cursor-pointer text-sm md:text-base transition-all duration-300 p-0 hover:text-emerald-primary hover:translate-x-1"
                                    onClick={() => handleReadMore(article.id)}
                                >
                                    {t('news.readMore')} →
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
