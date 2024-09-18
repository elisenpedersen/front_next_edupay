import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../styles/Lessons.module.css';
import React, { useState, useEffect } from 'react';
import { getTeacherClasses, deleteClass } from "@/pages/api/classEndpoint";

export default function Lessons() {
    const router = useRouter();
    const { id } = router.query;

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchClasses();
        }
    }, [id]);

    const fetchClasses = async () => {
        try {
            setLoading(true); // Lo colocas al principio para iniciar la carga
            const data = await getTeacherClasses(id);
            setClasses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Aseguras que siempre se desactiva el loading
        }
    };

    const handleDeleteClass = async (classId) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await deleteClass(classId);
                fetchClasses();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h1>My Lessons</h1>
            <button className={styles.createButton}>
                <Link href={`/teachers/dashboard/${id}/createClass`}>
                    Create New Class
                </Link>
            </button>
            {classes.length > 0 ? (
                <ul className={styles.classList}>
                    {classes.map((classItem) => (
                        <li key={classItem.id} className={styles.classItem}>
                            <h2>{classItem.subject}</h2>
                            <p>Date: {new Date(classItem.dia).toLocaleDateString()}</p>
                            <p>Time: {classItem.horario}</p>
                            <p>Description: {classItem.description}</p>
                            <button 
                                className={styles.joinButton}
                                onClick={() => window.location.href = classItem.link_meet}
                            >
                                Join Meet
                            </button>
                            <button 
                                className={styles.deleteButton}
                                onClick={() => handleDeleteClass(classItem.id)}
                            >
                                Delete Class
                            </button>
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