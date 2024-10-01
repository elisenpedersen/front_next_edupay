import { useState } from 'react';
import { loginAuth0 } from './api/authEndpoints';

export default function Auth0() {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        loginAuth0();
    };

    return (
        <div>
            <button onClick={handleClick} disabled={loading}>
                {loading ? 'Loading...' : 'Click me'}
            </button>
        </div>
    );
}