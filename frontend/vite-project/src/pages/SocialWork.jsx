import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const SocialWork = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchSocialWorkPhotos = async () => {
            try {
                const response = await fetch(`${API_URL}/photos/social-work`);
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching social work photos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSocialWorkPhotos();
    }, []);

    const initiatives = photos.map((photo, index) => {
        if (index === 0) {
            return {
                ...photo,
                title: "Kerala Floods Relief Program",
                subtitle: "Supporting Flood-Affected Families",
                description: "In response to the devastating Kerala floods, Kerala Samajam Vasai East organized an extensive relief program to support affected families. Our community came together to provide essential supplies, food, clothing, and financial assistance to those who lost their homes and livelihoods.",
                details: "The relief efforts included distribution of emergency supplies, setting up temporary shelters, and coordinating with local authorities to ensure comprehensive support. Our members contributed generously, and the collective effort made a significant difference in helping families rebuild their lives during this difficult period.",
                date: "August 2018"
            };
        } else {
            return {
                ...photo,
                title: "Pahalgam Terror Attack Support",
                subtitle: "Standing with the Victims and Families",
                description: "Following the tragic Pahalgam terror attack, Kerala Samajam Vasai East extended heartfelt support to the victims and their families. Our community organized fundraising initiatives and provided financial assistance to help the affected families during their time of grief.",
                details: "The support program focused on providing immediate financial relief to the families of victims, coordinating with relief organizations, and raising awareness about the need for continued support.",
                date: "April 2025"
            };
        }
    });

    return (
        <div className="min-h-screen py-8 px-[4%] md:px-[5%] bg-cream-white">
            <div className="text-center mb-12 py-8">
                <h1 className="text-4xl md:text-5xl gradient-text mb-2 font-bold">{t('socialWork.title')}</h1>
                <p className="text-text-dark/80 text-lg">{t('socialWork.subtitle')}</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <div className="w-12 h-12 border-[5px] border-gray-200 border-t-emerald-primary rounded-full animate-spin"></div>
                    <p className="text-emerald-primary text-lg font-medium">{t('socialWork.loading')}</p>
                </div>
            ) : (
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12 bg-gradient-to-br from-emerald-primary/5 to-gold-primary/5 p-6 md:p-10 rounded-2xl">
                        <h2 className="text-2xl md:text-3xl text-emerald-dark mb-4 font-bold">{t('socialWork.ourInitiatives')}</h2>
                        <p className="text-text-dark/80 text-base md:text-lg leading-relaxed max-w-[800px] mx-auto">
                            {t('socialWork.initiativesDesc')}
                        </p>
                    </div>

                    <div className="flex flex-col gap-12 md:gap-16">
                        {initiatives.map((initiative, index) => (
                            <div
                                key={initiative.id}
                                className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-md-custom overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg-custom"
                            >
                                <div className="lg:w-[45%] min-h-[300px] md:min-h-[400px] relative overflow-hidden group">
                                    <img
                                        src={initiative.photo_url}
                                        alt={initiative.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                                        <span className="bg-gold-primary text-text-dark py-2 px-4 rounded-full font-semibold text-sm">{initiative.date}</span>
                                    </div>
                                </div>
                                <div className="lg:w-[55%] p-6 md:p-10 flex flex-col justify-center">
                                    <div className="mb-4">
                                        <h3 className="text-2xl md:text-3xl text-emerald-dark mb-2 font-bold">{initiative.title}</h3>
                                        <p className="text-gold-accent text-base md:text-lg font-semibold">{initiative.subtitle}</p>
                                    </div>
                                    <div>
                                        <p className="text-text-dark leading-relaxed mb-4 text-sm md:text-base">{initiative.description}</p>
                                        <p className="text-text-dark/70 leading-relaxed text-sm md:text-base">{initiative.details}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16 bg-gradient-to-br from-emerald-primary to-emerald-dark text-white p-8 md:p-12 rounded-2xl">
                        <h3 className="text-2xl md:text-3xl mb-4 font-bold">{t('socialWork.callToAction')}</h3>
                        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-[700px] mx-auto">
                            {t('socialWork.callToActionDesc')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialWork;
