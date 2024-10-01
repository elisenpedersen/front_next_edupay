import Head from 'next/head'
import Link from 'next/link'
import { loginAuth0 } from './api/authEndpoints';

export default function Home() {
    const handleAuth0Login = () => {
        loginAuth0();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200 flex flex-col justify-center items-center p-4">
            <Head>
                <title>EduPay - Aprende y Enseña</title>
                <meta name="description" content="Accede a tus clases y gestiona pagos con EduPay" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Hero Section */}
            <main className="text-center mb-12">
                <h1 className="text-6xl font-extrabold text-indigo-900 mb-6 animate-slide-in">
                    Bienvenido a <span className="text-blue-700">EduPay</span>
                </h1>
                <p className="text-2xl text-gray-600 mb-8 max-w-md mx-auto animate-slide-in">
                    Tu plataforma para gestionar clases y pagos de manera fácil y segura.
                </p>
                <div className="flex justify-center space-x-6">
                    <button 
                        onClick={handleAuth0Login}
                        className="w-48 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50">
                        Login con Auth0
                    </button>
                    <Link href="/classes/available">
                        <button className="w-48 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50">
                            Ver Clases
                        </button>
                    </Link>
                </div>

            </main>

            {/* Redesigned Course Preview (Static) */}
            <section className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-10 animate-fade-in-up">
                <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">Cursos Destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Matemáticas Avanzadas</h3>
                        <p className="text-gray-600 mb-4">Con el Dr. Juan Pérez</p>
                        <p className="text-sm text-gray-500">Categoría: Matemáticas</p>
                        <Link href="/classes/1">
                            Ver más detalles
                        </Link>
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Física Cuántica</h3>
                        <p className="text-gray-600 mb-4">Con la Dra. María González</p>
                        <p className="text-sm text-gray-500">Categoría: Física</p>
                        <Link href="/classes/2">
                            Ver más detalles
                        </Link>
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Literatura Contemporánea</h3>
                        <p className="text-gray-600 mb-4">Con el Mtro. Carlos Rodríguez</p>
                        <p className="text-sm text-gray-500">Categoría: Literatura</p>
                        <Link href="/classes/3">
                            Ver más detalles
                        </Link>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <Link href="/classes/available">
                        <button className="w-48 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50">
                            Ver Todos los Cursos
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-500">
                <p>&copy; 2024 EduPay. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}