import { useRouter } from 'next/router';
import { fetchClassById } from '@/pages/api/classEndpoint'; // Nueva función
import React, { useEffect, useState } from 'react';

export default function Students() {
    const router = useRouter();
    const { id, classid } = router.query;  // Extraer el id y classid de la URL

    const [classDetail, setClassDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (classid) {
            fetchClassById(classid, setClassDetail, setLoading, setError); // Nueva función para obtener solo la clase por su ID
        }
    }, [classid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {classDetail ? (
                <div>
                    <h1>Estudiantes de {classDetail.subject}</h1>
                    <h2>{classDetail.description}</h2>
                    {/* Muestra la lista de estudiantes o cualquier información relevante */}
                </div>
            ) : (
                <div>No hay detalles de esta clase.</div>
            )}
        </div>
    );
}
