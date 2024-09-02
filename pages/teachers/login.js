// pages/login.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className={styles.title}>Login</h1>
            <form>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.passwordContainer}>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            className={styles.input}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.toggleButton}
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type="submit" className={styles.button}>
                    Sign In
                </button>
            </form>
            <div className={styles.linkContainer}>
                <div className={styles.linkWrapper}>
                    <Link href="/teachers/register" className={styles.link}>
                        Register
                    </Link>
                </div>
                <div className={styles.linkWrapper}>
                    <Link href="/" className={styles.link}>
                        Go back to main page
                    </Link>
                </div>
            </div>
        </div>
    );
}