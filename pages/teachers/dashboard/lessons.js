import Link from 'next/link';
import styles from '../../../styles/Lessons.module.css';
import React, { useState, useEffect } from 'react';
import { getTeacherClasses, deleteClass } from "@/pages/api/classEndpoint";

export default function Lessons() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const data = await getTeacherClasses(token);
            setClasses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClass = async (classId) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                const token = localStorage.getItem('access_token');
                await deleteClass(classId, token);
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
                <Link href={`/teachers/dashboard/createClass`}>
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
                            <button
                                className={styles.viewStudentsButton}
                                onClick={() => window.location.href = `/teachers/dashboard/lessons/${classItem.id}`}
                            >
                                Ver Alumnos
                            </button>
                            <button
                                className={styles.viewStudentsButton}
                                onClick={() => {
                                    const path = `${window.location.origin}/classes/${classItem.id}/classInfo`;
                                    navigator.clipboard.writeText(path).then(() => {
                                        alert('Link a la información de la clase copiado al portapapeles');
                                    }).catch(err => {
                                        console.error('Error al copiar ', err);
                                    });
                                }}
                            >
                                Copiar clase
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No classes found.</p>
            )}
            <Link href={`/teachers/dashboard`}>
                Back to Dashboard
            </Link>
        </div>
    );
}