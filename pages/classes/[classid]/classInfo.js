import { useRouter } from 'next/router';
import { fetchClassById } from '@/pages/api/classEndpoint';
import React, { useEffect, useState } from 'react';
import { Clock, Calendar, User, DollarSign, Mail } from 'lucide-react';
import styles from '../../../styles/Students.module.css';
import {donate} from "@/lib/payment";
import {formatearFecha, formatearHora} from "@/lib/date";

export default function ClassDetails() {
    const router = useRouter();
    const { classid } = router.query;

    const [classDetail, setClassDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (classid) {
            fetchClassById(classid, setClassDetail, setLoading, setError);
        }
    }, [classid]);

    if (loading) return <div className={`${styles.loadingError} ${styles.loading}`}>Loading...</div>;
    if (error) return <div className={`${styles.loadingError} ${styles.error}`}>Error: {error}</div>;

    const handleReserve = () => {
        const existingEmails = JSON.parse(localStorage.getItem('reservedEmails')) || [];
        existingEmails.push(email);
        localStorage.setItem('reservedEmails', JSON.stringify(existingEmails));
        alert('Reservaste la clase con éxito!');
    };

    const handlePayment = () => {
        router.push('/mpTest');
    };

    const handleSubmitMp = ( amount, message) => {
        donate( amount, message); // Llama a la función donate
    };

    return (
        <div className={styles.container}>
            {classDetail ? (
                <>
                    <div className={styles.hero}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>{classDetail.subject}</h1>
                            <p className={styles.heroDescription}>{classDetail.description}</p>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.card}>
                            <div className={styles.cardBody}>
                                <div className={styles.mainContent}>
                                    <h2 className={styles.sectionTitle}>Detalles de la Clase</h2>
                                    <div className={styles.detailsGrid}>
                                        <div className={styles.detailItem}>
                                            <Calendar className={styles.icon} />
                                            <p><strong>Fecha:</strong> {formatearFecha(classDetail.dia)}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <Clock className={styles.icon} />
                                            <p><strong>Hora:</strong> {formatearHora(classDetail.horario)}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <User className={styles.icon} />
                                            <p><strong>Profesor:</strong> {classDetail.email_teacher}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <DollarSign className={styles.icon} />
                                            <p><strong>Precio:</strong> ${classDetail.class_price}</p>
                                        </div>
                                    </div>
                                    <div className={styles.description}>
                                        <h3 className={styles.descriptionTitle}>Descripción</h3>
                                        <p className={styles.descriptionText}>{classDetail.description}</p>
                                    </div>
                                </div>
                                <div className={styles.sidebar}>
                                    <h2 className={styles.sectionTitle}>Reserva tu Clase</h2>
                                    <p className={styles.descriptionText}>Te estará llegando un mail para la confirmación de la clase</p>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.label}>
                                            Tu correo electrónico
                                        </label>
                                        <div className={styles.inputWrapper}>
                                            <Mail className={styles.inputIcon} />
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={styles.input}
                                                placeholder="tu@ejemplo.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className={styles.button}
                                        onClick={handleReserve}
                                    >
                                        Reservar clase
                                    </button>
                                </div>


                                <div className={styles.sidebar}>
                                    <h2 className={styles.sectionTitle}>Pago con Mercado Pago</h2>
                                    <p className={styles.descriptionText}></p>
                                    <div className={styles.formGroup}>
                                        <div className={styles.formGroup}>

                                         {/* <label htmlFor="email" className={styles.label}   Tu correo electrónico</label> */}

                                            {/*
                                            <div className={styles.inputWrapper}>
                                                <Mail className={styles.inputIcon}/>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className={styles.input}
                                                    placeholder="tu@ejemplo.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            */}
                                        </div>

                                        <button
                                            className={styles.button}
                                            onClick={() => handleSubmitMp(classDetail.class_price, `Pago de la clase ${classDetail.subject}`)}                                        >
                                            Pagar con Mercado Pago
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={`${styles.loadingError} ${styles.loading}`}>No hay detalles de esta clase.</div>
            )}
        </div>
    );
}
//