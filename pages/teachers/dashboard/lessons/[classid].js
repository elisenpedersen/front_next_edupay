import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import styles from '../../../../styles/MyStudents.module.css';
import { fetchClassById } from '@/pages/api/classEndpoint';


export default function Students() {
    const router = useRouter();
    const { classid } = router.query;
    const [reservedEmails, setReservedEmails] = useState([]);
    const [classDetail, setClassDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const emails = JSON.parse(localStorage.getItem('reservedEmails')) || [];
        setReservedEmails(emails);
    }, []);

    useEffect(() => {
        if (classid) {
            fetchClassById(classid, setClassDetail, setLoading, setError);
        }
    }, [classid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heroTitle}>Personas anotadas al curso de: {classDetail.subject}</h1>
            {reservedEmails.length === 0 ? (
                <p className={styles.heroDescription}>List of students will be shown here.</p>
            ) : (
                <ul className={styles.emailList}>
                    {reservedEmails.map((email, index) => (
                        <li key={index} className={styles.emailItem}>
                            <User className={styles.emailIcon} />
                           {email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}