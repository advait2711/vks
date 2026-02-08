import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Members = () => {
    const [officeBearers, setOfficeBearers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

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

    const president = officeBearers.filter(b => b.designation === 'President');
    const vicePresidents = officeBearers.filter(b => b.designation === 'Vice President');
    const secretaryAndTreasurer = officeBearers.filter(b =>
        b.designation === 'Secretary' || b.designation === 'Treasurer'
    );
    const jointSecretaries = officeBearers.filter(b =>
        b.designation === 'Joint Secretary'
    );
    const committeeMembers = officeBearers.filter(b =>
        b.designation === 'Committee Member'
    );

    const OfficeBearerCard = ({ bearer, isPresident = false }) => (
        <div className={`bg-white rounded-2xl p-6 md:p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden min-w-[240px] md:min-w-[280px] max-w-[300px] md:max-w-[350px] group hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-gold-accent before:to-emerald-primary before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 ${isPresident ? 'bg-gradient-to-br from-gold-primary/10 to-white border-2 border-gold-primary/30' : ''}`}>
            <div className={`${isPresident ? 'w-[250px] h-[250px] md:w-[280px] md:h-[280px]' : 'w-[200px] h-[200px] md:w-[250px] md:h-[250px]'} mx-auto mb-6 relative before:content-[''] before:absolute before:-inset-1 before:bg-gradient-to-br before:from-gold-accent before:to-emerald-primary before:rounded-full before:z-0 before:animate-rotate`}>
                <img
                    src={bearer.photo_url}
                    alt={bearer.name}
                    className="w-full h-full rounded-full object-contain object-center bg-white border-[6px] border-white relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mt-4">
                <h3 className={`${isPresident ? 'text-2xl' : 'text-xl'} text-text-dark mb-2 font-semibold`}>{bearer.name}</h3>
                <span className={`inline-block font-semibold ${isPresident ? 'text-lg py-2 px-7' : 'text-base py-2 px-6'} bg-gradient-to-br from-gold-primary to-emerald-primary text-white rounded-full shadow-md`}>
                    {bearer.designation}
                </span>
            </div>
        </div>
    );

    const CommitteeMemberCard = ({ member }) => (
        <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-gold-accent before:to-emerald-primary before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] mx-auto mb-4 relative before:content-[''] before:absolute before:-inset-[3px] before:bg-gradient-to-br before:from-gold-accent before:to-emerald-primary before:rounded-full before:z-0">
                <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover object-center bg-white border-4 border-white relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div>
                <h4 className="text-sm md:text-lg text-text-dark mb-1 font-semibold">{member.name}</h4>
                <span className="inline-block text-emerald-primary font-medium text-xs md:text-sm py-1 px-3 md:px-4 bg-gradient-to-br from-gold-primary/10 to-emerald-primary/10 rounded-full">
                    {member.designation}
                </span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-8 px-[4%] md:px-[5%] bg-cream-white">
            {/* Office Bearers Section */}
            <div className="max-w-[1400px] mx-auto mb-16 py-8 md:py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl gradient-text mb-2 font-bold">{t('members.officeBearersTitle')}</h1>
                    <p className="max-w-[900px] mx-auto mt-4 leading-relaxed text-base md:text-lg text-text-dark/85">
                        {t('members.teamDescription')}
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-emerald-primary text-lg">{t('members.loading')}</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">{t('members.errorLoading')} {error}</p>
                    </div>
                ) : (
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:gap-12 items-center">
                        {/* President */}
                        <div className="flex justify-center gap-8 md:gap-12 w-full flex-wrap max-w-[900px] mb-4">
                            {president.map((bearer) => (
                                <OfficeBearerCard key={bearer.id} bearer={bearer} isPresident={true} />
                            ))}
                        </div>

                        {/* Vice Presidents */}
                        <div className="flex justify-center gap-6 md:gap-12 w-full flex-wrap max-w-[900px]">
                            {vicePresidents.map((bearer) => (
                                <OfficeBearerCard key={bearer.id} bearer={bearer} />
                            ))}
                        </div>

                        {/* Secretary & Treasurer */}
                        <div className="flex justify-center gap-6 md:gap-12 w-full flex-wrap max-w-[900px]">
                            {secretaryAndTreasurer.map((bearer) => (
                                <OfficeBearerCard key={bearer.id} bearer={bearer} />
                            ))}
                        </div>

                        {/* Joint Secretaries */}
                        <div className="flex justify-center gap-6 md:gap-12 w-full flex-wrap max-w-[900px]">
                            {jointSecretaries.map((bearer) => (
                                <OfficeBearerCard key={bearer.id} bearer={bearer} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Committee Members Section */}
            {!loading && !error && committeeMembers.length > 0 && (
                <div className="max-w-[1400px] mx-auto mb-16 py-8 md:py-12 px-4 md:px-8 bg-gradient-to-br from-gold-primary/5 to-emerald-primary/5 rounded-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl gradient-text mb-2 font-bold">{t('members.committeeMembersTitle')}</h2>
                        <p className="max-w-[700px] mx-auto mt-4 leading-relaxed text-base md:text-lg text-text-dark/85">
                            {t('members.committeeMembersDescription')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1000px] mx-auto">
                        {committeeMembers.map((member) => (
                            <CommitteeMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Members;
