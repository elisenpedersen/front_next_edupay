import Head from 'next/head';
import Link from 'next/link';

export default function FirstPost() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <h1>Dashboard</h1>
            <h2>
                <Link href="/">← Back to main page</Link>
            </h2>
        </>
    );
}