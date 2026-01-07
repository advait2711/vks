import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/socialwork.css";

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

    // Enhanced initiative data with extracted information
    const initiatives = photos.map((photo, index) => {
        if (index === 0) {
            return {
                ...photo,
                title: "Kerala Floods Relief Program",
                subtitle: "Supporting Flood-Affected Families",
                description: "In response to the devastating Kerala floods, Kerala Samajam Vasai East organized an extensive relief program to support affected families. Our community came together to provide essential supplies, food, clothing, and financial assistance to those who lost their homes and livelihoods. Volunteers worked tirelessly to ensure aid reached the most vulnerable communities, demonstrating the strength of unity in times of crisis.",
                details: "The relief efforts included distribution of emergency supplies, setting up temporary shelters, and coordinating with local authorities to ensure comprehensive support. Our members contributed generously, and the collective effort made a significant difference in helping families rebuild their lives during this difficult period.",
                date: "August 2018"
            };
        } else {
            return {
                ...photo,
                title: "Pahalgam Terror Attack Support",
                subtitle: "Standing with the Victims and Families",
                description: "Following the tragic Pahalgam terror attack, Kerala Samajam Vasai East extended heartfelt support to the victims and their families. Our community organized fundraising initiatives and provided financial assistance to help the affected families during their time of grief and hardship. We stand in solidarity with all those impacted by this tragedy.",
                details: "The support program focused on providing immediate financial relief to the families of victims, coordinating with relief organizations, and raising awareness about the need for continued support. Our community members contributed generously to ensure that the families received the help they needed during this devastating time.",
                date: "April 2025"
            };
        }
    });

    return (
        <div className="social-work-page">
            <div className="social-work-header">
                <h1>{t('socialWork.title')}</h1>
                <p>{t('socialWork.subtitle')}</p>
            </div>

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>{t('socialWork.loading')}</p>
                </div>
            ) : (
                <div className="social-work-content">
                    <div className="intro-section">
                        <h2>{t('socialWork.ourInitiatives')}</h2>
                        <p>
                            {t('socialWork.initiativesDesc')}
                        </p>
                    </div>

                    <div className="initiatives-container">
                        {initiatives.map((initiative, index) => (
                            <div key={initiative.id} className="initiative-card">
                                <div className="initiative-poster">
                                    <img src={initiative.photo_url} alt={initiative.title} />
                                    <div className="poster-overlay">
                                        <span className="initiative-date">{initiative.date}</span>
                                    </div>
                                </div>
                                <div className="initiative-details">
                                    <div className="initiative-header">
                                        <h3>{initiative.title}</h3>
                                        <p className="initiative-subtitle">{initiative.subtitle}</p>
                                    </div>
                                    <div className="initiative-content">
                                        <p className="initiative-description">{initiative.description}</p>
                                        <p className="initiative-more-details">{initiative.details}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="call-to-action">
                        <h3>{t('socialWork.callToAction')}</h3>
                        <p>
                            {t('socialWork.callToActionDesc')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialWork;
