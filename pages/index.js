import Head from 'next/head'
import Link from 'next/link'
import { loginAuth0 } from './api/authEndpoints';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import Image from 'next/image'; // Import Next.js Image component

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Install Swiper modules
SwiperCore.use([Pagination]);

export default function Home() {

    const handleAuth0Login = () => {
        loginAuth0();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200 p-4">
            <Head>
                <title>EduPay - Aprende y Enseña</title>
                <meta name="description" content="Accede a tus clases y gestiona pagos con EduPay" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header Section */}
            <header className="w-full flex justify-between items-center px-8 py-4">
                <h1 className="text-3xl font-bold text-indigo-900">EduPay</h1>
                <button
                    onClick={handleAuth0Login}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
                >
                    Iniciar sesión con Auth0
                </button>
            </header>

            {/* Hero Section */}
            <main className="flex justify-center items-center space-x-8 mt-8">
                {/* Left Image */}
                <div className="hidden md:block w-1/3">
                    <Image
                        src="/images/person_studying.png" // Make sure this image is in your public/images folder
                        alt="Person studying"
                        width={400}
                        height={400}
                        objectFit="contain"
                    />
                </div>

                {/* Center Content */}
                <div className="text-center w-full md:w-1/3">
                    <h1 className="text-6xl font-extrabold text-indigo-900 mb-6">
                        EduPay
                    </h1>
                    <p className="text-2xl text-gray-600 mb-8 max-w-md mx-auto">
                        Descubre cursos increíbles y gestiona tus pagos fácilmente con EduPay.
                    </p>
                    <Link href="/classes/available">
                        <button
                            className="w-48 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50">
                            Ver Clases
                        </button>
                    </Link>
                </div>
            </main>

            {/* Course Preview Section with Swiper */}
            <section className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-10 mt-12">
                <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">¡Mira lo que puedes aprender!</h2>

                {/* Swiper Carousel */}
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: false }} // Remove clickable dots and disable them
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                >
                    {/* Course 1 */}
                    <SwiperSlide>
                        <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img src="/images/math.jpg" alt="Matemáticas Avanzadas" className="mb-4 w-full rounded-md" />
                            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Matemáticas Avanzadas</h3>
                            <p className="text-gray-600 mb-4">Con el Dr. Juan Pérez</p>
                            <p className="text-sm text-gray-500">Categoría: Matemáticas</p>
                            <Link href="/classes/1">
                                Ver más detalles
                            </Link>
                        </div>
                    </SwiperSlide>

                    {/* Course 2 */}
                    <SwiperSlide>
                        <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img src="/images/physics.jpg" alt="Física Cuántica" className="mb-4 w-full rounded-md" />
                            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Física Cuántica</h3>
                            <p className="text-gray-600 mb-4">Con la Dra. María González</p>
                            <p className="text-sm text-gray-500">Categoría: Física</p>
                            <Link href="/classes/2">
                                Ver más detalles
                            </Link>
                        </div>
                    </SwiperSlide>

                    {/* Course 3 */}
                    <SwiperSlide>
                        <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img src="/images/literatura.jpg" alt="Literatura Contemporánea" className="mb-4 w-full rounded-md" />
                            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Literatura Contemporánea</h3>
                            <p className="text-gray-600 mb-4">Con el Mtro. Carlos Rodríguez</p>
                            <p className="text-sm text-gray-500">Categoría: Literatura</p>
                            <Link href="/classes/3">
                                Ver más detalles
                            </Link>
                        </div>
                    </SwiperSlide>

                    {/* Course 4 */}
                    <SwiperSlide>
                        <div className="bg-indigo-50 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img src="/images/programming.jpg" alt="Introducción a la Programación" className="mb-4 w-full rounded-md" />
                            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Introducción a la Programación</h3>
                            <p className="text-gray-600 mb-4">Con el Ing. Roberto Suárez</p>
                            <p className="text-sm text-gray-500">Categoría: Tecnología</p>
                            <Link href="/classes/4">
                                Ver más detalles
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Drag Instruction Bar */}
                <div className="mt-6 flex flex-col items-center">
                    <p className="text-gray-500 mt-2">Haz clic y arrastra para ver más cursos</p>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/AboutAs">
                        <button className="w-48 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 whitespace-nowrap">
                            Acerca de nosotros
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-500">
                <p>&copy; 2024 EduPay. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}