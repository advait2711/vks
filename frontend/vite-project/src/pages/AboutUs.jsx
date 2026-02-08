import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-8 px-[4%] md:px-[5%] bg-cream-white">
            <div className="text-center mb-12 py-8">
                <h1 className="text-4xl md:text-5xl gradient-text mb-2 font-bold">{t('about.title')}</h1>
                <p className="text-text-dark/80 text-lg">{t('about.subtitle')}</p>
            </div>

            <div className="max-w-[1100px] mx-auto">
                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl text-gold-accent mb-6 pb-3 border-b-2 border-emerald-subtle font-bold">{t('about.ourStory')}</h2>
                    <p className="text-text-dark/85 text-base md:text-lg leading-relaxed mb-4">
                        {t('about.storyP1')}
                    </p>
                    <p className="text-text-dark/85 text-base md:text-lg leading-relaxed mb-4">
                        {t('about.storyP2')}
                    </p>
                </section>

                <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-gradient-to-br from-emerald-primary/10 to-emerald-subtle/20 p-6 md:p-8 rounded-2xl shadow-sm-custom transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-custom">
                        <div className="text-4xl md:text-5xl mb-4 inline-block animate-pulse-scale">🎯</div>
                        <h3 className="text-xl md:text-2xl text-gold-accent mb-4 font-semibold">{t('about.mission')}</h3>
                        <p className="text-text-dark/80 leading-relaxed text-sm md:text-base">
                            {t('about.missionText')}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gold-primary/10 to-gold-light/20 p-6 md:p-8 rounded-2xl shadow-sm-custom transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-custom">
                        <div className="text-4xl md:text-5xl mb-4 inline-block animate-pulse-scale">👁️</div>
                        <h3 className="text-xl md:text-2xl text-gold-accent mb-4 font-semibold">{t('about.vision')}</h3>
                        <p className="text-text-dark/80 leading-relaxed text-sm md:text-base">
                            {t('about.visionText')}
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl text-gold-accent mb-6 pb-3 border-b-2 border-emerald-subtle font-bold text-center">{t('about.whatWeDo')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm-custom text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg-custom">
                            <span className="text-3xl md:text-4xl block mb-4">🎭</span>
                            <h4 className="text-lg text-emerald-dark mb-2 font-semibold">{t('about.culturalEvents')}</h4>
                            <p className="text-text-dark/70 text-sm leading-relaxed">{t('about.culturalEventsDesc')}</p>
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm-custom text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg-custom">
                            <span className="text-3xl md:text-4xl block mb-4">🍛</span>
                            <h4 className="text-lg text-emerald-dark mb-2 font-semibold">{t('about.foodFestivals')}</h4>
                            <p className="text-text-dark/70 text-sm leading-relaxed">{t('about.foodFestivalsDesc')}</p>
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm-custom text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg-custom">
                            <span className="text-3xl md:text-4xl block mb-4">🎓</span>
                            <h4 className="text-lg text-emerald-dark mb-2 font-semibold">{t('about.educationalPrograms')}</h4>
                            <p className="text-text-dark/70 text-sm leading-relaxed">{t('about.educationalProgramsDesc')}</p>
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm-custom text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg-custom">
                            <span className="text-3xl md:text-4xl block mb-4">🤝</span>
                            <h4 className="text-lg text-emerald-dark mb-2 font-semibold">{t('about.communitySupport')}</h4>
                            <p className="text-text-dark/70 text-sm leading-relaxed">{t('about.communitySupportDesc')}</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12 bg-gradient-to-br from-gold-primary/10 to-emerald-primary/10 rounded-2xl p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl text-gold-accent mb-8 text-center font-bold">{t('about.ourImpact')}</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white p-5 md:p-6 rounded-xl text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">600+</div>
                            <div className="text-text-dark/70 text-sm md:text-base font-medium">{t('about.activeMembers')}</div>
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-xl text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">28</div>
                            <div className="text-text-dark/70 text-sm md:text-base font-medium">{t('about.yearsOfService')}</div>
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-xl text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10+</div>
                            <div className="text-text-dark/70 text-sm md:text-base font-medium">{t('about.eventsAnnually')}</div>
                        </div>
                        <div className="bg-white p-5 md:p-6 rounded-xl text-center shadow-sm-custom transition-all duration-300 hover:-translate-y-1 hover:shadow-md-custom">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">300+</div>
                            <div className="text-text-dark/70 text-sm md:text-base font-medium">{t('about.familiesImpacted')}</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
