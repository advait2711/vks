import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/gallery.css";
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

    // Fetch events when year changes
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const eventsResponse = await fetch(`${API_URL}/photos/events/${selectedYear}`);
                const eventsData = await eventsResponse.json();
                setAvailableEvents(eventsData);

                // Select first event by default
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

    // Fetch random photos for slideshow when event changes
    useEffect(() => {
        if (!selectedEvent) return;

        const fetchSlideshowPhotos = async () => {
            try {
                // Fetch photos for the specific event
                const response = await fetch(`${API_URL}/photos/event/${encodeURIComponent(selectedEvent)}`);
                const data = await response.json();

                // Shuffle and take 10 random photos
                const shuffled = data.sort(() => 0.5 - Math.random());
                setSlideshowPhotos(shuffled.slice(0, 10));
                setCurrentSlide(0);
            } catch (error) {
                console.error("Error fetching slideshow photos:", error);
            }
        };

        fetchSlideshowPhotos();
    }, [selectedEvent]);

    // Auto-advance slideshow
    useEffect(() => {
        if (slideshowPhotos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowPhotos.length);
        }, 3500); // 3.5 seconds

        return () => clearInterval(interval);
    }, [slideshowPhotos]);

    // Fetch all photos for album view
    const handleViewAlbum = async () => {
        try {
            // Fetch photos for the specific event
            const response = await fetch(`${API_URL}/photos/event/${encodeURIComponent(selectedEvent)}`);
            const data = await response.json();
            setAllPhotos(data);
            setShowAlbum(true);
        } catch (error) {
            console.error("Error fetching all photos:", error);
        }
    };

    // Get current event info
    const currentEventInfo = availableEvents.find(e => e.event_name === selectedEvent);

    return (
        <div className="gallery-page">
            <div className="gallery-header">
                <h1>{t('gallery.title')}</h1>
                <p>{t('gallery.subtitle')}</p>
            </div>

            <div className="gallery-controls">
                <div className="year-selector">
                    <label htmlFor="year-select">{t('gallery.selectYear')}:</label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="year-dropdown"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {availableEvents.length > 1 && (
                    <div className="event-selector">
                        <label htmlFor="event-select">Select Event:</label>
                        <select
                            id="event-select"
                            value={selectedEvent || ""}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="event-dropdown"
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
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>{t('gallery.loading')}</p>
                </div>
            ) : (
                <>
                    {currentEventInfo && (
                        <div className="event-description">
                            <h2>{currentEventInfo.event_name}</h2>
                            <p>{currentEventInfo.description}</p>
                        </div>
                    )}

                    <div className="slideshow-container">
                        {slideshowPhotos.map((photo, index) => (
                            <div
                                key={photo.id}
                                className={`slide ${index === currentSlide ? "active" : ""}`}
                                style={{ backgroundImage: `url(${photo.photo_url})` }}
                            >
                                <div className="slide-overlay">
                                    <span className="slide-counter">
                                        {index + 1} / {slideshowPhotos.length}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="gallery-actions">
                        <button className="view-album-btn" onClick={handleViewAlbum}>
                            <span>📸</span> {t('gallery.viewAlbum')}
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
