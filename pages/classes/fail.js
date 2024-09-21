import React from 'react';
import Link from 'next/link';

export default function Fail() {
    return (
        <div>
            <h1>Lo sentimos, algo salió mal</h1>
            <p>Por favor, intenta de nuevo más tarde</p>
            <Link href="/classes/available" passHref>
                Volver al inicio
            </Link>
        </div>
    );
}