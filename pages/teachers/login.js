// pages/login.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function Login() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className={styles.title}>Login</h1>
            <form>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Sign In
                </button>
            </form>
            <Link href="/" className={styles.link}>
                Go back to main page
            </Link>
        </div>
    );
}