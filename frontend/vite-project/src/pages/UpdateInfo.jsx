import { useState } from "react";
import "../styles/updateinfo.css";

const UpdateInfo = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    // Login credentials
    const [credentials, setCredentials] = useState({
        sl_no: "",
        otp_password: ""
    });

    // Member data
    const [memberData, setMemberData] = useState(null);

    // Form data for updates
    const [formData, setFormData] = useState({
        address: "",
        family_members: "",
        mobile_no: "",
        occupation: "",
        blood_group: "",
        native_place: "",
        email: "",
        current_status: "",
        profile_photo: ""
    });

    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    // Handle login credential changes
    const handleCredentialChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    // Handle form data changes
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle photo file selection
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!allowedTypes.includes(file.type)) {
                setError("Please select a valid image file (JPEG, PNG, or WebP)");
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }

            setPhotoFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setError("");
        }
    };

    // Upload photo
    const handlePhotoUpload = async () => {
        if (!photoFile) return;

        setUploadingPhoto(true);
        setError("");
        setSuccessMessage("");

        try {
            const formData = new FormData();
            formData.append("photo", photoFile);

            const response = await fetch(`${API_BASE_URL}/members/${memberData.sl_no}/photo`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage("Photo uploaded successfully!");
                setMemberData({ ...memberData, profile_photo: data.data.profile_photo });
                setFormData({ ...formData, profile_photo: data.data.profile_photo });
                setPhotoFile(null);
                setPhotoPreview(null);

                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                setError(data.message || "Failed to upload photo");
            }
        } catch (err) {
            setError("Failed to upload photo. Please try again.");
            console.error("Photo upload error:", err);
        } finally {
            setUploadingPhoto(false);
        }
    };

    // Delete photo
    const handlePhotoDelete = async () => {
        if (!memberData.profile_photo) return;

        if (!confirm("Are you sure you want to delete your profile photo?")) return;

        setUploadingPhoto(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/members/${memberData.sl_no}/photo`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage("Photo deleted successfully!");
                setMemberData({ ...memberData, profile_photo: null });
                setFormData({ ...formData, profile_photo: "" });
                setPhotoPreview(null);

                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                setError(data.message || "Failed to delete photo");
            }
        } catch (err) {
            setError("Failed to delete photo. Please try again.");
            console.error("Photo delete error:", err);
        } finally {
            setUploadingPhoto(false);
        }
    };

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/members/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (data.success) {
                setIsAuthenticated(true);
                setMemberData(data.data);

                // Populate form with existing data
                setFormData({
                    address: data.data.address || "",
                    family_members: data.data.family_members || "",
                    mobile_no: data.data.mobile_no || "",
                    occupation: data.data.occupation || "",
                    blood_group: data.data.blood_group || "",
                    native_place: data.data.native_place || "",
                    email: data.data.email || "",
                    current_status: data.data.current_status || "",
                    profile_photo: data.data.profile_photo || ""
                });
            } else {
                setError(data.message || "Authentication failed");
            }
        } catch (err) {
            setError("Connection error. Please make sure the backend server is running.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/members/${memberData.sl_no}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage("Information updated successfully!");
                setMemberData(data.data);

                // Update form with latest data
                setFormData({
                    address: data.data.address || "",
                    family_members: data.data.family_members || "",
                    mobile_no: data.data.mobile_no || "",
                    occupation: data.data.occupation || "",
                    blood_group: data.data.blood_group || "",
                    native_place: data.data.native_place || "",
                    email: data.data.email || "",
                    current_status: data.data.current_status || ""
                });

                // Clear success message after 5 seconds
                setTimeout(() => setSuccessMessage(""), 5000);
            } else {
                setError(data.message || "Update failed");
            }
        } catch (err) {
            setError("Connection error. Please make sure the backend server is running.");
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        setMemberData(null);
        setCredentials({ sl_no: "", otp_password: "" });
        setFormData({
            address: "",
            family_members: "",
            mobile_no: "",
            occupation: "",
            blood_group: "",
            native_place: "",
            email: "",
            current_status: ""
        });
        setError("");
        setSuccessMessage("");
    };

    // Login View
    if (!isAuthenticated) {
        return (
            <div className="updateinfo-page">
                <div className="updateinfo-header">
                    <h1>Member Login</h1>
                    <p>Enter your credentials to update your information</p>
                </div>

                <div className="form-container">
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-section">
                            <h3>Authentication</h3>

                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group">
                                <label htmlFor="sl_no">Serial Number *</label>
                                <input
                                    type="number"
                                    id="sl_no"
                                    name="sl_no"
                                    value={credentials.sl_no}
                                    onChange={handleCredentialChange}
                                    required
                                    placeholder="Enter your serial number"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="otp_password">OTP Password *</label>
                                <input
                                    type="password"
                                    id="otp_password"
                                    name="otp_password"
                                    value={credentials.otp_password}
                                    onChange={handleCredentialChange}
                                    required
                                    placeholder="Enter your OTP password"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Update View (after authentication)
    return (
        <div className="updateinfo-page">
            <div className="updateinfo-header">
                <h1>Update Your Information</h1>

                {/* Profile Photo Section */}
                <div className="profile-photo-section">
                    <div className="profile-photo-circle">
                        {(photoPreview || memberData?.profile_photo) ? (
                            <img
                                src={photoPreview || memberData.profile_photo}
                                alt="Profile"
                                className="profile-photo-img"
                            />
                        ) : (
                            <div className="profile-photo-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="photo-actions">
                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="photo-upload" className="photo-btn upload-btn">
                            📷 Choose Photo
                        </label>

                        {photoFile && (
                            <button
                                type="button"
                                onClick={handlePhotoUpload}
                                disabled={uploadingPhoto}
                                className="photo-btn save-photo-btn"
                            >
                                {uploadingPhoto ? '⏳ Uploading...' : '✓ Upload Photo'}
                            </button>
                        )}

                        {memberData?.profile_photo && !photoFile && (
                            <button
                                type="button"
                                onClick={handlePhotoDelete}
                                disabled={uploadingPhoto}
                                className="photo-btn delete-photo-btn"
                            >
                                {uploadingPhoto ? '⏳ Deleting...' : '🗑️ Remove Photo'}
                            </button>
                        )}
                    </div>
                </div>

                <p>Welcome, {memberData?.name}</p>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <div className="form-container">
                <form onSubmit={handleUpdate} className="update-form">
                    {/* Read-only Information */}
                    <div className="form-section readonly-section">
                        <h3>Member Information (Read-Only)</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Serial Number</label>
                                <input
                                    type="text"
                                    value={memberData?.sl_no || ""}
                                    disabled
                                    className="readonly-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={memberData?.name || ""}
                                    disabled
                                    className="readonly-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editable Information */}
                    <div className="form-section">
                        <h3>Personal Details</h3>

                        {error && <div className="error-message">{error}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                rows="3"
                                placeholder="Enter your address"
                                disabled={loading}
                            ></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="mobile_no">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile_no"
                                    name="mobile_no"
                                    value={formData.mobile_no}
                                    onChange={handleFormChange}
                                    placeholder="+91 9876543210"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="your.email@example.com"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="occupation">Occupation</label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleFormChange}
                                    placeholder="Your occupation"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="blood_group">Blood Group</label>
                                <select
                                    id="blood_group"
                                    name="blood_group"
                                    value={formData.blood_group}
                                    onChange={handleFormChange}
                                    disabled={loading}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="native_place">Native Place</label>
                                <input
                                    type="text"
                                    id="native_place"
                                    name="native_place"
                                    value={formData.native_place}
                                    onChange={handleFormChange}
                                    placeholder="Your native place"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="current_status">Current Status</label>
                                <input
                                    type="text"
                                    id="current_status"
                                    name="current_status"
                                    value={formData.current_status}
                                    onChange={handleFormChange}
                                    placeholder="e.g., ACTIVE, LEFT, etc."
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="family_members">Family Members</label>
                            <textarea
                                id="family_members"
                                name="family_members"
                                value={formData.family_members}
                                onChange={handleFormChange}
                                rows="3"
                                placeholder="Enter family member details"
                                disabled={loading}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Information"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                // Reset to original member data
                                setFormData({
                                    address: memberData.address || "",
                                    family_members: memberData.family_members || "",
                                    mobile_no: memberData.mobile_no || "",
                                    occupation: memberData.occupation || "",
                                    blood_group: memberData.blood_group || "",
                                    native_place: memberData.native_place || "",
                                    email: memberData.email || "",
                                    current_status: memberData.current_status || ""
                                });
                                setError("");
                                setSuccessMessage("");
                            }}
                            className="reset-btn"
                            disabled={loading}
                        >
                            Reset Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInfo;
