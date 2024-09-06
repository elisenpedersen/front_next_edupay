// pages/register.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';
import { register } from '../api/authEndpoints';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()
    const [cvu, setCvu] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default behavior of the form

        try{
            const data = await register(email, password, name, surname, cellphone, cvu);
            router.push('/teachers/login'); //redirect to main page
        }catch(error){
            setError(error.message);
        }
        /*const res = await fetch("https://tough-kerrill-gagitogol-f492a8ba.koyeb.app/api/register", {//http solicitation
            method: "POST", // Uso el metodo POST que es para agregar datos
            headers:{  
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({  //convierto la informacion a JSON
                email,
                password,
                name,
                surname,
                cellphone
            }),
        /})  

        const data = await res.json(); //analizo la respuesta como JSON

        if (res.ok) {
            console.log('User registered:', data.user);
        } else {
            setError(data.error);
        }*/

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
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Name"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Surname"
                        className={styles.input}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Cellphone"
                        className={styles.input}
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="integer"
                        placeholder="CVU"
                        className={styles.input}
                        value={cvu}
                        onChange={(e) => setCvu(e.target.value)}
                        required
                    />
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