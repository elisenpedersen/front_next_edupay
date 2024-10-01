import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Mail from '../UI/Mail'
import Dollar from '../UI/Dollar'
import ChevronRight from '../UI/ChevronRight'
import {formatearFecha, formatearHora} from "@/lib/date";

export default function ClassCard({ clase }) {
    const router = useRouter();
    const handleCardClick = () => {
        console.log(clase);
        console.log(clase.id);
        console.log(formatearFecha(clase.date)); // Ejecutar la función para ver por qué la fecha se imprime mal
        // router.push(`/classes/classInfo`); // Redirige a la página de detalles router.push(`/classes/${clase.id}/classInfo`);
    };


    return (
        <div className="class-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="class-card-header">
                <h2 className="class-card-title">{clase.subject}</h2>
                <p className="class-card-subtitle">{clase.description}</p>
                 <p className="class-card-subtitle">{formatearFecha(clase.date)}</p>
                <p className="class-card-subtitle">{formatearHora(clase.time)} Hs</p>
            </div>
            <div className="class-card-body">
                <div className="class-card-info">
                    <Mail />
                    <p className="text-sm">{clase.email_teacher}</p>
                </div>
                <div className="class-card-info">
                    <Dollar />
                    <p className="text-sm">CVU: {clase.cvu} <br /> Precio: ${clase.class_price}</p>
                </div>
            </div>
        </div>
    )
}
