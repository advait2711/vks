import { useState, useEffect } from 'react';
import { adminUserAPI } from '../utils/api';
import '../styles/usermanagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        sl_no: '',
        name: '',
        address: '',
        family_members: '',
        mobile_no: '',
        occupation: '',
        blood_group: '',
        native_place: '',
        email: '',
        current_status: 'Active',
        profile_photo: null,
        otp_password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await adminUserAPI.getAll();
            setUsers(response.data.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const generateOTP = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        setFormData(prev => ({ ...prev, otp_password: otp }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (editingUser) {
                // Update existing user
                const updateFormData = new FormData();
                Object.keys(formData).forEach(key => {
                    if (key === 'profile_photo' && formData[key] instanceof File) {
                        updateFormData.append(key, formData[key]);
                    } else if (key === 'otp_password' && !formData[key]) {
                        // Skip empty password
                    } else if (key !== 'sl_no') { // Don't update SL number
                        updateFormData.append(key, formData[key]);
                    }
                });

                await adminUserAPI.update(editingUser.sl_no, updateFormData);
                setSuccess('User updated successfully!');
            } else {
                // Create new user - check for duplicate SL number
                const existingUser = users.find(u => u.sl_no === parseInt(formData.sl_no));
                if (existingUser) {
                    setError(`SL Number ${formData.sl_no} already exists!`);
                    return;
                }

                if (!formData.otp_password) {
                    setError('Password is required for new users');
                    return;
                }

                const createFormData = new FormData();
                Object.keys(formData).forEach(key => {
                    if (key === 'profile_photo' && formData[key] instanceof File) {
                        // Explicitly handle file upload
                        createFormData.append(key, formData[key]);
                        console.log('Adding photo file:', formData[key].name);
                    } else if (formData[key] !== null && formData[key] !== '' && key !== 'profile_photo') {
                        createFormData.append(key, formData[key]);
                    }
                });

                console.log('FormData contents:');
                for (let pair of createFormData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                await adminUserAPI.create(createFormData);
                setSuccess('User created successfully!');
            }

            fetchUsers();
            closeModal();
        } catch (error) {
            setError(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            sl_no: user.sl_no || '',
            name: user.name || '',
            address: user.address || '',
            family_members: user.family_members || '',
            mobile_no: user.mobile_no || '',
            occupation: user.occupation || '',
            blood_group: user.blood_group || '',
            native_place: user.native_place || '',
            email: user.email || '',
            current_status: user.current_status || 'Active',
            profile_photo: null, // Don't pre-fill file input
            otp_password: ''
        });
        setShowModal(true);
    };

    const handleDelete = async (sl_no, name) => {
        if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
            return;
        }

        try {
            await adminUserAPI.delete(sl_no);
            setSuccess('User deleted successfully!');
            fetchUsers();
        } catch (error) {
            setError(error.response?.data?.message || 'Delete failed');
        }
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setFormData({
            sl_no: '',
            name: '',
            address: '',
            family_members: '',
            mobile_no: '',
            occupation: '',
            blood_group: '',
            native_place: '',
            email: '',
            current_status: 'Active',
            profile_photo: null,
            otp_password: ''
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingUser(null);
        setError('');
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile_no?.includes(searchTerm)
    );

    return (
        <div className="user-management">
            <div className="page-header">
                <div>
                    <h1>User Management</h1>
                    <p>Manage member accounts and information</p>
                </div>
                <button onClick={openCreateModal} className="btn-primary">
                    ➕ Add New Member
                </button>
            </div>

            {success && (
                <div className="alert alert-success">
                    {success}
                    <button onClick={() => setSuccess('')}>✕</button>
                </div>
            )}

            {error && !showModal && (
                <div className="alert alert-error">
                    {error}
                    <button onClick={() => setError('')}>✕</button>
                </div>
            )}

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name, email, or mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="loading">Loading users...</div>
            ) : (
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Occupation</th>
                                <th>OTP Password</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="no-data">No users found</td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.sl_no}>
                                        <td>{user.sl_no}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email || '-'}</td>
                                        <td>{user.mobile_no || '-'}</td>
                                        <td>{user.occupation || '-'}</td>
                                        <td>
                                            <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                                {user.otp_plain || '****'}
                                            </code>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${user.current_status?.toLowerCase()}`}>
                                                {user.current_status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="actions">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="btn-edit"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.sl_no, user.name)}
                                                className="btn-delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingUser ? 'Edit Member' : 'Add New Member'}</h2>
                            <button onClick={closeModal} className="modal-close">✕</button>
                        </div>

                        {error && (
                            <div className="alert alert-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="user-form">
                            <div className="form-row">
                                {!editingUser && (
                                    <div className="form-group">
                                        <label>SL Number *</label>
                                        <input
                                            type="number"
                                            name="sl_no"
                                            value={formData.sl_no}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter unique serial number"
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile_no"
                                        value={formData.mobile_no}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <select
                                        name="blood_group"
                                        value={formData.blood_group}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
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

                                <div className="form-group">
                                    <label>Occupation</label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="2"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Native Place</label>
                                    <input
                                        type="text"
                                        name="native_place"
                                        value={formData.native_place}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Family Members</label>
                                    <input
                                        type="text"
                                        name="family_members"
                                        value={formData.family_members}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="current_status"
                                        value={formData.current_status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Left">Left</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Profile Photo</label>
                                    <input
                                        type="file"
                                        name="profile_photo"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                    />
                                    {editingUser && editingUser.profile_photo && (
                                        <small style={{ display: 'block', marginTop: '0.5rem', color: '#6b7280' }}>
                                            Current photo exists. Upload new to replace.
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>OTP Password {!editingUser && '*'}</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        name="otp_password"
                                        value={formData.otp_password}
                                        onChange={handleInputChange}
                                        placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter 4-digit OTP'}
                                        required={!editingUser}
                                        maxLength="4"
                                        style={{ flex: 1 }}
                                    />
                                    {!editingUser && (
                                        <button
                                            type="button"
                                            onClick={generateOTP}
                                            className="btn-secondary"
                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            🎲 Generate OTP
                                        </button>
                                    )}
                                </div>
                                {formData.otp_password && (
                                    <small style={{ display: 'block', marginTop: '0.5rem', color: '#059669' }}>
                                        Generated OTP: <strong>{formData.otp_password}</strong>
                                    </small>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={closeModal} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    {editingUser ? 'Update Member' : 'Create Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
