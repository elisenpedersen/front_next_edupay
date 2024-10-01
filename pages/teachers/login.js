// pages/login.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import styles from '../../styles/Login.module.css';
import { login } from '../api/authEndpoints';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default behavior of the form

        try {
            const response = await login(email, password); // use the login function from authEndpoints.js
            router.push(`/teachers/dashboard`); // redirect to dashboard without id
        } catch (error) {
            setError(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | EduPay</title>
            </Head>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to continue to TeacherHub</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} />
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} />
                            <input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={styles.toggleButton}
                                aria-label={passwordVisible ? "Hide password" : "Show password"}
                            >
                                {passwordVisible ? <EyeOff className={styles.toggleIcon} /> : <Eye className={styles.toggleIcon} />}
                            </button>
                        </div>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>
                <div className={styles.linkContainer}>
                    <Link href="/teachers/register" className={styles.link}>
                        Don't have an account? Register
                    </Link>
                    <Link href="/" className={styles.link}>
                        Back to main page
                    </Link>
                </div>
            </div>
        </div>
    );
}