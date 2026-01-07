import { useTranslation } from "react-i18next";
import "../styles/aboutus.css";

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <div className="aboutus-page">
            <div className="aboutus-header">
                <h1>{t('about.title')}</h1>
                <p>{t('about.subtitle')}</p>
            </div>

            <div className="aboutus-content">
                <section className="about-section">
                    <h2>{t('about.ourStory')}</h2>
                    <p>
                        {t('about.storyP1')}
                    </p>
                    <p>
                        {t('about.storyP2')}
                    </p>
                </section>

                <section className="about-section mission-vision">
                    <div className="mission-card">
                        <div className="card-icon">🎯</div>
                        <h3>{t('about.mission')}</h3>
                        <p>
                            {t('about.missionText')}
                        </p>
                    </div>

                    <div className="mission-card">
                        <div className="card-icon">👁️</div>
                        <h3>{t('about.vision')}</h3>
                        <p>
                            {t('about.visionText')}
                        </p>
                    </div>
                </section>

                <section className="about-section">
                    <h2>{t('about.whatWeDo')}</h2>
                    <div className="activities-grid">
                        <div className="activity-card">
                            <span className="activity-icon">🎭</span>
                            <h4>{t('about.culturalEvents')}</h4>
                            <p>{t('about.culturalEventsDesc')}</p>
                        </div>
                        <div className="activity-card">
                            <span className="activity-icon">🍛</span>
                            <h4>{t('about.foodFestivals')}</h4>
                            <p>{t('about.foodFestivalsDesc')}</p>
                        </div>
                        <div className="activity-card">
                            <span className="activity-icon">🎓</span>
                            <h4>{t('about.educationalPrograms')}</h4>
                            <p>{t('about.educationalProgramsDesc')}</p>
                        </div>
                        <div className="activity-card">
                            <span className="activity-icon">🤝</span>
                            <h4>{t('about.communitySupport')}</h4>
                            <p>{t('about.communitySupportDesc')}</p>
                        </div>
                    </div>
                </section>

                <section className="about-section stats-section">
                    <h2>{t('about.ourImpact')}</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">{t('about.activeMembers')}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">38</div>
                            <div className="stat-label">{t('about.yearsOfService')}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">100+</div>
                            <div className="stat-label">{t('about.eventsAnnually')}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">{t('about.familiesImpacted')}</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
