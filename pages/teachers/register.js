// pages/register.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default behavior of the form, lei que era buena practica pero no se bien que es el default behavior

        if(!email || !password){ // if email or password is empty
            setError("Please fill in all fields");
            return;
        }

        const res = await fetch("https://localhost:3000/register", {//http solicitation
            method: "POST", // Uso el metodo POST que es para agregar datos
            headers:{  
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({  //convierto la informacion a JSON
                email,
                password
            }),
        })  

        const data = await res.json();

        if (res.ok) {
            console.log('User registered:', data.user);
        } else {
            setError(data.error);
        }

    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Register</title>
            </Head>
            <h1 className={styles.title}>Register</h1>
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
                    Register
                </button>
            </form>
            <div className={styles.linkWrapper}>
                    <Link href="/teachers/login" className={styles.link}>
                        Login
                    </Link>
            </div>
            <div className={styles.linkWrapper}>
                    <Link href="/" className={styles.link}>
                        Go back to main page
                    </Link>
            </div>
        </div>
    );
}