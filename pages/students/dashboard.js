import React, { useEffect, useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';
import { BookIcon, HomeIcon, SettingsIcon, ChartSpline, BadgeHelp } from "lucide-react";
import jwt from "jsonwebtoken";
import { getUserByEmail, logoutAuth0 } from "@/pages/api/authEndpoints";

export default function StudentDashboard() {
    const [studentName, setStudentName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const student = await getUserByEmail();
                setStudentName(student.name);
            } catch (error) {
                setError('Error fetching student details');
                console.error('Error fetching student details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const handleLogout = async () => {
        await logoutAuth0();
        localStorage.removeItem('token');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Sidebar */}
            <nav className="w-64 bg-green-900 text-white p-5 flex flex-col">
                <div className="mb-4">
                    <h2 className="text-2xl text-white">Edupay</h2>
                </div>
                <ul className="flex flex-col gap-3">
                    <li>
                        <button className="flex items-center p-3 w-full text-left rounded transition-transform transform hover:bg-green-500 hover:scale-105 hover:shadow-lg transition duration-500">
                            <HomeIcon className="mr-3"/>
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center p-3 w-full text-left rounded transition-transform transform hover:bg-green-500 hover:scale-105 hover:shadow-lg transition duration-500" onClick={() => window.location.href = '/classes/available'}>
                            <BookIcon className="mr-3"/>
                            Cursos
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center p-3 w-full text-left rounded transition-transform transform hover:bg-green-500 hover:scale-105 hover:shadow-lg transition duration-500">
                            <ChartSpline className="mr-3"/>
                            Progreso
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center p-3 w-full text-left rounded transition-transform transform hover:bg-green-500 hover:scale-105 hover:shadow-lg transition duration-500">
                            <SettingsIcon className="mr-3"/>
                            Ajustes
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center p-3 w-full text-left rounded transition-transform transform hover:bg-green-500 hover:scale-105 hover:shadow-lg transition duration-500">
                            <BadgeHelp className="mr-3"/>
                            Ayuda
                        </button>
                    </li>
                </ul>
                <div className="mt-auto">
                    <button className="flex items-center p-3 w-full text-left rounded transition-transform transform hover:bg-green-500 hover:scale-105 hover:shadow-lg transition duration-500" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Dashboard del Estudiante</h1>
                </header>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {loading ? (
                        <p className="text-gray-600">Loading...</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bienvenido, {studentName || 'Estudiante'}</h2>
                            <p className="text-gray-600 mb-4">Aquí puedes ver tu progreso y acceder a tus cursos.</p>
                            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700" onClick={() => window.location.href = '/classes/available'}>Ver Cursos</button>
                        </>
                    )}
                </div>

                {/* Recent Progress Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Progreso Reciente</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-600">No tienes progreso reciente. ¡Empieza un curso para ver tu avance!</p>
                    </div>
                </div>

                {/* Recent Classes Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Clases Recientes</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-600">No tienes clases recientes. ¡Empieza un curso para ver tus clases!</p>
                    </div>
                </div>

                {/* Recent Teachers Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Profesores Recientes</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-600">No tienes profesores recientes. ¡Empieza un curso para ver tus profesores!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}