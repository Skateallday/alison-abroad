import { useNavigate} from 'react-router-dom';

type LogoutProps = {
    onLogout: () => void;
}

export default function Logout({onLogout}:LogoutProps) {
    const navigate = useNavigate();

    // Handle logout funct
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');

        onLogout();

        navigate('/home');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};
