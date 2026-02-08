import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AlbumView from "../components/AlbumView";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Gallery = () => {
    const [selectedYear, setSelectedYear] = useState("2024-2025");
    const [availableEvents, setAvailableEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [slideshowPhotos, setSlideshowPhotos] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showAlbum, setShowAlbum] = useState(false);
    const [allPhotos, setAllPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const years = ["Earlier Glimpse", "2024-2025", "2025-2026"];

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const eventsResponse = await fetch(`${API_URL}/photos/events/${selectedYear}`);
                const eventsData = await eventsResponse.json();
                setAvailableEvents(eventsData);

                if (eventsData.length > 0) {
                    setSelectedEvent(eventsData[0].event_name);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [selectedYear]);

    useEffect(() => {
        if (!selectedEvent) return;

        const fetchSlideshowPhotos = async () => {
            try {
                const response = await fetch(`${API_URL}/photos/event/${encodeURIComponent(selectedEvent)}`);
                const data = await response.json();

                const shuffled = data.sort(() => 0.5 - Math.random());
                setSlideshowPhotos(shuffled.slice(0, 10));
                setCurrentSlide(0);
            } catch (error) {
                console.error("Error fetching slideshow photos:", error);
            }
        };

        fetchSlideshowPhotos();
    }, [selectedEvent]);

    useEffect(() => {
        if (slideshowPhotos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowPhotos.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [slideshowPhotos]);

    const handleViewAlbum = async () => {
        try {
            const response = await fetch(`${API_URL}/photos/event/${encodeURIComponent(selectedEvent)}`);
            const data = await response.json();
            setAllPhotos(data);
            setShowAlbum(true);
        } catch (error) {
            console.error("Error fetching all photos:", error);
        }
    };

    const currentEventInfo = availableEvents.find(e => e.event_name === selectedEvent);

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="text-center mb-8 py-8 px-4">
                <h1 className="text-4xl md:text-5xl text-[#2c5f2d] mb-2 font-bold">{t('gallery.title')}</h1>
                <p className="text-lg text-gray-600">{t('gallery.subtitle')}</p>
            </div>

            <div className="max-w-[1200px] mx-auto mb-8 flex justify-center items-center gap-4 flex-wrap">
                <div className="flex flex-col md:flex-row items-center gap-4 bg-white py-4 px-6 md:px-8 rounded-xl shadow-md w-full md:w-auto max-w-[400px]">
                    <label htmlFor="year-select" className="font-semibold text-[#2c5f2d] text-lg">{t('gallery.selectYear')}:</label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full md:w-auto py-3 px-6 text-base border-2 border-[#2c5f2d] rounded-lg bg-white text-[#2c5f2d] cursor-pointer transition-all duration-300 font-medium hover:bg-[#2c5f2d] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2c5f2d]/20"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {availableEvents.length > 1 && (
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-white py-4 px-6 md:px-8 rounded-xl shadow-md w-full md:w-auto max-w-[400px]">
                        <label htmlFor="event-select" className="font-semibold text-[#2c5f2d] text-lg">Select Event:</label>
                        <select
                            id="event-select"
                            value={selectedEvent || ""}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full md:w-auto py-3 px-6 text-base border-2 border-[#2c5f2d] rounded-lg bg-white text-[#2c5f2d] cursor-pointer transition-all duration-300 font-medium hover:bg-[#2c5f2d] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2c5f2d]/20"
                        >
                            {availableEvents.map((event) => (
                                <option key={event.event_name} value={event.event_name}>
                                    {event.event_name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <div className="w-12 h-12 border-[5px] border-gray-200 border-t-[#2c5f2d] rounded-full animate-spin"></div>
                    <p className="text-[#2c5f2d] text-lg font-medium">{t('gallery.loading')}</p>
                </div>
            ) : (
                <>
                    {currentEventInfo && (
                        <div className="max-w-[1200px] mx-auto mb-8 bg-white p-8 rounded-xl shadow-md text-center">
                            <h2 className="text-[#2c5f2d] text-2xl md:text-3xl mb-4 font-bold">{currentEventInfo.event_name}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">{currentEventInfo.description}</p>
                        </div>
                    )}

                    <div className="max-w-[1200px] mx-auto mb-8 h-[300px] md:h-[600px] relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                        {slideshowPhotos.map((photo, index) => (
                            <div
                                key={photo.id}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                                style={{ backgroundImage: `url(${photo.photo_url})` }}
                            >
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex justify-end items-end">
                                    <span className="bg-white/90 text-[#2c5f2d] py-2 px-4 rounded-full font-semibold text-sm">
                                        {index + 1} / {slideshowPhotos.length}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-[1200px] mx-auto flex justify-center">
                        <button
                            className="bg-gradient-to-br from-[#2c5f2d] to-[#4a8f4d] text-white border-none py-4 px-10 text-lg md:text-xl font-semibold rounded-full cursor-pointer flex items-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(44,95,45,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(44,95,45,0.4)] active:translate-y-0"
                            onClick={handleViewAlbum}
                        >
                            <span className="text-2xl">📸</span> {t('gallery.viewAlbum')}
                        </button>
                    </div>
                </>
            )}

            {showAlbum && (
                <AlbumView
                    photos={allPhotos}
                    eventName={selectedEvent || selectedYear}
                    onClose={() => setShowAlbum(false)}
                />
            )}
        </div>
    );
};

export default Gallery;
