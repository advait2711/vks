import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/albumview.css";

const AlbumView = ({ photos, eventName, onClose }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const closePhotoModal = () => {
        setSelectedPhoto(null);
    };

    return (
        <div className="album-overlay">
            <div className="album-container">
                <div className="album-header">
                    <h2>{eventName}</h2>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="album-grid">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="album-photo-card"
                            onClick={() => handlePhotoClick(photo)}
                        >
                            <img src={photo.photo_url} alt={photo.description || eventName} />
                        </div>
                    ))}
                </div>
            </div>

            {selectedPhoto && (
                <div className="photo-modal" onClick={closePhotoModal}>
                    <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closePhotoModal}>
                            ✕
                        </button>
                        <img src={selectedPhoto.photo_url} alt={selectedPhoto.description} />
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
