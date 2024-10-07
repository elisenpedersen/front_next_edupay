import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'

import jwt from 'jsonwebtoken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Test({ token }) {
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const handleButtonClick = () => {
        try {
            const storedToken = localStorage.getItem('token');
            console.log(storedToken);
        } catch (error) {
            console.error('Error fetching token from localStorage:', error);
        }
    };

    const handleTeacherClick = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            console.log('Token:', storedToken);

            if (storedToken) {
                // Decodifica el token para obtener el email
                const decodedToken = jwt.decode(storedToken);
                const email = decodedToken.email;

                // Realiza la búsqueda para verificar si el email ya existe como profesor
                const response = await fetch(`${API_URL}/src/te/getTeacher`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Teacher data:', data);
                    window.location.href = '/teachers/dashboard'
                } else {
                  window.location.href = '/teachers/init';
                }
            }
        } catch (error) {
            console.error('Error fetching token from localStorage or fetching teacher data:', error);
        }
    };

    const animationFall = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };


    const animationAppear = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5, duration: 0.8 },
    };
    
    return (
        <motion.div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white" {...animationFall}>
            <motion.h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" {...animationFall}>
                Continúa tu camino como...
            </motion.h1>
            <motion.div className="grid grid-cols-2 gap-4" {...animationAppear}>
                <Link href="/classes/available">
                    <motion.div className="flex flex-col items-center justify-center p-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer" {...animationAppear}>
                        <Image src="/images/boy.png" alt="Student" width={200} height={200} />
                        <motion.p className="text-lg">Estudiante</motion.p>
                    </motion.div>
                </Link>
                <motion.div 
                    className="flex flex-col items-center justify-center p-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer" 
                    {...animationAppear}
                    onClick={handleTeacherClick}
                >
                    <Image src="/images/teacher.png" alt="Teacher" width={200} height={200} />
                    <motion.p className="text-lg">Profesor</motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}



export async function getServerSideProps(context) {
    // const { req } = context;
    // const cookies = cookie.parse(req.headers.cookie || '');
    // const token = cookies.token || null;
    const { query } = context;
    const token = query.token || null;

    return {
        props: {
            token,
        },
    };
}

//Underneath are the links from where the pictures were taken
     {/* <div>
     <a href="https://www.flaticon.com/free-icons/teacher" title="teacher icons">Teacher icons created by kmg design - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/student" title="student icons">Student icons created by kmg design - Flaticon</a>
     </div> */}

//I do not understand what the meaning of the token stuff, so I did not remove it, but it does not appear in the website.