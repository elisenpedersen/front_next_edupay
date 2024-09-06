import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 ${className}`}
        {...props}
    >
        {children}
    </button>
)

const Icon = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
    </svg>
)

const ChevronRight = () => (
    <Icon>
        <polyline points="9 18 15 12 9 6" />
    </Icon>
)

const User = () => (
    <Icon>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </Icon>
)

const Mail = () => (
    <Icon>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </Icon>
)

/*
const clases = [

    {
        materia: "Matemáticas Avanzadas",
        profesor: "Dr. Juan Pérez",
        cvu: "123456",
        email: "juan.perez@universidad.edu"
    },
    {
        materia: "Física Cuántica",
        profesor: "Dra. María González",
        cvu: "789012",
        email: "maria.gonzalez@universidad.edu"
    },
    {
        materia: "Literatura Contemporánea",
        profesor: "Mtro. Carlos Rodríguez",
        cvu: "345678",
        email: "carlos.rodriguez@universidad.edu"
    },
    {
        materia: "Matemáticas Avanzadas",
        profesor: "Dr. Juan Pérez",
        cvu: "123456",
        email: "juan.perez@universidad.edu"
    },
    {
        materia: "Física Cuántica",
        profesor: "Dra. María González",
        cvu: "789012",
        email: "maria.gonzalez@universidad.edu"
    },
    {
        materia: "Literatura Contemporánea",
        profesor: "Mtro. Carlos Rodríguez",
        cvu: "345678",
        email: "carlos.rodriguez@universidad.edu"
    },
    {
        materia: "Matemáticas Avanzadas",
        profesor: "Dr. Juan Pérez",
        cvu: "123456",
        email: "juan.perez@universidad.edu"
    },
    {
        materia: "Física Cuántica",
        profesor: "Dra. María González",
        cvu: "789012",
        email: "maria.gonzalez@universidad.edu"
    },
    {
        materia: "Literatura Contemporánea",
        profesor: "Mtro. Carlos Rodríguez",
        cvu: "345678",
        email: "carlos.rodriguez@universidad.edu"
    }
]
     */




export default function ListaClasesModerna() {

    const router = useRouter();
    const { id } = router.query;
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('https://tough-kerrill-gagitogol-f492a8ba.koyeb.app/api/class/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch classes');
                }
                const data = await response.json();
                setClasses(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
            <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">Clases Disponibles</h1>
            <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((clase, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                            <h2 className="text-xl font-semibold text-white mb-1">{clase.subject}</h2>
                            <p className="text-indigo-100 text-sm">{clase.dia}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-3 text-gray-600">
                                <User />
                                <p className="text-sm">CVU: {clase.cvu}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600">
                                <Mail />
                                <p className="text-sm">{clase.email_teacher}</p>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center justify-center space-x-2 group">
                                <span>Acceder a la Clase</span>
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}