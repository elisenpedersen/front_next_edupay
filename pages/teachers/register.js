// pages/register.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, CreditCard } from 'lucide-react';
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
                <title>Register | EduPay</title>
            </Head>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Create an Account</h1>
                <p className={styles.subtitle}>Join EduPay and start your journey</p>
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
                                placeholder="Create a password"
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
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.inputIcon} />
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="surname" className={styles.label}>Surname</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.inputIcon} />
                            <input
                                id="surname"
                                type="text"
                                placeholder="Enter your surname"
                                className={styles.input}
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cellphone" className={styles.label}>Cellphone</label>
                        <div className={styles.inputWrapper}>
                            <Phone className={styles.inputIcon} />
                            <input
                                id="cellphone"
                                type="tel"
                                placeholder="Enter your cellphone"
                                className={styles.input}
                                value={cellphone}
                                onChange={(e) => setCellphone(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cvu" className={styles.label}>CVU</label>
                        <div className={styles.inputWrapper}>
                            <CreditCard className={styles.inputIcon} />
                            <input
                                id="cvu"
                                type="text"
                                placeholder="Enter your CVU"
                                className={styles.input}
                                value={cvu}
                                onChange={(e) => setCvu(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>
                        Register
                    </button>
                </form>
                <div className={styles.linkContainer}>
                    <Link href="/teachers/login" className={styles.link}>
                        Already have an account? Log in
                    </Link>
                    <Link href="/" className={styles.link}>
                        Back to main page
                    </Link>
                </div>
            </div>
        </div>
    );
}