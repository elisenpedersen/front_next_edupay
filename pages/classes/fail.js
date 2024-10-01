import React from 'react';
import Link from 'next/link';
import styles from './fail.module.css';

export default function Fail() {
    return (
        <div className={styles.container}>
            <div className={styles.whiteBox}>
                <div className={styles.circleContainer}>
                    <svg className={`${styles.errorIcon} ${styles.fadingEffect}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.errorIcon}>
                        <circle cx="12" cy="12" r="12" fill="red" />
                        <line x1="15" y1="9" x2="9" y2="15" stroke="white"/>
                        <line x1="9" y1="9" x2="15" y2="15" stroke="white"/>
                    </svg>
                </div>
                <h1 className={styles.title}>Algo salió mal!</h1>
                <p className={styles.text}>Por favor, intenta de nuevo más tarde</p>
                <Link href="/classes/available" passHref>
                    <button className="w-64 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </div>
    );
}


//I added some changes to the layout here, just for testing

//The link is not functioning
//The red circle is ugly and has a white circle around it

/* 
<div className="block">
                        <Link href="/classes/available">
                            <button className="w-64 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                Acceder a mi clase
                            </button>
                        </Link>
                    </div>
*/