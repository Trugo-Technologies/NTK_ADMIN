import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderNavbar = () => {
    const handleLogout = () => {
        alert('Logged out successfully');

    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm p-3 mb-4">
            <div className="container-fluid">
                <a className="navbar-brand " style={{color:"white",fontWeight:"bold"}}>நாம் தமிழர் கட்சி - புதிய பொறுப்பாளர் </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="logo1.png" alt="Profile" className="rounded-circle" style={{ maxWidth: "50px", height: "50px", borderRadius: "50px" }}
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end shadow"
                                aria-labelledby="navbarDropdown"
                                style={{ position: "absolute", top: "60px", right: "0", zIndex: 1055 }}
                            >
                                <li><a className="dropdown-item" href="#">சிவானந்தம்</a></li>

                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button
                                        className="dropdown-item d-flex align-items-center"

                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2" style={{ color: "#000" }}></i> LOGOUT
                                    </button>
                                </li>

                            </ul>


                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNavbar;
