import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Settings.module.css';
import { Eye, EyeOff, Mail, Lock, User, Phone, CreditCard } from 'lucide-react';
//The Settings.module is basically the same as Login.module. If changing one line does not affect Login.module, we should save some space by doing that
const tSettings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [cvu, setCvu] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        // Fetch user data from an API or context and set the state
        // Example:
        // const fetchData = async () => {
        //     const userData = await getUserData();
        //     setEmail(userData.email);
        //     setName(userData.name);
        //     setSurname(userData.surname);
        //     setCellphone(userData.cellphone);
        //     setCvu(userData.cvu);
        // };
        // fetchData();
        // Simulate fetching user data from an API or context and set the state
        //Remove this for removing the testing /*
        const fetchData = async () => {
            const userData = {
                email: 'example@example.com',
                name: 'John',
                surname: 'Doe',
                cellphone: '1234567890',
                cvu: '1234567890123456789012',
                password: 'password123'
            };
            setEmail(userData.email);
            setName(userData.name);
            setSurname(userData.surname);
            setCellphone(userData.cellphone);
            setCvu(userData.cvu);
            setPassword(userData.password);
        };
        fetchData();
        //-->*/
    }, []);
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Update user data via an API call
            // Example:
            // await updateUser(email, name, surname, cellphone, cvu);
            // Simulate a successful update
            console.log("User updated:", { password, name, surname, cellphone, cvu });
            router.push('./tSettings'); // Redirect to profile page or another page
        } catch (error) {
            setError(error.message);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword );
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Personal Information</h1>
            <form onSubmit={handleUpdate} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <div className={styles.inputWrapper}>
                        <Mail className={styles.inputIcon} />
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            value={email}
                            readOnly
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" >Password</label>
                    <div className={styles.inputWrapper}>
                        <Lock className={styles.inputIcon} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
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
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className={styles.toggleIcon} /> : <Eye className={styles.toggleIcon} />}
                        </button>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} />
                        <input
                            id="name"
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="surname">Surname</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} />
                        <input
                            id="surname"
                            type="text"
                            className={styles.input}
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cellphone">Cellphone</label>
                    <div className={styles.inputWrapper}>
                        <Phone className={styles.inputIcon} />
                        <input
                            id="cellphone"
                            type="text"
                            className={styles.input}
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cvu">CVU</label>
                    <div className={styles.inputWrapper}>
                        <CreditCard className={styles.inputIcon} />
                        <input
                            id="cvu"
                            type="text"
                            className={styles.input}
                            value={cvu}
                            onChange={(e) => setCvu(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Update
                </button>
            </form>
            <div className={styles.linkContainer}>
                <Link href="./dashboard" className={styles.link}>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};
export default tSettings;
//Should add the possibility to change password. Changing mail should not be possible, but changing the rest should
/*
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        // Fetch user data from an API or context and set the state
        // Example:
        // const fetchData = async () => {
        //     const userData = await getUserData();
        //     setEmail(userData.email);
        //     setName(userData.name);
        //     setSurname(userData.surname);
        //     setCellphone(userData.cellphone);
        //     setCvu(userData.cvu);
        // };
        // fetchData();
    }, []);
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Update user data via an API call
            // Example:
            // await updateUser(email, name, surname, cellphone, cvu);
            router.push('/profile'); // Redirect to profile page or another page
        } catch (error) {
            setError(error.message);
        }
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            // Change password via an API call
            // Example:
            // await changePassword(email, password, newPassword);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            // Show success message or redirect to another page
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Personal Information</h1>
            <form onSubmit={handleUpdate} className={styles.form}>
                //{ Existing form fields }
                </form>
                <h1 className={styles.title}>Change Password</h1>
                <form onSubmit={handleChangePassword} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Current Password</label>
                        <input
                            id="password"
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className={styles.input}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Change Password
                    </button>
                </form>
            </div>
        );
    };

    export default tSettings;
                            className={styles.input}
*/