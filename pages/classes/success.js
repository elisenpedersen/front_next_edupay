import React from 'react';
import styles from './success.module.css';
import Link from 'next/link';

export default function Success() {
    return (
        <div className={styles.container}>
            <div className={styles.whiteBox}>
                <div className={styles.circleContainer}>
                    <svg className={`${styles.successIcon} ${styles.fadingEffect}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.successIcon}>
                        <circle cx="12" cy="12" r="12" fill="green" />
                        <polyline points="7 12 11 17 17 8" fill="none" stroke="white" strokeWidth="2"/>
                    </svg>
                </div>
                <h1 className={styles.title}>Felicitaciones por reservar tu clase!</h1>
                <p className={styles.text}>Te estará llegando un mail con toda la información</p>
                <Link href="/classes/available" passHref>
                    <button className="w-64 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </div>
    );
}

// add some functionability and improve design of the success and fail site after payment. 

/*
- add links to go back to my site, my classes, my 
*/