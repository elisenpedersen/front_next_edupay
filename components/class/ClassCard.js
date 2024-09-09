import React, { useState } from 'react'
import Button from '../UI/Button'
import User from '../UI/User'
import Mail from '../UI/Mail'
import ChevronRight from '../UI/ChevronRight'

export default function ClassCard({ clase }) {
    const [isFirstButtonClicked, setIsFirstButtonClicked] = useState(false);

    const handleFirstButtonClick = () => {
        
        const subject = encodeURIComponent(`Consulta sobre la clase: ${clase.subject}`);
        const body = encodeURIComponent(`Hola,\n\nQuiero informarte que ya pague la clase de ${clase.subject} programada para el ${clase.dia} a las ${clase.horario}.\n\nSaludos,\n`);
        const mailtoLink = `mailto:${clase.email_teacher}?subject=${subject}&body=${body}`;

        // Abrir el cliente de correo predeterminado
        const newWindow = window.open('', '_blank');
        newWindow.location.href = mailtoLink;
        
        setIsFirstButtonClicked(true);
    };

    return (
        <div className="class-card">
            <div className="class-card-header">
                <h2 className="class-card-title">{clase.subject}</h2>
                <p className="class-card-subtitle">{clase.dia}</p>
                <p className="class-card-subtitle">{clase.horario}</p>
            </div>
            <div className="class-card-body">
                <div className="class-card-info">
                    <User />
                    <p className="text-sm">CVU: {clase.cvu}</p>
                </div>
                <div className="class-card-info"> 
                    <Mail />
                    <p className="text-sm">{clase.email_teacher}</p>
                </div>
                <div className="flex flex-col space-y-3 mt-4">
                    <button 
                        className={`class-card-button py-2 px-4 rounded-md text-white `}
                        onClick={handleFirstButtonClick}
                    >
                        <span>Mandar al Mail</span>
                        <ChevronRight />
                    </button>
                    <button 
                        className={`class-card-button py-2 px-4 rounded-md text-white ${!isFirstButtonClicked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => window.open(clase.link_meet, '_blank')}
                        disabled={!isFirstButtonClicked}
                    >
                        <span>Acceder a la Clase</span>
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    )
}