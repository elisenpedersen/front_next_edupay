import React from 'react'
import Button from '../UI/Button'
import User from '../UI/User'
import Mail from '../UI/Mail'
import ChevronRight from '../UI/ChevronRight'

export default function ClassCard({ clase }) {
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
                <div className="class-card-info" style={{ marginBottom: '1rem' }}> 
                    <Mail />
                    <p className="text-sm">{clase.email_teacher}</p>
                </div>
                <a href={clase.link_meet}>
                <Button className="class-card-button">
                    <span>Acceder a la Clase</span>
                    <ChevronRight />
                </Button>
                </a>
            </div>
        </div>
    )
}