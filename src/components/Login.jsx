import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Encode username & password in Base64
        const credentials = btoa(`${username}:${password}`);

        try {
            const response = await fetch('https://api.naamtamilar.org/api/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful');
                localStorage.setItem('token', data.token); // Store token for authentication
                navigate('/dashboard'); // Redirect to State page
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:"#422956"}}>
            <div className="card shadow p-4" style={{ width: "350px", borderRadius: "10px" }}>
                <div className="text-center">
                    <img src="logo1.png" alt="Logo" style={{ width: "150px", height: "150px" }} />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="உறுப்பினர் எண்"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="கடவுச்சொல்"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-danger mb-3 text-center">{error}</div>}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn" style={{ backgroundColor: "#FAE818", width: "100px" }}>நுழை</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
