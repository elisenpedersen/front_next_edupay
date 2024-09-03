// pages/login.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default behavior of the form

        const res = await fetch("http://localhost:3000/appi/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json()

        if(res.ok){
            console.log('User registered:', data.user);
            router.push('/teachers/dashboard')
        }else{
            setError(data.error);
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.passwordContainer}>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                {error && <p className={styles.error}>{error}</p>}
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