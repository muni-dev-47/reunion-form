import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDetails from "./EmployeeDetails";
import { useNavigate } from "react-router";

const Table = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                const res = await axios.get("http://localhost:5000/api/users");
                setUsers(res.data.data);
            } catch (err) {
                setError(err.response?.data || err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleView = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mx-auto mt-4" style={{ maxWidth: "500px" }}>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Error: {error}
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-primary text-white py-3 position-relative">
                    <h2 className="h4 mb-0">
                        <i className="fas fa-users me-2"></i>
                        User Directory
                    </h2>
                    <div className="position-absolute top-0 end-0 mt-3 me-4 badge bg-light text-dark">
                        <i className="fas fa-phone me-1"></i>
                        {users.length} Contacts
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">NAME</th>
                                    <th>MOBILE NUMBER</th>
                                    <th className="text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td className="ps-4 fw-bold align-middle">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-circle bg-primary text-white me-3">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        {user.name.toUpperCase()}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-mobile-alt me-2 text-primary"></i>
                                                    {user.mobileNumber}
                                                </div>
                                            </td>
                                            <td className="text-center align-middle">
                                                <button
                                                    className="btn btn-primary btn-sm action-btn me-2"
                                                    onClick={() => handleView(user)}
                                                >
                                                    <i className="fas fa-eye me-1"></i>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4">
                                            <i className="fas fa-user-slash fa-2x mb-2 text-muted"></i>
                                            <p className="text-muted">No users found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer bg-light">
                    <div className="row">
                        <div className="col-md-6">
                            <small className="text-muted">
                                <i className="fas fa-info-circle me-1"></i>
                                Showing {users.length} records
                            </small>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <button className="btn btn-sm btn-primary" onClick={() => navigate('/')}>
                                <i className="fas fa-plus me-1"></i>
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && selectedUser && (
                <EmployeeDetails
                    user={selectedUser}
                    show={showModal}
                    onClose={handleCloseModal}
                />
            )}

            <style>{`
                .action-btn {
                    border-radius: 20px;
                    padding: 5px 15px;
                    background: linear-gradient(45deg, #4e73df, #224abe);
                    border: none;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .action-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: all 0.5s ease;
                }
                
                .action-btn:hover::before {
                    left: 100%;
                }
                
                .action-btn:hover {
                    background: linear-gradient(45deg, #224abe, #4e73df);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
                
                .action-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .table-hover tbody tr:hover {
                    background-color: rgba(78, 115, 223, 0.05);
                    transform: translateY(1px);
                    transition: transform 0.2s ease;
                }
                
                .card {
                    border-radius: 15px;
                    overflow: hidden;
                }
                
                .avatar-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 16px;
                }
                
                @media (max-width: 768px) {
                    .table-responsive {
                        border: none;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    -ms-overflow-style: -ms-autohiding-scrollbar;
                    width: 100%;
                    display: block;
                    white-space: nowrap;
                    position: relative;
                    max-width: 100%;
                    margin-bottom: 1rem;
                    border-collapse: collapse !important;
                    border-spacing: 0;
                    font-size: 0.875rem;
                }
                
                    .table-responsive::-webkit-scrollbar {
                        height: 8px;
                    }
                
                    .table-responsive::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                    }
                
                    .table-responsive::-webkit-scrollbar-thumb {
                        background: #c1c1c1;
                        border-radius: 10px;
                    }
                
                    .table-responsive::-webkit-scrollbar-thumb:hover {
                        background: #a8a8a8;
                    }
                    
                    .card-header .badge {
                        position: relative !important;
                        top: 0 !important;
                        end: 0 !important;
                        margin: 10px !important;
                        display: inline-block;
                    }
                    
                    .action-btn {
                        padding: 5px 10px;
                        margin-bottom: 5px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Table;