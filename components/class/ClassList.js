import React from 'react'
import ClassCard from './ClassCard'

export default function ClassList({ classes }) {
    return (
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((clase, index) => (
                <ClassCard key={index} clase={clase} />
            ))}
        </div>
    )
}