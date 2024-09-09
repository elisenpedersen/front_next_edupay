import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../../../styles/Login.module.css';
import React, { useState } from 'react';
import { createClass } from "@/pages/api/classEndpoint";

export default function CreateClass() {
    const router = useRouter();
    const { id } = router.query;

    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [link_meet, setLink_meet] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar el ID del profesor en lugar del email
            const data = await createClass({ subject, link_meet, date, time, description, teacher_id: id });
            router.push(`/teachers/dashboard/${id}`); // Redirect to the dashboard
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Class</title>
            </Head>
            <h1 className={styles.title}>Create Class</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Subject"
                        className={styles.input}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Link Meet"
                        className={styles.input}
                        value={link_meet}
                        onChange={(e) => setLink_meet(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="date"
                        placeholder="Date"
                        className={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="time"
                        placeholder="Time"
                        className={styles.input}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <textarea
                        placeholder="Description"
                        className={styles.input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Create Class
                </button>
            </form>
            <div className={styles.linkWrapper}>
                <Link href={`/teachers/dashboard/${id}/lessons`} className={styles.link}>
                    Go back to Lessons
                </Link>
            </div>
        </div>
    )
}