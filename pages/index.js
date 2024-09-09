import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
            <Head>
                <title>EduPay</title>
                <meta name="description" content="Access your classes and manage payments with EduPay" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="text-center">
                <h1 className="text-4xl font-bold text-indigo-800 mb-8">
                    Bienvenido a <span className="text-blue-600">EduPay</span>
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
                    Tu plataforma para acceder a tus clases o manejar tus pagos de las mismas.
                </p>

                <div className="space-y-4">
                    <Link href="/teachers/login" className="block">
                        <button className="w-64 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Inicio de sesión
                        </button>
                    </Link>

                    <Link href="/classes/pay" className="block">
                        <button className="w-64 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                            Acceder a mi clase
                        </button>
                    </Link>
                </div>
            </main>

            <footer className="mt-16 text-center text-gray-500">
                <p>&copy; 2024 EduPay. All rights reserved.</p>
            </footer>
        </div>
    )
}