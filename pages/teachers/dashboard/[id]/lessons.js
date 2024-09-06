import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../styles/Lessons.module.css';
import { useState, useEffect } from 'react';

export default function Lessons() {
    const router = useRouter();
    const { id } = router.query;
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('https://tough-kerrill-gagitogol-f492a8ba.koyeb.app/api/class/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch classes');
                }
                const data = await response.json();
                setClasses(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h1>Lessons</h1>
            {classes.length > 0 ? (
                <ul className={styles.classList}>
                    {classes.map((classItem) => (
                        <li key={classItem.id} className={styles.classItem}>
                            <h2>{classItem.subject}</h2>
                            <p>Date: {new Date(classItem.dia).toLocaleDateString()}</p>
                            <p>Time: {classItem.horario}</p>
                            <p>Description: {classItem.description}</p>
                            <a href={classItem.link_meet} target="_blank" rel="noopener noreferrer">Join Meet</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No classes found.</p>
            )}
            <Link href={`/teachers/dashboard/${id}`}>
                Back to Dashboard
            </Link>
        </div>
    );
}