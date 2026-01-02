import "../styles/aboutus.css";

const AboutUs = () => {
    return (
        <div className="aboutus-page">
            <div className="aboutus-header">
                <h1>About Kerala Samajam Vasai East</h1>
                <p>Celebrating Kerala's rich heritage and fostering community bonds</p>
            </div>

            <div className="aboutus-content">
                <section className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 1985, Kerala Samajam Vasai East has been a cornerstone of the Malayali community,
                        bringing together families to celebrate our rich cultural heritage. What started as
                        a small gathering of 20 families has grown into a vibrant community of over 500 members.
                    </p>
                    <p>
                        We are dedicated to preserving Kerala's traditions while embracing modernity,
                        creating a bridge between generations and keeping our culture alive for future generations.
                    </p>
                </section>

                <section className="about-section mission-vision">
                    <div className="mission-card">
                        <div className="card-icon">🎯</div>
                        <h3>Our Mission</h3>
                        <p>
                            To create a united community that celebrates Kerala's culture, provides support
                            to members, and promotes cultural exchange through events, education, and social initiatives.
                        </p>
                    </div>

                    <div className="mission-card">
                        <div className="card-icon">👁️</div>
                        <h3>Our Vision</h3>
                        <p>
                            To be the premier organization for Malayalis, fostering cultural pride,
                            community welfare, and creating lasting bonds across generations.
                        </p>
                    </div>
                </section>

                <section className="about-section">
                    <h2>What We Do</h2>
                    <div className="activities-grid">
                        <div className="activity-card">
                            <span className="activity-icon">🎭</span>
                            <h4>Cultural Events</h4>
                            <p>Onam celebrations, Vishu, Kathakali performances, and more</p>
                        </div>
                        <div className="activity-card">
                            <span className="activity-icon">🍛</span>
                            <h4>Food Festivals</h4>
                            <p>Traditional sadya, cooking workshops, and culinary events</p>
                        </div>
                        <div className="activity-card">
                            <span className="activity-icon">🎓</span>
                            <h4>Educational Programs</h4>
                            <p>Malayalam classes, cultural workshops for youth</p>
                        </div>
                        <div className="activity-card">
                            <span className="activity-icon">🤝</span>
                            <h4>Community Support</h4>
                            <p>Networking, mentorship, and assistance programs</p>
                        </div>
                    </div>
                </section>

                <section className="about-section stats-section">
                    <h2>Our Impact</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Active Members</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">38</div>
                            <div className="stat-label">Years of Service</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">100+</div>
                            <div className="stat-label">Events Annually</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Families Impacted</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
