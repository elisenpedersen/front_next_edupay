import Link from 'next/link';
import styles from '../../../styles/ClassList.module.css';
import React, { useState, useEffect } from 'react';
import { getTeacherClasses, deleteClass } from "@/pages/api/classEndpoint";
import {formatearHora} from "@/lib/date";

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
            <h1 className={styles.title}>Mis clases</h1>
            <button className={styles.createButton}>
                <Link href={`/teachers/dashboard/createClass`} className={styles.createLink}>
                    Crear nueva clase
                </Link>
            </button>
            {classes.length > 0 ? (
                <ul className={styles.classList}>
                    {classes.map((classItem) => (
                        <li key={classItem.id} className={styles.classItem}>
                            <div className={styles.classContent}>
                                <h2 className={styles.className}>{classItem.subject}</h2>
                                <p className={styles.classDescription}>Date: {new Date(classItem.dia).toLocaleDateString()}</p>
                                <p className={styles.classDescription}>Time: {formatearHora(classItem.horario) }</p>
                                <p className={styles.classDescription}>Description: {classItem.description}</p>
                                <div className={styles.buttonGroup}>
                                    <button
                                        className={styles.joinButton}
                                        onClick={() => window.location.href = classItem.link_meet}
                                    >
                                        Unirse a la sesión
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteClass(classItem.id)}
                                    >
                                        Eliminar clase
                                    </button>
                                    <button
                                        className={styles.viewButton}
                                        onClick={() => {
                                            const path = `${window.location.origin}/classes/${classItem.id}/classInfo`;
                                            navigator.clipboard.writeText(path).then(() => {
                                                alert('Link a la información de la clase copiado al portapapeles');
                                            }).catch(err => {
                                                console.error('Error al copiar ', err);
                                            });
                                        }}
                                    >
                                        Copiar link
                                    </button>
                                </div>
                            </div>
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