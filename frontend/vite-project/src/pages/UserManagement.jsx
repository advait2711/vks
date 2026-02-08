import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { adminUserAPI } from '../utils/api';

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
                const updateFormData = new FormData();
                Object.keys(formData).forEach(key => {
                    if (key === 'profile_photo' && formData[key] instanceof File) {
                        updateFormData.append(key, formData[key]);
                    } else if (key === 'otp_password' && !formData[key]) {
                        // Skip empty password
                    } else if (key !== 'sl_no') {
                        updateFormData.append(key, formData[key]);
                    }
                });

                await adminUserAPI.update(editingUser.sl_no, updateFormData);
                setSuccess('User updated successfully!');
            } else {
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
            profile_photo: null,
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

    const getStatusBadgeClasses = (status) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
        switch (status?.toLowerCase()) {
            case 'active':
                return `${baseClasses} bg-green-100 text-green-700`;
            case 'inactive':
                return `${baseClasses} bg-yellow-100 text-yellow-700`;
            case 'left':
                return `${baseClasses} bg-red-100 text-red-700`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-700`;
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl text-text-dark font-bold mb-1">User Management</h1>
                    <p className="text-text-dark/70">Manage member accounts and information</p>
                </div>
                <button onClick={openCreateModal} className="btn-primary whitespace-nowrap">
                    ➕ Add New Member
                </button>
            </div>

            {success && (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                    {success}
                    <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700 text-xl">✕</button>
                </div>
            )}

            {error && !showModal && (
                <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                    <button onClick={() => setError('')} className="text-red-500 hover:text-red-700 text-xl">✕</button>
                </div>
            )}

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, email, or mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary transition-all"
                />
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-emerald-primary text-lg">Loading users...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm-custom overflow-hidden">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80">SL No</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80">Name</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80 hidden lg:table-cell">Email</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80 hidden lg:table-cell">Mobile</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80 hidden xl:table-cell">Occupation</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80 hidden lg:table-cell">OTP Password</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80">Status</th>
                                    <th className="px-4 py-4 text-sm font-semibold text-text-dark/80">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-12 text-text-dark/60">No users found</td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(user => (
                                        <tr key={user.sl_no} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 text-sm font-medium text-text-dark">{user.sl_no}</td>
                                            <td className="px-4 py-4 text-sm text-text-dark">{user.name}</td>
                                            <td className="px-4 py-4 text-sm text-text-dark/70 hidden lg:table-cell">{user.email || '-'}</td>
                                            <td className="px-4 py-4 text-sm text-text-dark/70 hidden lg:table-cell">{user.mobile_no || '-'}</td>
                                            <td className="px-4 py-4 text-sm text-text-dark/70 hidden xl:table-cell">{user.occupation || '-'}</td>
                                            <td className="px-4 py-4 hidden lg:table-cell">
                                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                    {user.otp_plain || '****'}
                                                </code>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={getStatusBadgeClasses(user.current_status)}>
                                                    {user.current_status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="w-9 h-9 flex items-center justify-center bg-emerald-primary/10 text-emerald-primary rounded-lg hover:bg-emerald-primary hover:text-white transition-all"
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.sl_no, user.name)}
                                                        className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden bg-gray-50/50 p-4 space-y-4">
                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-12 text-text-dark/60">No users found</div>
                        ) : (
                            filteredUsers.map(user => (
                                <div key={user.sl_no} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-emerald-primary/30 transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-xs font-semibold text-emerald-primary mb-1">#{user.sl_no}</div>
                                            <h3 className="font-bold text-text-dark text-lg">{user.name}</h3>
                                            <p className="text-sm text-text-dark/60">{user.occupation || 'Member'}</p>
                                        </div>
                                        <span className={getStatusBadgeClasses(user.current_status)}>
                                            {user.current_status || 'Active'}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {user.mobile_no && (
                                            <div className="flex items-center text-sm text-text-dark/80">
                                                <span className="w-5">📱</span> {user.mobile_no}
                                            </div>
                                        )}
                                        {user.email && (
                                            <div className="flex items-center text-sm text-text-dark/80">
                                                <span className="w-5">📧</span> <span className="truncate">{user.email}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center text-sm text-text-dark/80">
                                            <span className="w-5">🔑</span>
                                            <code className="bg-gray-100 px-2 py-0.5 rounded text-xs ml-1">
                                                {user.otp_plain || '****'}
                                            </code>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-primary/10 text-emerald-primary rounded-lg hover:bg-emerald-primary hover:text-white transition-all font-medium text-sm"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.sl_no, user.name)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all font-medium text-sm"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && createPortal(
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]" onClick={closeModal}>
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-text-dark">{editingUser ? 'Edit Member' : 'Add New Member'}</h2>
                            <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all">✕</button>
                        </div>

                        {error && (
                            <div className="mx-5 mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {!editingUser && (
                                    <div>
                                        <label className="block text-text-dark font-semibold mb-2 text-sm">SL Number *</label>
                                        <input
                                            type="number"
                                            name="sl_no"
                                            value={formData.sl_no}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter unique serial number"
                                            className="input-field"
                                        />
                                    </div>
                                )}
                                <div className={!editingUser ? '' : 'md:col-span-2'}>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile_no"
                                        value={formData.mobile_no}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Blood Group</label>
                                    <select
                                        name="blood_group"
                                        value={formData.blood_group}
                                        onChange={handleInputChange}
                                        className="input-field"
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

                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Occupation</label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2 text-sm">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="input-field resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Native Place</label>
                                    <input
                                        type="text"
                                        name="native_place"
                                        value={formData.native_place}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Family Members</label>
                                    <input
                                        type="text"
                                        name="family_members"
                                        value={formData.family_members}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Status</label>
                                    <select
                                        name="current_status"
                                        value={formData.current_status}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Left">Left</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-text-dark font-semibold mb-2 text-sm">Profile Photo</label>
                                    <input
                                        type="file"
                                        name="profile_photo"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="input-field text-sm"
                                    />
                                    {editingUser && editingUser.profile_photo && (
                                        <small className="block mt-2 text-text-dark/60">
                                            Current photo exists. Upload new to replace.
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-text-dark font-semibold mb-2 text-sm">OTP Password {!editingUser && '*'}</label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        name="otp_password"
                                        value={formData.otp_password}
                                        onChange={handleInputChange}
                                        placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter 4-digit OTP'}
                                        required={!editingUser}
                                        maxLength="4"
                                        className="input-field flex-1"
                                    />
                                    {!editingUser && (
                                        <button
                                            type="button"
                                            onClick={generateOTP}
                                            className="btn-secondary whitespace-nowrap"
                                        >
                                            🎲 Generate OTP
                                        </button>
                                    )}
                                </div>
                                {formData.otp_password && (
                                    <small className="block mt-2 text-green-600">
                                        Generated OTP: <strong>{formData.otp_password}</strong>
                                    </small>
                                )}
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                <button type="button" onClick={closeModal} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    {editingUser ? 'Update Member' : 'Create Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default UserManagement;
