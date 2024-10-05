import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Test({ token }) {
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const handleButtonClick = () => {
        try {
            const storedToken = localStorage.getItem('token');
            console.log(storedToken);
        } catch (error) {
            console.error('Error fetching token from localStorage:', error);
        }
    };

    return (
        <div>
            <Head>
                <title>Test Page</title>
            </Head>
            <main>
                <h1>Welcome to the Test Page</h1>
                <p>This is a simple test page.</p>
                <p>{token ? `Token recibido: ${token}` : 'No token found'}</p>
                <div>
                    <Link href="/students/init">
                        Sigue tu camino como un estudiante
                    </Link>
                </div>
                <div>
                    <Link href="/teachers/init">
                        Sigue tu camino como un profesor
                    </Link>
                </div>
                <button onClick={handleButtonClick}>Fetch Token</button>
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    // const { req } = context;
    // const cookies = cookie.parse(req.headers.cookie || '');
    // const token = cookies.token || null;
    const { query } = context;
    const token = query.token || null;

    return {
        props: {
            token,
        },
    };
}