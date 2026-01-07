import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/members.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// General members data (dummy data for now)
const membersData = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Member",
        phone: "+91 9876543210",
        email: "rajesh.kumar@example.com",
        image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=fbbf24&color=fff&size=200"
    },
    {
        id: 2,
        name: "Priya Menon",
        role: "Member",
        phone: "+91 9876543211",
        email: "priya.menon@example.com",
        image: "https://ui-avatars.com/api/?name=Priya+Menon&background=10b981&color=fff&size=200"
    },
    {
        id: 3,
        name: "Anil Nair",
        role: "Member",
        phone: "+91 9876543212",
        email: "anil.nair@example.com",
        image: "https://ui-avatars.com/api/?name=Anil+Nair&background=fbbf24&color=fff&size=200"
    },
    {
        id: 4,
        name: "Lakshmi Pillai",
        role: "Member",
        phone: "+91 9876543213",
        email: "lakshmi.pillai@example.com",
        image: "https://ui-avatars.com/api/?name=Lakshmi+Pillai&background=10b981&color=fff&size=200"
    },
    {
        id: 5,
        name: "Suresh Varma",
        role: "Member",
        phone: "+91 9876543214",
        email: "suresh.varma@example.com",
        image: "https://ui-avatars.com/api/?name=Suresh+Varma&background=fbbf24&color=fff&size=200"
    },
    {
        id: 6,
        name: "Divya Krishnan",
        role: "Member",
        phone: "+91 9876543215",
        email: "divya.krishnan@example.com",
        image: "https://ui-avatars.com/api/?name=Divya+Krishnan&background=10b981&color=fff&size=200"
    },
    {
        id: 7,
        name: "Vinod Thomas",
        role: "Member",
        phone: "+91 9876543216",
        email: "vinod.thomas@example.com",
        image: "https://ui-avatars.com/api/?name=Vinod+Thomas&background=fbbf24&color=fff&size=200"
    },
    {
        id: 8,
        name: "Sreelatha Nambiar",
        role: "Member",
        phone: "+91 9876543217",
        email: "sreelatha.nambiar@example.com",
        image: "https://ui-avatars.com/api/?name=Sreelatha+Nambiar&background=10b981&color=fff&size=200"
    }
];

const Members = () => {
    const [officeBearers, setOfficeBearers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    // Fetch office bearers from API
    useEffect(() => {
        const fetchOfficeBearers = async () => {
            try {
                const response = await fetch(`${API_URL}/office-bearers/current`);
                if (!response.ok) {
                    throw new Error('Failed to fetch office bearers');
                }
                const data = await response.json();
                setOfficeBearers(data);
            } catch (err) {
                console.error('Error fetching office bearers:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOfficeBearers();
    }, []);

    // Group office bearers by hierarchy for 2x2x2 layout
    const presidentAndVP = officeBearers.filter(b =>
        b.designation === 'President' || b.designation === 'Vice President'
    );
    const secretaryAndTreasurer = officeBearers.filter(b =>
        b.designation === 'Secretary' || b.designation === 'Treasurer'
    );
    const jointSecretaries = officeBearers.filter(b =>
        b.designation === 'Joint Secretary'
    );

    return (
        <div className="members-page">
            {/* Office Bearers Section */}
            <div className="office-bearers-section">
                <div className="office-bearers-header">
                    <h1>{t('members.officeBearersTitle')}</h1>
                    <p className="team-description">
                        {t('members.teamDescription')}
                    </p>
                </div>

                {loading ? (
                    <div className="loading-message">
                        <p>{t('members.loading')}</p>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p>{t('members.errorLoading')} {error}</p>
                    </div>
                ) : (
                    <div className="office-bearers-container">
                        {/* President & Vice President - First Row */}
                        <div className="bearers-row">
                            {presidentAndVP.map((bearer) => (
                                <div key={bearer.id} className="office-bearer-card">
                                    <div className="bearer-photo-wrapper">
                                        <img
                                            src={bearer.photo_url}
                                            alt={bearer.name}
                                            className="bearer-photo"
                                        />
                                    </div>
                                    <div className="bearer-info">
                                        <h3>{bearer.name}</h3>
                                        <span className="bearer-designation">{bearer.designation}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Secretary & Treasurer - Second Row */}
                        <div className="bearers-row">
                            {secretaryAndTreasurer.map((bearer) => (
                                <div key={bearer.id} className="office-bearer-card">
                                    <div className="bearer-photo-wrapper">
                                        <img
                                            src={bearer.photo_url}
                                            alt={bearer.name}
                                            className="bearer-photo"
                                        />
                                    </div>
                                    <div className="bearer-info">
                                        <h3>{bearer.name}</h3>
                                        <span className="bearer-designation">{bearer.designation}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Joint Secretaries - Third Row */}
                        <div className="bearers-row">
                            {jointSecretaries.map((bearer) => (
                                <div key={bearer.id} className="office-bearer-card">
                                    <div className="bearer-photo-wrapper">
                                        <img
                                            src={bearer.photo_url}
                                            alt={bearer.name}
                                            className="bearer-photo"
                                        />
                                    </div>
                                    <div className="bearer-info">
                                        <h3>{bearer.name}</h3>
                                        <span className="bearer-designation">{bearer.designation}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Members;
