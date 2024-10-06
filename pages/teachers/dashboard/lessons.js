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
            const data = await getTeacherClasses();
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
            <button className={styles.createButton} onClick={() => window.location.href = '/teachers/dashboard/createClass'}>
                Crear nueva clase
            </button>
            {classes.length > 0 ? (
                <ul className={styles.classList}>
                    {classes.map((classItem) => (
                        <li key={classItem.id} className={styles.classItem}>
                            <div className={styles.classContent}>
                                <h2 className={styles.className}>{classItem.subject}</h2>
                                <p className={styles.classDescription}>Date: {new Date(classItem.date).toLocaleDateString()}</p>
                                <p className={styles.classDescription}>Time: {formatearHora(classItem.time) }</p>
                                <p className={styles.classDescription}>Description: {classItem.description}</p>
                                <div className={styles.buttonGroup}>
                                    <button
                                        className={styles.joinButton}
                                        onClick={() => window.location.href = classItem.link_meet}>
                                        Unirse a la sesión
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteClass(classItem.id_class)}
                                    >
                                        Eliminar clase
                                    </button>
                                    <button
                                        className={styles.viewButton}
                                        onClick={() => {
                                            const path = `${window.location.origin}/classes/${classItem.id_class}/classInfo`;
                                            navigator.clipboard.writeText(path).then(() => {
                                                alert('Link a la información de la clase copiado al portapapeles');
                                            }).catch(err => {
                                                console.error('Error al copiar ', err);
                                            });
                                        }}
                                    >
                                        Copiar link
                                    </button>
                                    <button
                                        className={styles.viewStudentsButton}
                                        onClick={() => window.location.href = `/teachers/dashboard/lessons/${classItem.id_class}`}
                                    >
                                        Ver Alumnos
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