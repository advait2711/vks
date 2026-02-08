import { useState } from "react";

const UpdateInfo = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const [credentials, setCredentials] = useState({
        sl_no: "",
        otp_password: ""
    });

    const [memberData, setMemberData] = useState(null);

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

    const handleCredentialChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!allowedTypes.includes(file.type)) {
                setError("Please select a valid image file (JPEG, PNG, or WebP)");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }

            setPhotoFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setError("");
        }
    };

    const handlePhotoUpload = async () => {
        if (!photoFile) return;

        setUploadingPhoto(true);
        setError("");
        setSuccessMessage("");

        try {
            const formDataObj = new FormData();
            formDataObj.append("photo", photoFile);

            const response = await fetch(`${API_BASE_URL}/members/${memberData.sl_no}/photo`, {
                method: "POST",
                body: formDataObj
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
            <div className="min-h-screen py-8 px-[4%] md:px-[5%] bg-cream-white">
                <div className="text-center mb-12 py-8">
                    <h1 className="text-4xl md:text-5xl gradient-text mb-2 font-bold">Member Login</h1>
                    <p className="text-text-dark/80 text-lg">Enter your credentials to update your information</p>
                </div>

                <div className="max-w-[500px] mx-auto">
                    <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-md-custom p-6 md:p-10">
                        <div>
                            <h3 className="text-xl text-gold-accent mb-6 pb-3 border-b-2 border-emerald-subtle font-semibold">Authentication</h3>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="mb-5">
                                <label htmlFor="sl_no" className="block text-text-dark font-semibold mb-2 text-sm">Serial Number *</label>
                                <input
                                    type="number"
                                    id="sl_no"
                                    name="sl_no"
                                    value={credentials.sl_no}
                                    onChange={handleCredentialChange}
                                    required
                                    placeholder="Enter your serial number"
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="otp_password" className="block text-text-dark font-semibold mb-2 text-sm">OTP Password *</label>
                                <input
                                    type="password"
                                    id="otp_password"
                                    name="otp_password"
                                    value={credentials.otp_password}
                                    onChange={handleCredentialChange}
                                    required
                                    placeholder="Enter your OTP password"
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="min-h-screen py-8 px-[4%] md:px-[5%] bg-cream-white">
            <div className="text-center mb-8 py-4">
                <h1 className="text-3xl md:text-4xl gradient-text mb-4 font-bold">Update Your Information</h1>

                {/* Profile Photo Section */}
                <div className="flex flex-col items-center gap-4 my-6">
                    <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full border-4 border-gold-primary shadow-lg-custom overflow-hidden bg-cream-soft flex items-center justify-center">
                        {(photoPreview || memberData?.profile_photo) ? (
                            <img
                                src={photoPreview || memberData.profile_photo}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 md:w-20 md:h-20">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                        <label htmlFor="photo-upload" className="btn-secondary cursor-pointer text-sm py-2 px-4">
                            📷 Choose Photo
                        </label>

                        {photoFile && (
                            <button
                                type="button"
                                onClick={handlePhotoUpload}
                                disabled={uploadingPhoto}
                                className="btn-primary text-sm py-2 px-4 disabled:opacity-50"
                            >
                                {uploadingPhoto ? '⏳ Uploading...' : '✓ Upload Photo'}
                            </button>
                        )}

                        {memberData?.profile_photo && !photoFile && (
                            <button
                                type="button"
                                onClick={handlePhotoDelete}
                                disabled={uploadingPhoto}
                                className="bg-red-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                            >
                                {uploadingPhoto ? '⏳ Deleting...' : '🗑️ Remove Photo'}
                            </button>
                        )}
                    </div>
                </div>

                <p className="text-text-dark text-lg">Welcome, <span className="font-semibold text-gold-accent">{memberData?.name}</span></p>
                <button onClick={handleLogout} className="mt-4 text-red-500 font-semibold hover:text-red-600 transition-all text-sm">
                    Logout
                </button>
            </div>

            <div className="max-w-[800px] mx-auto">
                <form onSubmit={handleUpdate} className="bg-white rounded-2xl shadow-md-custom p-6 md:p-10">
                    {/* Read-only Information */}
                    <div className="mb-8 pb-6 border-b border-gray-200">
                        <h3 className="text-xl text-gold-accent mb-6 font-semibold">Member Information (Read-Only)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-text-dark font-semibold mb-2 text-sm">Serial Number</label>
                                <input
                                    type="text"
                                    value={memberData?.sl_no || ""}
                                    disabled
                                    className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-200"
                                />
                            </div>

                            <div>
                                <label className="block text-text-dark font-semibold mb-2 text-sm">Name</label>
                                <input
                                    type="text"
                                    value={memberData?.name || ""}
                                    disabled
                                    className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editable Information */}
                    <div>
                        <h3 className="text-xl text-gold-accent mb-6 font-semibold">Personal Details</h3>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 text-sm">
                                {successMessage}
                            </div>
                        )}

                        <div className="mb-5">
                            <label htmlFor="address" className="block text-text-dark font-semibold mb-2 text-sm">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                rows="3"
                                placeholder="Enter your address"
                                disabled={loading}
                                className="input-field resize-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label htmlFor="mobile_no" className="block text-text-dark font-semibold mb-2 text-sm">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile_no"
                                    name="mobile_no"
                                    value={formData.mobile_no}
                                    onChange={handleFormChange}
                                    placeholder="+91 9876543210"
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-text-dark font-semibold mb-2 text-sm">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="your.email@example.com"
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label htmlFor="occupation" className="block text-text-dark font-semibold mb-2 text-sm">Occupation</label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleFormChange}
                                    placeholder="Your occupation"
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="blood_group" className="block text-text-dark font-semibold mb-2 text-sm">Blood Group</label>
                                <select
                                    id="blood_group"
                                    name="blood_group"
                                    value={formData.blood_group}
                                    onChange={handleFormChange}
                                    disabled={loading}
                                    className="input-field"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label htmlFor="native_place" className="block text-text-dark font-semibold mb-2 text-sm">Native Place</label>
                                <input
                                    type="text"
                                    id="native_place"
                                    name="native_place"
                                    value={formData.native_place}
                                    onChange={handleFormChange}
                                    placeholder="Your native place"
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="current_status" className="block text-text-dark font-semibold mb-2 text-sm">Current Status</label>
                                <input
                                    type="text"
                                    id="current_status"
                                    name="current_status"
                                    value={formData.current_status}
                                    onChange={handleFormChange}
                                    placeholder="e.g., ACTIVE, LEFT, etc."
                                    disabled={loading}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="family_members" className="block text-text-dark font-semibold mb-2 text-sm">Family Members</label>
                            <textarea
                                id="family_members"
                                name="family_members"
                                value={formData.family_members}
                                onChange={handleFormChange}
                                rows="3"
                                placeholder="Enter family member details"
                                disabled={loading}
                                className="input-field resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            className="btn-primary flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Information"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
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
                            className="btn-secondary flex-1 py-4 text-lg disabled:opacity-50"
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
