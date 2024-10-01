import Head from 'next/head';
import Link from 'next/link';
import cookie from 'cookie';
import { useEffect } from 'react';

export default function Test({ token }) {
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

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
                    <Link href="/classes/available">
                        Sigue tu camino como un estudiante
                    </Link>
                </div>
                <div>
                    <Link href="/teachers/dashboard">
                        Sigue tu camino como un profesor
                    </Link>
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token || null;

    return {
        props: {
            token,
        },
    };
}