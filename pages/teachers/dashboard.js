// pages/dashboard/dashboard.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <h1 className={styles.title}>Dashboard
            </h1>


            <button className={styles.signOutButton} onClick={() => window.location.href = '/'}>
                    Sign Out
                </button>

            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Profile</h2>
                <p className={styles.cardContent}>
                    View and edit your profile information.
                </p>
                <Link href={`/profile`} className={styles.link}>
                    Go to Profile → (not implemented yet)
                </Link>
            </div>

            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Lessons</h2>
                <p className={styles.cardContent}>
                    Manage your lessons.
                </p>
                <Link href={`/teachers/dashboard/lessons`} className={styles.link}>
                Go to Lessons →
                </Link>
            </div>

            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Statistics</h2>
                <p className={styles.cardContent}>
                    View your statistics and metrics.
                </p>
                <Link href={`/settings`} className={styles.link}>
                    Go to Analytics → (not implemented yet)
                </Link>
            </div>

            <Link href="/" className={styles.backButton}>
                Back to Main Page
            </Link>
        </div>
    );
}