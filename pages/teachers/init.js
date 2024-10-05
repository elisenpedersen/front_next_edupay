'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AcademicCapIcon, UserGroupIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'

export default function TeacherHome() {
    const [formData, setFormData] = useState({ nombre: '', apellido: '', especialidad: '', experiencia: '' })
    const [isFormVisible, setIsFormVisible] = useState(false)
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight / 2) {
                setIsFormVisible(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Datos del formulario del profesor:', formData)
        // Aquí puedes agregar la lógica para enviar los datos del formulario
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-white">
            <header className="py-6 px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between items-center">
                    <Image src="/logo-placeholder.svg" alt="Logo" width={150} height={50} />
                    <div className="flex space-x-4">
                        <a href="#" className="text-green-600 hover:text-green-800">Inicio</a>
                        <a href="#" className="text-green-600 hover:text-green-800">Cursos</a>
                        <a href="#" className="text-green-600 hover:text-green-800">Recursos</a>
                    </div>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="text-center py-20">
                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Bienvenido, profesor. Comienza tu viaje de enseñanza
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Conectamos a profesores apasionados con estudiantes ávidos de conocimiento
                    </motion.p>
                    <div className="flex justify-center space-x-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AcademicCapIcon className="h-16 w-16 text-green-500 mb-2" />
                            <p>Enseña</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <UserGroupIcon className="h-16 w-16 text-blue-500 mb-2" />
                            <p>Inspira</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <PresentationChartBarIcon className="h-16 w-16 text-red-500 mb-2" />
                            <p>Crece</p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <motion.div
                            className="relative h-64 sm:h-96 rounded-lg overflow-hidden"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image src="/placeholder.svg?height=400&width=600" alt="Profesor enseñando" layout="fill" objectFit="cover" />
                        </motion.div>
                        <motion.div
                            className="relative h-64 sm:h-96 rounded-lg overflow-hidden"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image src="/placeholder.svg?height=400&width=600" alt="Aula virtual" layout="fill" objectFit="cover" />
                        </motion.div>
                    </div>
                </section>

                <motion.section
                    ref={ref}
                    className={`py-20 ${isFormVisible ? 'opacity-100' : 'opacity-0'}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-8">¡Únete a nuestra comunidad de educadores!</h2>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="especialidad" className="block text-gray-700 font-bold mb-2">Especialidad</label>
                            <input
                                type="text"
                                id="especialidad"
                                name="especialidad"
                                value={formData.especialidad}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="experiencia" className="block text-gray-700 font-bold mb-2">Años de experiencia</label>
                            <input
                                type="number"
                                id="experiencia"
                                name="experiencia"
                                value={formData.experiencia}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            Enviar
                        </button>
                    </form>
                </motion.section>
            </main>

            <footer className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p className="text-gray-600">&copy; 2024 Tu Marketplace de Profesores. Todos los derechos reservados.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-800">Términos</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Privacidad</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}