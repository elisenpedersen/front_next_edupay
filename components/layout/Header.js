// components/layout/Header.js
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai'; // Import the home icon

export default function Header() {
    return (
        <div style={{ padding: '20px' }}>
            {/* Home Button */}
            <Link href="/" passHref>
                <button
                    style={{
                        backgroundColor: '#4CAF50',
                        padding: '15px',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        fontSize: '30px',
                    }}
                >
                    <AiFillHome style={{ color: 'white' }} />
                </button>
            </Link>
        </div>
    );
}