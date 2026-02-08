import { useState } from "react";
import PropTypes from "prop-types";

const AlbumView = ({ photos, eventName, onClose }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const closePhotoModal = () => {
        setSelectedPhoto(null);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[1000] overflow-y-auto animate-fade-in">
            <div className="max-w-[1400px] mx-auto my-8 px-4 md:px-8">
                <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-white/20">
                    <h2 className="text-white text-2xl md:text-4xl font-bold m-0">{eventName}</h2>
                    <button
                        className="bg-white/10 text-white border-2 border-white w-10 h-10 md:w-12 md:h-12 rounded-full text-lg md:text-2xl cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-white hover:text-[#2c5f2d] hover:rotate-90"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 py-4">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 bg-[#1a1a1a] aspect-square hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] group"
                            onClick={() => handlePhotoClick(photo)}
                        >
                            <img
                                src={photo.photo_url}
                                alt={photo.description || eventName}
                                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/95 z-[1100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
                    onClick={closePhotoModal}
                >
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-10 md:-top-12 right-0 bg-white/20 text-white border-2 border-white w-8 h-8 md:w-10 md:h-10 rounded-full text-base md:text-xl cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-white hover:text-[#2c5f2d] hover:rotate-90"
                            onClick={closePhotoModal}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedPhoto.photo_url}
                            alt={selectedPhoto.description}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

AlbumView.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            photo_url: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
    eventName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AlbumView;
