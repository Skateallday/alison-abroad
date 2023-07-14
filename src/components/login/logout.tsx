import React from 'react';
import { useNavigate} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    // Handle logout funct
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');

        navigate('/home');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Logout;